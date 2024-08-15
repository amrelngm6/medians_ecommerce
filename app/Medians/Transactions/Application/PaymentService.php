<?php

namespace Medians\Transactions\Application;
use \Shared\dbaser\CustomController;

use Medians\Transactions\Infrastructure\TransactionRepository;
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
		switch (strtolower($this->payment_method)) 
		{
			case 'paystack':
				$this->service = new PaystackService();
				break;
				
			case 'paypal':
				$this->service = new PayPalService();
				break;
		}
	}

	
	public function verify($params)
	{
		$verify = $this->service->verify((array) $params['transaction']);
		
		if (isset($verify->status) && $verify->status == true)
		{
			$invoice = $this->addInvoice($params);

			$transaction = $this->storeTransaction($params, $invoice, $verify);

			return $invoice;
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
			
			$orderClass = new \Medians\Orders\Domain\Order;

			$transaction = array() ;
			$transaction['invoice_id'] = $invoice->invoice_id;
			$transaction['model_id'] = $invoice->user_id;
			$transaction['model_type'] = $invoice->user_type;
			$transaction['item_id'] = $params['order_id'];
			$transaction['item_type'] = $orderClass::class;
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


	public function addInvoice($params)
	{
		try {

			$app = new \config\APP;
			$setting = $app->SystemSetting();
			
			$invoiceRepo = new \Medians\Invoices\Infrastructure\InvoiceRepository();
			$orderRepo = new \Medians\Orders\Infrastructure\OrderRepository();
			
			$order = $orderRepo->find($params['order_id']);

			$data = array();
			$data['code'] = $invoiceRepo->generateCode();
			$data['user_id'] = $app->customer_auth()->customer_id;
			$data['user_type'] = Customer::class;
			$data['payment_method'] = $this->payment_method;
			$data['subtotal'] = $order->subtotal;
			$data['total_amount'] = $order->total_amount;
			$data['shipping_amount'] = $order->shipping_amount;
			$data['tax_amount'] = $order->tax_amount;
			$data['currency_code'] = $setting['currency'];
			$data['status'] = 'paid';
			$data['order_id'] = $order->order_id;
			$data['items'] = $order->items;
			$data['discount_amount'] = 0;
			$data['date'] = date('Y-m-d');

			return $invoiceRepo->store($data);

		} catch (\Throwable $th) {
			error_log($th->getMessage());
			return array('error'=>$th->getMessage());
		}
	}
	
	
	
	public function updateWallet($params, $invoice)
	{
		try {

			if ($params['payment_method'] == 'cash')
			{
				return $this->updateDriverWalletDebit($params, $invoice);
			}
			
			return $this->updateBusinessWallet($params, $invoice);

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
