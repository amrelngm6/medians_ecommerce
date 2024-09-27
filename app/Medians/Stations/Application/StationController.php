<?php

namespace Medians\Stations\Application;

use Medians\Stations\Infrastructure\StationRepository;

use Shared\dbaser\CustomController;

class StationController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	

	

	function __construct()
	{
		$this->repo = new StationRepository();
	}

	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{
		return [
            [ 'value'=> "station_id", 'text'=> "#"],
            [ 'value'=> "name", 'text'=> translate('name'), 'sortable'=> true ],
            [ 'value'=> "items_count", 'text'=> translate('Items'),  ],
            [ 'value'=> "customer.name", 'text'=> translate('Customer'),  ],
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

		return [
            [ 'key'=> "station_id", 'title'=> "#", 'column_type'=>'hidden'],
			[ 'key'=> "name", 'title'=> translate('name'), 'disabled'=>true,  'fillable'=> true, 'column_type'=>'text' ],
			[ 'key'=> "email", 'title'=> translate('Email'), 'disabled'=>true,  'fillable'=> true, 'column_type'=>'email' ],
			[ 'key'=> "comment", 'title'=> translate('Comment'), 'disabled'=>true,  'fillable'=> true, 'column_type'=>'text' ],
			[ 'key'=> "rate", 'title'=> translate('Rating'),  'fillable'=> true, 'column_type'=>'number' ],
			[ 'key'=> "status", 'title'=> translate('status'),  'fillable'=> true, 'column_type'=>'checkbox' ],
        ];
	}

	/**
	 * Admin index items
	 * 
	 * @param Silex\Application $app
	 * @param \Twig\Environment $twig
	 * 
	 */ 
	public function index(  ) 
	{
	    return render('data_table', [
	        'load_vue' => true,
	        'title' => translate('Stations'),
	        'items' => $this->repo->get(100),
	        'columns' => $this->columns(),
	        'fillable' => $this->fillable(),
			'object_name'=> 'Station',
			'object_key'=> 'station_id',
	    ]);
	}



	public function store() 
	{

		$this->app = new \config\APP;

		$params = $this->app->params();

        try {	

        	$this->app->customer_auth();
        	$this->validate($params);
			$params['customer_id'] = $this->app->customer->customer_id;

            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (\Exception $e) {
        	return array('result'=>$e->getMessage(), 'error'=>1);
        }

		return $returnData;
	}


	public function add_item() 
	{

		$this->app = new \config\APP;

		$params = $this->app->params();

        try {	

        	$this->app->customer_auth();
			$params['customer_id'] = $this->app->customer->customer_id;

            $returnData = (!empty($this->repo->store_item($params))) 
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
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

        	$params['status'] = !empty($params['status']) ? $params['status'] : null;
            if ($this->repo->update($params))
            {
                return array('success'=>1, 'result'=>translate('Updated'), 'reload'=>1);
            }
        

        } catch (\Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}


	public function update_item()
	{

		$this->app = new \config\APP;

		$params = $this->app->params();

        try {

            if ($this->repo->update_item($params))
            {
                return array('success'=>1, 'result'=>translate('Updated'), 'reload'=>0);
            }
        

        } catch (\Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}


	public function delete() 
	{

		$this->app = new \config\APP;

		$params = $this->app->params();
		
        try {

            if ($this->repo->delete($params['station_id']))
            {
                return array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1);
            }
            

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}

	public function deleteItem() 
	{

		$this->app = new \config\APP;

		$params = $this->app->params();
		
        try {

            if ($this->repo->deleteItem($params['station_media_id']))
            {
                return array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1);
            }
            

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}

	public function validate($params) 
	{


		if (empty($params['name']))
		{
        	throw new \Exception(translate('NAME_EMPTY'), 1);
		}

		if (empty($this->app->customer->customer_id))
		{
        	throw new \Exception(translate('Login first'), 1);
		}

	}

    /**
     * Station JSON for frontend
     */
    public function station_json($station_id)
    {

		try {

			echo json_encode($this->repo->find($station_id));
			return;
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }

    /**
     * Station page for frontend
     */
    public function station($station_id)
    {
		$this->app = new \config\APP;
		
		$settings = $this->app->SystemSetting();

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
				'item' => $this->repo->find($station_id),
                'layout' => 'station'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }

    /**
     * Stations list page for frontend
     */
    public function stations()
    {
		$this->app = new \config\APP;

		$settings = $this->app->SystemSetting();

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
				'items' => $this->repo->getTop(20),
                'layout' => 'stations'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }


	
    
    /**
     * Discover page for frontend
     */
    public function search()
    {
		$this->app = new \config\APP;

		$settings = $this->app->SystemSetting();

        $params = $this->app->params();

        $params['limit'] = $settings['view_items_limit'] ?? null;
        $list = $this->repo->getWithFilter($params);

		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'search_list' => $list,
                'layout' => 'search/search',
                'sub_layout' => 'station',
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }

	
    /**
     * Discover page for frontend
     */
    public function calendar($id)
    {
		$this->app = new \config\APP;

		$settings = $this->app->SystemSetting();

        $params = $this->app->params();

		$station = $this->repo->find($id);

		$datetime = new \DateTime();
		$datetime_string = $datetime->format('c');
		
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'station' => $station,
				'now' => $datetime_string,
                'layout' => 'calendar',
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
	
}
