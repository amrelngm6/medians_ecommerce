<?php

namespace Medians\Cart\Application;

use Medians\Cart\Infrastructure\CartRepository;

use Shared\dbaser\CustomController;

class GuestCartController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	

	

	function __construct()
	{
		$this->app = new \config\APP;

		$this->repo = new CartRepository();
	}

	



	public function store() 
	{

		$params = $this->app->params();

		$sessionId = $this->app->guest_auth();

		try {	

			$params['session_id'] = $sessionId ?? $this->app->guest_auth();
			
        	$validate = $this->validate($params);
			
            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added to cart'), 'reload'=>0)
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (\Exception $e) {
        	return array('result'=>$e->getMessage(), 'error'=>1);
        }

		return $returnData;
	}



	public function update()
	{

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
        	throw new \Exception($e->getMessage() . "Error Processing Request", 1);
        	
        }
	}

	public function convertSession()
	{

        try {
			
			$sessionId = $this->app->guest_auth();
			$customer = $this->app->customer_auth();

			return isset($customer->customer_id) ? $this->repo->updateCustomerSessionItems($sessionId, $customer->customer_id) : '';  
            
        } catch (\Exception $e) {
        	throw new \Exception($e->getMessage() . "Error Processing Request", 1);
        	
        }
	}


	public function delete() 
	{
        
        $params = $this->app->params();
        
        try {

            if ($this->repo->delete($params['cart_id'] ?? $params))
            {
                return printResponse( array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1) );
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

		if (empty($params['session_id']))
		{
        	throw new \Exception(translate('Session is requierd'), 1);
		}
	}


	

	/**
	 * Guests index page
	 */ 
	public function cart( ) 
	{
		$sessionId = $this->app->guest_auth();
		$settings = $this->app->SystemSetting();

		$items = $this->repo->guest_items($sessionId);
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

}
