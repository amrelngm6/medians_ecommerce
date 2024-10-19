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
            [ 'value'=> "customer.name", 'text'=> translate('Customer'), 'sortable'=> true ],
            [ 'value'=> "package.name", 'text'=> translate('Package'), 'sortable'=> true ],
            [ 'value'=> "total_cost", 'text'=> translate('Total cost'), 'sortable'=> true ],
            [ 'value'=> "payment_type", 'text'=> translate('Payment'), 'sortable'=> true ],
            [ 'value'=> "duration", 'text'=> translate('Duration'), 'sortable'=> true ],
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
		return render('data_table', [
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
			$params['payment_type'] = $item->is_paid ? 'paid' : 'free';
			$params['package_id'] = $item->package_id;
			$params['start_date'] = date("Y-m-d");
			switch ($params['duration']) 
			{
				case 'quarter':
					$params['end_date'] = date('Y-m-d', strtotime("+3 months"));
					$params['duration'] = 'quarter';
					break;
				
				case 'year':
					$params['end_date'] = date('Y-m-d', strtotime("+1 year"));
					$params['duration'] = 'year';
					break;
				
				default:
					$params['end_date'] = date('Y-m-d', strtotime("+1 month"));
					$params['duration'] = 'month';
					break;
			}

			$cost = 'cost_'.$params['duration'];
			$params['total_cost'] = $item->$cost;


			$this->validate($params, $item);

			$save = $this->repo->store($params);
			$redirect = '/studio/subscription/'.$save->subscription_id;

			if (isset($save->subscription_id))
			{
				$InvoiceController = new \Medians\Invoices\Application\InvoiceController;
				$invoiceParams = [];
				$invoiceParams['customer_id'] = $customer->customer_id;
				$invoiceParams['subscription_id'] = $save->subscription_id;
				$invoiceParams['payment_method'] = $params['payment_method'] ?? 'paypal';
				$invoiceParams['subtotal'] = $params['total_cost'];
				$invoiceParams['total_amount'] = $params['total_cost'];
				$invoiceParams['date'] = $params['start_date'];
				$invoiceParams['status'] = 'unpaid';
				$invoiceParams['discount_amount'] = '0';
				$invoiceParams['notes'] = $params['notes'] ?? '';
				$invoiceParams['currency_code'] = $params['currency_code'] ?? '$';
				$addInvoice = $InvoiceController->addInvoice($invoiceParams);
				$redirect = '/invoice/'.$addInvoice->code;
			}
			
			
			return $save
            ? array('success'=>1, 'result'=>translate('Added'), 'redirect'=> $redirect)
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


	/**
	 * Validate the subscription
	 */
	public function validate($params, $item)
	{
		$customer = $this->app->customer_auth(); 
		if (empty($customer)) {
			throw new \Exception(translate('Login first'), 1);
		}
		
		
		if (!empty($customer->subscription)) {

			if ($customer->subscription->is_valid && $customer->subscription->is_paid )
			{
				throw new \Exception(translate('Cancel your current subscription first'), 1);
			}
			
			if ($customer->subscription->is_valid && !$customer->subscription->is_paid && !$item->is_paid )
			{
				throw new \Exception(translate('Your current package and this one are free'), 1);
			}
		}

	}



	/**
     * Subscriptions list page for studio frontend
     */
    public function studio()
    {
		$customer = $this->app->customer_auth();

		$settings = $this->app->SystemSetting();

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $customer,
                'layout' => isset($this->app->customer->customer_id) ? 'studio_subscriptions' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }






}
