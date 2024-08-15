<?php

namespace Medians\Cart\Application;

use Medians\Cart\Infrastructure\CompareRepository;

use Shared\dbaser\CustomController;

class GuestCompareController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	

	

	function __construct()
	{
		$this->app = new \config\APP;

		$this->repo = new CompareRepository();
	}

	



	public function store() 
	{

		$params = $this->app->params();

		$sessionId = $this->app->guest_auth();

		try {	

			$params['session_id'] = $sessionId;
        	$this->validate($params);
            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added to Compare'), 'reload'=>0)
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (\Exception $e) {
        	return array('result'=>$e->getMessage(), 'error'=>1);
        }

		return $returnData;
	}



	public function update()
	{
		$this->app = new \config\APP;

		$params = $this->app->params();

        try {

            foreach ($params['compare'] as $key => $item) {
                $item['compare_id'] = $key;
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


	public function delete() 
	{
		$this->app = new \config\APP;
        
        
        $post_data = json_decode(file_get_contents('php://input'), true);
        $compareId = json_decode($post_data['params']);
        try {

            if ($this->repo->delete($compareId))
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

		if (empty($params['session_id']))
		{
        	throw new \Exception(translate('Session is requierd'), 1);
		}
	}


	

	/**
	 * Guests index page
	 */ 
	public function compare( ) 
	{
		$sessionId = $this->app->guest_auth();
		$settings = $this->app->SystemSetting();

		$items = $this->repo->guest_items($sessionId);
		$price = $this->repo->getPrices($items);
		$total = $price;

		try {
			return render('views/front/'.$settings['template'].'/pages/compare.html.twig', [
		        'title' => translate('Compare'),
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
