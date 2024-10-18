<?php

namespace Medians\Packages\Application;
use \Shared\dbaser\CustomController;

use Medians\Packages\Infrastructure\PackageRepository;
use Medians\Packages\Infrastructure\PackageSubscriptionRepository;
use Medians\Students\Infrastructure\StudentRepository;
use Medians\Customers\Infrastructure\EmployeeRepository;
use Medians\Customers\Infrastructure\SuperVisorRepository;

class PackageSubscriptionController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;

	protected $packageRepo;
    
	protected $studentRepo;

	protected $supervisorRepo;
    
	protected $employeeRepo;


	function __construct()
	{
        $this->app = new \config\APP;   
		$this->repo = new PackageSubscriptionRepository();
		$this->packageRepo = new PackageRepository();
		$this->studentRepo = new StudentRepository();
		$this->supervisorRepo = new SuperVisorRepository();
		$this->employeeRepo = new EmployeeRepository();
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
			'students' => $this->studentRepo->get(),
			'employees' => $this->employeeRepo->get(),
			'supervisors' => $this->supervisorRepo->get(),
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
        
        $user = $this->app->auth();

		$params = $this->app->params();

        try {
        	
			$params['payment_status'] = (isset($params['is_paid']) && $params['is_paid'] != 'false') ? 'paid' : 'unpaid';
			$params['created_by'] = $user->id;
            
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

			$params['payment_status'] = (isset($params['is_paid']) && $params['is_paid'] != 'false' && $params['is_paid'] != 'null' ) ? 'paid' : 'unpaid';

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
	 * Find unpaid subscription for payment
	 * 
	 * @param String
	 * 
	 * @return JSON
	 */
	public function loadPendingStudentsSubscription()
	{
		$user = $this->app->auth();
		
		$data = $this->repo->loadPendingStudentsSubscription( $user->customer_id);

		return $data;

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
