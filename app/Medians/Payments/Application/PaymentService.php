<?php

namespace Medians\Payments\Application;
use \Shared\dbaser\CustomController;

use Medians\Plans\Infrastructure\PlanSubscriptionRepository;
use Medians\Payments\Infrastructure\PaymentRepository;
use Medians\Users\Domain\User;

class PaymentService
{

	
	public $app;
	public $payment_method;
	public $planSubscriptionRepo;
	public $paymentRepo;
	
	public $title;
	public $item_name;
	public $item_price;
	public $sku;
	public $subtotal;
	public $totalcost;


	function __construct($payment_method)
	{

		$this->app = new \config\APP;

		$this->payment_method = $payment_method;
		
		$this->planSubscriptionRepo = new PlanSubscriptionRepository();
		$this->paymentRepo = new PaymentRepository();
	}


	public function storePlanSubscription($params, $user)
	{

		$planSubscription = [];
		$planSubscription['plan_id'] = $params['plan_id'];
		$planSubscription['user_id'] = $user->id;
		$planSubscription['type'] = $params['payment_type'];
		$planSubscription['start_date'] = date('Y-m-d');
		$planSubscription['end_date'] = $params['payment_type'] == 'monthly' ? date('Y-m-d', strtotime('+1 month')) : date('Y-m-d', strtotime('+1 year')) ;

		return $this->planSubscriptionRepo->store($planSubscription);
	}
	
	
	public function storePlanPayment($params, $invoice, $planSubscription, $user)
	{

		$payment['payment_code'] = $params['payment_code'];
		$payment['invoice_id'] = $invoice->invoice_id;
		$payment['business_id'] = $user->business->business_id;
		$payment['amount'] = $invoice->total_amount;
		$payment['model_id'] = $planSubscription->subscription_id;
		$payment['model_type'] = PlanSubscription::class;
		$payment['date'] = date('Y-m-d');
		$payment['payment_method'] = $invoice->payment_method;
		$payment['created_by'] = $user->id;

		return $this->paymentRepo->store($payment);


	}
	
	
	public function addInvoice($params, $savedSubscription, $user)
	{
		try {

			$invoiceRepo = new \Medians\Invoices\Infrastructure\InvoiceRepository($user->business);
			
			$data = array();
			$data['business_id'] = '0';
			$data['code'] = $this->paymentRepo->generateCode();
			$data['user_id'] = $user->id;
			$data['user_type'] = User::class;
			$data['payment_method'] = $params['payment_method'];
			$data['subtotal'] = $params['cost'];
			$data['discount_amount'] = 0;
			$data['total_amount'] = $params['cost'];
			$data['date'] = date('Y-m-d');
			$data['status'] = $params['status'];
			$data['notes'] = 'Business subscription';
			$data['items'] = $this->handleItems($params, $savedSubscription, $user);

			return $invoiceRepo->store((array) $data);

		} catch (\Throwable $th) {
			return array('error'=>$th->getMessage());
		}
		
	}
	
	
	
	public function createWallet($params, $invoice, $savedSubscription, $user)
	{
		try {

			$walletRepo = new \Medians\Wallets\Infrastructure\BusinessWalletRepository();
			
			$data = array();
			$data['business_id'] = $user->business->business_id;
			$data['user_id'] = $user->id;
			$data['user_type'] = User::class;
			$data['debit_balance'] = 0;
			$data['credit_balance'] = 0;
			$data['status'] = 'new';

			return $walletRepo->store($data);

		} catch (\Throwable $th) {
			return array('error'=>$th->getMessage());
		}
		
	}
	
	
	public function handleItems($params, $savedSubscription, $user)
	{
		$items = [
			[
				'subtotal'=> $params['cost'],
				'total_amount'=> $params['cost'],
				'item_id'=> $savedSubscription->plan_id,
				'item_type'=> 'Plan',
				'status'=> 'paid',
			]
		];
		
		return $items;
	}
	

}
