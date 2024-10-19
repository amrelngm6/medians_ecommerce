<?php

namespace Medians\Transactions\Application;
use \Shared\dbaser\CustomController;

use Medians\Transactions\Infrastructure\TransactionRepository;
use Medians\Invoices\Infrastructure\InvoiceRepository;
use Medians\Customers\Domain\Customer;

class PaymentService
{

	
	public $payment_method;
	public $service;
	public $transactionRepo;
	

	function __construct($payment_method)
	{
		$this->payment_method = $payment_method;	
		$this->loadService();
	}

	function loadService() 
	{
		$this->service = new PaypalService();
	}

	
	public function verify($params)
	{
		$verify = $this->service->verify((array) $params['transaction']);
		
		if (isset($verify->status) && $verify->status == true)
		{
			$invoiceRepo = new InvoiceRepository();

			$invoice = $invoiceRepo->find($params['invoice_id']);
            $invoice->status = 'paid';
            $invoice->save();

			$transaction = $this->storeTransaction($params, $invoice, $verify);

			$subscription = $this->updatePackageSubscription($params, $invoice, $transaction);

			return $transaction;
		}
	}

	public function storeTransaction($params, $invoice, $verifyResponse)
	{
		try {

			// Get the paid amount and currency based on 
			// the verification response from API
			$amountCurrency = $this->service->getAmountCurrency($verifyResponse);
			
			$params['amount'] = $amountCurrency['amount'];
			$params['currency'] = $amountCurrency['currency'];
			$params['status'] = $amountCurrency['status'];

			$this->transactionRepo = new TransactionRepository();
			
			$transaction = array() ;
			$transaction['invoice_id'] = $invoice->invoice_id;
			$transaction['customer_id'] = $invoice->customer_id;
			$transaction['subscription_id'] = $invoice->subscription_id;
			$transaction['date'] = date('Y-m-d');
			$transaction['payment_method'] = $this->payment_method;
			$transaction['amount'] = $params['amount'];
			$transaction['currency_code'] = $params['currency'];
			$transaction['status'] = $params['status'];
			$transaction['field'] = $params['transaction'];
		
			return  $this->transactionRepo->store($transaction);
			
		} catch (\Throwable $th) {
			return array('error'=>$th->getMessage());
		}
	}


    
	
	
	public function updatePackageSubscription($params, $invoice, $transaction)
	{
		try {

			if ($transaction->amount == $invoice->total_amount)
			{
                $this->invoice->item->update(['payment_status'=>'paid' , 'status'=>'active']);
			}
			

		} catch (\Throwable $th) {
			return array('error'=>$th->getMessage());
		}
		
	}
	
	
	public function updateBusinessWallet($params, $invoice)
	{
		try {

			if ($params['payment_method'] == 'cash')
			{
				return;
			}

			$walletRepo = new \Medians\Wallets\Infrastructure\BusinessWalletRepository();
			
			$check = $walletRepo->getBusinessWallet($invoice->business_id);
			$data = array();
			$commission = $this->handleBusinessCommission($invoice);
			$data['credit_balance'] = isset($check->credit_balance) ? ($check->credit_balance + ($invoice->total_amount - $commission)) : ($invoice->total_amount - $commission);

			return isset($check->wallet_id) ? $check->update($data) : null;

		} catch (\Throwable $th) {
			return array('error'=>$th->getMessage());
		}
		
	}
	
	/**
	 * Update driver wallet when the payment in Cash only
	 * Increase the Debit balance
	 */
	public function updateDriverWalletDebit($params, $invoice)
	{
		try {

			$app = new \config\APP;
			$user = $app->auth();
			if ($params['payment_method'] != 'cash')
			{
				return;
			}

			$walletRepo = new \Medians\Wallets\Infrastructure\WalletRepository();
			
			$check = $walletRepo->driverWallet($user->driver_id);
			$data = array();
			$data['debit_balance'] = isset($check->debit_balance) ? ($check->debit_balance + $invoice->total_amount) : $invoice->total_amount;

			return isset($check->wallet_id) ? $check->update($data) : null;

		} catch (\Throwable $th) {
			return array('error'=>$th->getMessage());
		}
		
	}
	
	
	/**
	 * Update driver wallet when the payment in Cash only
	 * Increase the Debit balance
	 */
	public function updateDriverWalletCredit($params, $invoice, $driverIid)
	{
		try {

			$app = new \config\APP;

			$walletRepo = new \Medians\Wallets\Infrastructure\WalletRepository();
			
			$check = $walletRepo->driverWallet($driverIid);
			$data = array();
			$commission = $this->handleDriverCommission($invoice);
			$data['credit_balance'] = isset($check->credit_balance) ? ($check->credit_balance + $commission) : $commission;

			return isset($check->wallet_id) ? $check->update($data) : null;

		} catch (\Throwable $th) {
			return array('error'=>$th->getMessage());
		}
		
	}
	
	public function handleCommission($invoice) 
	{
		$setting = (new \config\APP)->SystemSetting();
		$business = (new \Medians\Businesses\Infrastructure\BusinessRepository())->find($invoice->business_id);
		
		return (isset($business->subscription) && $business->subscription->is_paid) 
		? ($invoice->total_amount * ($setting['comission_paid_plan'] / 100))
		: ($invoice->total_amount * ($setting['comission_free_plan'] / 100));

	}
	
	public function handleDriverCommission($invoice) 
	{
		$setting = (new \Medians\Settings\Application\SettingsController)->getBusinessSettings($invoice->business_id);
		
		return isset($setting['driver_commission']) 
		? ($invoice->total_amount * ($setting['driver_commission'] / 100))
		: 0;

	}

}