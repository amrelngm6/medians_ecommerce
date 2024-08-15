<?php

namespace Medians\Payments\Application;
use \Shared\dbaser\CustomController;

use Medians\Users\Application\GetStartedController;

use Medians\Payments\Infrastructure\PaymentRepository;

class PaymentController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;
	protected $app;



	function __construct()
	{
        $this->app = new \config\APP;
		
		$this->repo = new PaymentRepository();
	}



	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{

		return [
            [ 'value'=> "payment_id", 'text'=> ""],
            [ 'value'=> "user", 'text'=> translate('User'), 'sortable'=> true ],
            [ 'value'=> "amount", 'text'=> translate('Amount'), 'sortable'=> true ],
            [ 'value'=> "payment_method", 'text'=> translate('Payment method'), 'sortable'=> true ],
            [ 'value'=> "payment_code", 'text'=> translate('Payment code'), 'sortable'=> true ],
            [ 'value'=> "date", 'text'=> translate('Date'), 'sortable'=> true ],
			['value'=>'delete', 'text'=>translate('Delete')],
        ];
	}


	/**
	 * Admin index items
	 * Loads in vue 
	 */ 
	public function index() 
	{

		return render('payments', [
			'load_vue'=> true,
	        'title' => translate('Payments list'),
	        'items' => $this->repo->get(),
	        'columns' => $this->columns(),
	        'columns_keys' => array_column($this->columns(),'value'),
	    ]);
	}



	/**
	 * Store item to database
	 * 
	 * @return [] 
	*/
	public function store() 
	{	
        
        $this->app = new \config\APP;

		$params = $this->app->params();

        try {
        	$params['created_by'] = $this->app->auth()->id;
        	
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
        $this->app = new \config\APP;

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

        $this->app = new \config\APP;

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




	/**
	 * Success payment page 
	 */
	public function payment_success()
	{

		return render('views/front/confirmation.html.twig',['title'=> translate('Thanks for payment'),'message'=>translate('payment made successfully, enjoy with the service')]);

	}

	/**
	 * Failed  payment page 
	 */
	public function payment_failed()
	{
		return render('views/front/confirmation.html.twig',['title'=> translate('PAYMENT_CANCELED'),'message'=>translate('payment failed, Please try again')]);

	}


	public function confirmPayPalPlanPayment()
	{
		$user = $this->app->auth();
		
		$params = $this->app->params();

		$order = json_decode($params['order']);
		
		if ($order->status == 'COMPLETED' || $order->status == 'success')
		{
			
			try {
				
				$paymentService = new PaymentService($params['payment_method']);

				$savedSubscription = $paymentService->storePlanSubscription($params, $user); 

				$addInvoice = $paymentService->addInvoice($params, $savedSubscription, $user); 

				$savePlanPayment = $paymentService->storePlanPayment($params, $addInvoice, $savedSubscription, $user); 

				$createWallet = $paymentService->createWallet($params, $addInvoice, $savedSubscription, $user); 
	
				return ($addInvoice && isset($savePlanPayment->payment_id))
				? array('success'=>1, 'result'=>translate('PAYMENT_MADE_SECCUESS'), 'reload'=>1)
				: array('error'=>translate('Not allowed'));
 
	
			} catch (Exception $e) {
				return array('error'=>$e->getMessage());
			}
			
		}
		
		
		return array('error'=> $order->status ?? 'Error');
		
	}


}
