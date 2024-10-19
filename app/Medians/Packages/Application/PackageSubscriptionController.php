<?php

namespace Medians\Packages\Application;
use \Shared\dbaser\CustomController;

use Medians\Packages\Infrastructure\PackageRepository;
use Medians\Packages\Infrastructure\PackageSubscriptionRepository;
use Medians\Customers\Infrastructure\CustomerRepository;

class PackageSubscriptionController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;

	protected $packageRepo;
    
	protected $customerRepo;


	function __construct()
	{
        $this->app = new \config\APP;   
		$this->repo = new PackageSubscriptionRepository();
		$this->packageRepo = new PackageRepository();
		$this->customerRepo = new CustomerRepository();
	}



	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{
		return [
            [ 'value'=> "subscription_id", 'text'=> "#"],
            [ 'value'=> "name", 'text'=> translate('Name'), 'sortable'=> true ],
            [ 'value'=> "package.name", 'text'=> translate('Package'), 'sortable'=> true ],
            [ 'value'=> "total_cost", 'text'=> translate('Total cost'), 'sortable'=> true ],
            [ 'value'=> "payment_status", 'text'=> translate('Payment'), 'sortable'=> true ],
            [ 'value'=> "payment_type", 'text'=> translate('Duration'), 'sortable'=> true ],
            [ 'value'=> "start_date", 'text'=> translate('start_date'), 'sortable'=> true ],
            [ 'value'=> "end_date", 'text'=> translate('end_date'), 'sortable'=> true ],
            [ 'value'=> "edit", 'text'=> translate('edit')  ],
            [ 'value'=> "delete", 'text'=> translate('delete')  ],
        ];
	}

	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

	}


	/**
	 * Admin index items
	 * 
	 * @param Silex\Application $app
	 * @param \Twig\Environment $twig
	 * 
	 */ 
	public function index() 
	{
		return render('package_subscriptions', [
	        'load_vue' => true,
	        'title' => translate('Package Subscriptions'),
			'columns' => $this->columns(),
			'fillable' => $this->fillable(),
			'packages' => $this->packageRepo->get(),
	        'items' => $this->repo->get(),
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
        
        $customer = $this->app->customer_auth();

		$params = $this->app->params();
		
        try {
			
			$item = $this->packageRepo->find($params['package_id']);


			$params['customer_id'] = $customer->customer_id;
			$params['payment_status'] = $item->is_paid ? 'paid' : 'free';
			$params['package_id'] = $item->package_id;
			$params['start_date'] = date("Y-m-d");
			switch ($params['duration']) 
			{
				case 'quarter':
					$params['end_date'] = date('Y-m-d', strtotime("+3 months"));
					$params['payment_type'] = 'quarter';
					break;
				
				case 'year':
					$params['end_date'] = date('Y-m-d', strtotime("+1 year"));
					$params['payment_type'] = 'year';
					break;
				
				default:
					$params['end_date'] = date('Y-m-d', strtotime("+1 month"));
					$params['payment_type'] = 'month';
					break;
			}

			$cost = 'cost_'.$params['payment_type'];
			$params['total_cost'] = $item->$cost;

            print_r($params);
			return;
			return ($this->repo->store($params))
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
            : array('success'=>0, 'result'=>translate('Error'), 'error'=>1);


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

        // return null;
		$this->app = new \config\APP;

		$params = $this->app->params();

        try {


           	$returnData =  ($this->repo->update($params))
           	? array('success'=>1, 'result'=>translate('Updated'), 'reload'=>true)
           	: array('error'=>'Not allowed');

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

           	return  ($this->repo->delete($params['subscription_id']))
            ? array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1)
           	: array('error'=>translate('Not allowed'));


        } catch (Exception $e) {
            $returnData = array('error'=>$e->getMessage());
        }

        return $returnData;

	}


	/**
	 * Get subscription
	 * 
	 * @param String
	 * 
	 * @return JSON
	 */
	public function getSubscription()
	{
		$subscriptionId = $this->app->request()->get('subscription_id');
		
		$data = $this->repo->find( $subscriptionId);

		return $data;

	}  

	/**
	 * Cancel subscription
	 * 
	 * @param String
	 * 
	 * @return JSON
	 */
	public function cancelSubscription()
	{
		$subscriptionId = $this->app->request()->get('subscription_id');
		
		$data = $this->repo->cancelSubscription( $subscriptionId);

		return $data == true ? array('success'=>true, 'result'=>translate('Subscription canceled')) : $data;

	}  

}
