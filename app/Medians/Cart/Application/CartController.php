<?php

namespace Medians\Cart\Application;

use Medians\Cart\Infrastructure\CartRepository;
use Medians\Shipping\Infrastructure\ShippingRepository;

use Shared\dbaser\CustomController;

class CartController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	
	protected $shippingRepo;

	

	function __construct()
	{
		$this->app = new \config\APP;

		$this->repo = new CartRepository();

		$this->shippingRepo = new ShippingRepository();

	}

	



	public function store() 
	{

		$user = $this->app->customer_auth();

		if (!$user)
		{
			return (new GuestCartController)->store();
		}

		$params = $this->app->params();

        try {	

        	$this->validate($params);
			$params['customer_id'] = $user->customer_id;

            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added'))
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (\Exception $e) {
        	return array('result'=>$e->getMessage(), 'error'=>1);
        }

		return $returnData;
	}



	public function update()
	{

		$user = $this->app->customer_auth();

		if (!$user)
		{
			return (new GuestCartController)->update();
		}

		$params = $this->app->params();

        try {
			
            foreach ($params['cart'] as $key => $item) {
                $item['cart_id'] = $key;
				$updated = $this->repo->update($item); 
			}
            
            if ($updated)
            {
                return printResponse(array('success'=>1, 'result'=>translate('Updated'), 'reload'=>1)) ;
            }
        

        } catch (\Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }
	}


	public function delete() 
	{

		$user = $this->app->customer_auth();

		if (!$user)
		{
			return (new GuestCartController)->delete();
		}

		$params = $this->app->params();
		
        try {

            if ($this->repo->delete($params['cart_id'] ?? $params))
            {
                return array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1);
            }
            

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}

	public function validate($params) 
	{
		if (empty($params['item_id']))
		{
        	throw new \Exception(translate('Product is requierd'), 1);
		}
		
		if (empty($params['qty']))
		{
        	throw new \Exception(translate('Qty is requierd'), 1);
		}
	}


	
	/**
	 * Customers index page
	 * 
	 */ 
	public function cart( ) 
	{
		$user = $this->app->customer_auth();
		$settings = $this->app->SystemSetting();

		if (!$user)
		{
			return (new GuestCartController)->cart();
		}

		$items = $this->repo->get($user->customer_id);
		$price = $this->repo->getPrices($items);
		$total = $price;

		try {
			return render('views/front/'.$settings['template'].'/pages/cart.html.twig', [
		        'title' => translate('Cart'),
		        'items' => $items,
		        'discount' => '0',
		        'shipping' => '0',
		        'price' => $price,
		        'total' => $total,
		    ]);
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			
		}
	}
	

	
	/**
	 * Customers index page
	 * 
	 */ 
	public function sideCart( ) 
	{
		
		$customer = $this->app->customer_auth() ;
		$settings = $this->app->SystemSetting();
		echo render('/views/front/'.$settings['template'].'/blocks/side_cart_block.html.twig', [
			'items'=> isset($customer->customer_id) ? $this->repo->get($customer->customer_id) : $this->repo->guest_items($this->app->guest_auth()),
		]);
	}
	
	/**
	 * Customers index page
	 * 
	 */ 
	public function checkout( ) 
	{
		$customer = $this->app->customer_auth() ;
		$items = isset($customer->customer_id) ? $this->repo->get($customer->customer_id) : $this->repo->guest_items($this->app->guest_auth());
		
		$price = $this->repo->getPrices($items);
		$total = $price;
		
		$shippingList = $this->shippingRepo->getByItems(array_column($items->toArray(), 'item_id'));
		
		if (!count($items))
			throw new \Exception(translate('There is no items in your cart'), 1);
	
		$settings = $this->app->SystemSetting();

		try {
			return render('views/front/'.$settings['template'].'/pages/checkout.html.twig', [
		        'title' => translate('Checkout'),
		        'items' => $items,
		        'discount' => '0',
		        'shipping' => '0',
				'shipping_list' => $shippingList,
		        'subtotal' => number_format($price, 2),
		        'total' => number_format($total, 2),
		    ]);
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			
		}
	}
	
	


}
