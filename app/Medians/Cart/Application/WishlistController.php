<?php

namespace Medians\Cart\Application;

use Medians\Cart\Infrastructure\WishlistRepository;

use Shared\dbaser\CustomController;

class WishlistController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	

	

	function __construct()
	{
		$this->app = new \config\APP;

		$this->repo = new WishlistRepository();
	}

	



	public function store() 
	{

		$user = $this->app->auth();

		$params = $this->app->params();

        try {	

        	$params['user_id'] = $user->customer_id ?? 0;
        	$params['session_id'] = $_SESSION['guest_id'] ?? 0;

        	$this->validate($params, $user);

            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>0)
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (\Exception $e) {
        	return array('result'=>$e->getMessage(), 'error'=>1);
        }

		return $returnData;
	}



	public function update()
	{

		$user = $this->app->auth();

		$params = $this->app->params();

        try {

            if ($this->repo->update($params))
            {
                return array('success'=>1, 'result'=>translate('Updated'), 'reload'=>1);
            }
        

        } catch (\Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}


	public function delete() 
	{

		$user = $this->app->auth();

		$params = $this->app->params();
		
        try {

            if ($this->repo->delete($params['wishlist_id']))
            {
                return array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1);
            }
            

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}

	public function validate($params, $user) 
	{
		if (empty($params['item_id']))
		{
        	throw new \Exception(translate('Product is requierd'), 1);
		}

		if (empty($user->customer_id))
		{
        	throw new \Exception(translate('Please login first'), 1);
		}
		
	}


	
	/**
	 * Customers index page
	 * 
	 */ 
	public function wishlist( ) 
	{
		$user = $this->app->auth();
		$settings = $this->app->SystemSetting();


		// $total = $price;

		try {
			return render('views/front/'.$settings['template'].'/pages/wishlist.html.twig', [
		        'title' => translate('wishlist'),
		        'items' => $this->repo->get($user->customer_id),
		        'discount' => '0',
		        'shipping' => '0',
		        // 'price' => $price,
		        // 'total' => $total,
		    ]);
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			
		}
	}
	


}
