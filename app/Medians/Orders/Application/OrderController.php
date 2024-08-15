<?php

namespace Medians\Orders\Application;
use \Shared\dbaser\CustomController;

use Medians\Orders\Infrastructure\OrderRepository;
use Medians\Cart\Infrastructure\CartRepository;

class OrderController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;
	protected $app;
	protected $cartRepo;

	function __construct()
	{
        $this->app = new \config\APP;
		
		$this->repo = new OrderRepository();
		$this->cartRepo = new CartRepository();
	}



	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{

		return [
            [ 'value'=> "order_id", 'text'=> "#"],
            [ 'value'=> "customer", 'text'=> translate('customer'), 'sortable'=> false ],
            [ 'value'=> "items.length", 'text'=> translate('Items'), 'sortable'=> true ],
            [ 'value'=> "subtotal", 'text'=> translate('Subtotal'), 'sortable'=> true ],
            [ 'value'=> "total_amount", 'text'=> translate('Total Amount'), 'sortable'=> true ],
            [ 'value'=> "total_discount", 'text'=> translate('Discount'), 'sortable'=> true ],
            [ 'value'=> "tax_amount", 'text'=> translate('Tax'), 'sortable'=> true ],
            [ 'value'=> "date", 'text'=> translate('Date'), 'sortable'=> true ],
            [ 'value'=> "status", 'text'=> translate('status'), 'sortable'=> false ],
            [ 'value'=> "notes", 'text'=> translate('Notes'), 'sortable'=> true ],
			['value'=>'edit', 'text'=>translate('View')],
			// ['value'=>'delete', 'text'=>translate('Delete')],
        ];
	}


	/**
	 * Admin index items
	 * Loads in vue 
	 */ 
	public function index() 
	{
		$params = $this->app->request()->query->all();

		$items = $this->repo->getByDate($params);

		return render('orders', [
			'load_vue'=> true,
			'no_create'=> true,
	        'title' => translate('Orders list'),
	        'items' => $items,
	        'columns' => $this->columns(),
	        'object_name' => 'Order',
	        'object_key' => 'order_id',
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
		$customerAuthService = new \Medians\Auth\Application\CustomerAuthService();
        try {

			$customer = $this->app->customer_auth();
			$items = isset($customer->customer_id) ? $this->cartRepo->get($customer->customer_id) : $this->cartRepo->guest_items($this->app->guest_auth());
	
			$params['items'] = $items;

			$customer = $customer ? $customer : $this->generateCustomer($params);
			$params['customer_id'] = $customer->customer_id;

			if (!count($params['items']))
				throw new \Exception(translate("No items in the cart"), 1);
			
			if ($customer->wasRecentlyCreated)
			{
				$customerAuthService->setSession($customer);
			}
				
			$order = $this->repo->store($params);
			return isset($order->order_id)
            ? array('success'=>1, 'result'=>translate('Added'), 'redirect'=>'/order/'.$order->order_id)
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

           	$returnData =  $this->repo->delete($params['order_id'])
           	? array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1)
           	: array('error'=>translate('Not allowed'));


        } catch (Exception $e) {
            $returnData = array('error'=>$e->getMessage());
        }

        return response($returnData);

	}

	public function generateCustomer($params)
	{
		$customerRepo = new \Medians\Customers\Infrastructure\CustomerRepository;

		$checkCustomer = $customerRepo->findByEmail($params['field']['email']);

		if ($checkCustomer)
			return $checkCustomer;

		$data = $params['field'];
		$data['field'] = $params['field'];
		$data['name'] = $params['field']['first_name'];
		$data['status'] = 'on';
		return $customerRepo->store($data);
	}

	public function addOrder()
	{
		
		$params = $this->app->params();

		try {
			
			$saveOrder = $this->repo->store($params); 

			return (isset($saveOrder['success']))
			? array('success'=>1, 'result'=>$saveOrder['result'], 'reload'=>1)
			: array('error'=>$saveOrder['error']);

		} catch (Exception $e) {
			return array('error'=>$e->getMessage());
		}
	}



	/**
	 * Display order page 
	 */
	public function orderPage($id)
	{
		try {
			
			$this->app = new \config\APP;
			$customer = $this->app->customer_auth();

			if (!$customer) { return $this->app->redirect('/customer/dashboard'); }
            $settings = $this->app->SystemSetting();
			
			$order = $this->repo->findCustomerOrder($id, $customer->customer_id);
			$order ?? throw new \Exception(translate('Order not found'), 1);
			

			return render('views/front/'.($settings['template'] ?? 'default').'/pages/order.html.twig', [
		        'title' => translate('Your order'),
		        'app' => $this->app,
				'order' => $order

		    ]);
		    
		} catch (Exception $e) {
        	throw new Exception("Error Processing Request", 1);
		}
	}


}
