<?php

namespace Medians\Transactions\Application;
use \Shared\dbaser\CustomController;

use Medians\Users\Application\GetStartedController;

use Medians\Transactions\Infrastructure\TransactionRepository;

class TransactionController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;
	protected $app;



	function __construct()
	{
        $this->app = new \config\APP;
		
		$user = $this->app->auth();
		$this->repo = new TransactionRepository();

	}



	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{

		return [
            [ 'value'=> "transaction_id", 'text'=> "#"],
            [ 'value'=> "field.order_id", 'text'=> translate('Transaction code'), 'sortable'=> true ],
            [ 'value'=> "model", 'text'=> translate('User'), 'sortable'=> false ],
            [ 'value'=> "amount", 'text'=> translate('Amount'), 'sortable'=> true ],
            [ 'value'=> "payment_method", 'text'=> translate('Gateway'), 'sortable'=> true ],
            [ 'value'=> "date", 'text'=> translate('Date'), 'sortable'=> true ],
            [ 'value'=> "invoice.code", 'text'=> translate('Invoice'), 'sortable'=> false ],
			['value'=>'delete', 'text'=>translate('Delete')],
        ];
	}


	/**
	 * Admin index items
	 * Loads in vue 
	 */ 
	public function index() 
	{
		$params = sanitizeInput($this->app->request()->query->all());

		return render('transactions', [
			'load_vue'=> true,
	        'title' => translate('Transaction list'),
	        'items' => $this->repo->getByDate($params),
	        'columns' => $this->columns(),
	    ]);
	}



	/**
	 * Store item to database
	 * 
	 * @return [] 
	*/
	public function store() 
	{	
        
		$params = $this->app->params();

        try {
        	
            return ($this->repo->store($params))
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
            : array('error'=>translate('Err'));


        } catch (Exception $e) {
            return array('error'=>$e->getMessage());
        }
	
	}



	/**
	 * Update item to database
	 * 
	 * @return [] 
	*/
	public function update() 
	{

		$params = $this->app->params();

        try {

           	$returnData =  ($this->repo->update($params))
           	? array('success'=>1, 'result'=>translate('Updated'), 'reload'=>1)
           	: array('error'=>translate('Not allowed'));


        } catch (Exception $e) {
            $returnData = array('error'=>$e->getMessage());
        }

        return $returnData;

	}


	/**
	 * Delete item from database
	 * 
	 * @return [] 
	*/
	public function delete() 
	{
		$params = $this->app->params();

        try {

           	$returnData =  $this->repo->delete($params['id'])
           	? array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1)
           	: array('error'=>translate('Not allowed'));


        } catch (Exception $e) {
            $returnData = array('error'=>$e->getMessage());
        }

        return response($returnData);

	}





	public function addTransaction()
	{
		
		$params = (array) $this->app->params();

		$user = $this->app->auth();

		try {
			
			$paymentService = new PaymentService($params['payment_method']);

			$addInvoice = $paymentService->addInvoice($params); 
			
			$updateWallet = $paymentService->updateWallet($params, $addInvoice); 

			$saveTransaction = $paymentService->storeSubscriptionTransaction($params, $addInvoice); 
			
			$savedSubscription = $paymentService->updatePackageSubscription($params); 

			return (isset($saveTransaction->invoice_id))
			? array('success'=>true,  'result'=>translate('PAYMENT_MADE_SECCUESS'))
			: array('error'=>$saveTransaction['error']);

		} catch (Exception $e) {
			return array('error'=>$e->getMessage());
		}
		
		
	}


	public function addTripTransaction()
	{
		
		$params = (array) $this->app->params();

		$user = $this->app->auth();

		try {
			
			$paymentService = new PaymentService($params['payment_method']);

			$addInvoice = $paymentService->addInvoice($params); 

			$saveTransaction = $paymentService->storeTripTransaction($params, $addInvoice); 
			
			$updateTrip = isset($saveTransaction['success']) ? $paymentService->updateTrip($params, $addInvoice) : null; 

			$updateWallet = isset($saveTransaction['success']) ? $paymentService->updateWallet($params, $addInvoice) : null; 


			return (isset($saveTransaction['success']))
			? array('success'=>1, 'result'=>$saveTransaction['result'], 'reload'=>1)
			: array('error'=>$saveTransaction['error']);

		} catch (Exception $e) {
			return array('error'=>$e->getMessage());
		}
	}

	

	public function addTripCashTransaction()
	{
		
		$params = (array) $this->app->params();

		$user = $this->app->auth();

		try {
			
			$paymentService = new PaymentService($params['payment_method']);

			$addInvoice = $paymentService->addInvoice($params); 

			$saveTransaction = $paymentService->storeTripTransaction($params, $addInvoice); 
			
			$updateTrip = isset($saveTransaction['success']) ? $paymentService->updateTrip($params, $addInvoice) : null; 

			$updateWallet = isset($saveTransaction['success']) ? $paymentService->updateWallet($params, $addInvoice) : null; 

			return (isset($saveTransaction['success']))
			? array('success'=>1, 'result'=>$saveTransaction['result'], 'reload'=>1)
			: array('error'=>$saveTransaction['error']);

		} catch (Exception $e) {
			return array('error'=>$e->getMessage());
		}
	}


	public function createPaymentIntent()
	{
		// $settings = $this->app->SystemSetting(); 
		// $amount = $this->app->request()->get('amount');

		// $stripe = new \Stripe\StripeClient($settings['stripe_live_key']);
		// $res = $stripe->paymentIntents->create([
		//   'amount' => $amount ?? 0,
		//   'automatic_payment_methods' => ['enabled' => true],
		// ]);

		// $return = json_encode($res);

		// echo $return;
	}
}
