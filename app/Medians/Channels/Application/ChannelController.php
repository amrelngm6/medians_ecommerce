<?php

namespace Medians\Channels\Application;

use Medians\Customers\Infrastructure\CustomerRepository;

use Shared\dbaser\CustomController;

class ChannelController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	

	

	function __construct()
	{
		$this->repo = new CustomerRepository();
	}

	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{
		return [
            [ 'value'=> "channel_id", 'text'=> "#"],
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
            [ 'key'=> "channel_id", 'title'=> "#", 'column_type'=>'hidden'],
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
	        'title' => translate('Channels'),
	        'items' => $this->repo->get(100),
	        'columns' => $this->columns(),
	        'fillable' => $this->fillable(),
			'object_name'=> 'Channel',
			'object_key'=> 'channel_id',
	    ]);
	}



	public function store() 
	{

		$this->app = new \config\APP;

		$params = $this->app->params();

        try {	

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


	public function delete() 
	{


		$this->app = new \config\APP;

		$params = $this->app->params();
		
        try {

            if ($this->repo->delete($params['channel_id']))
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
        	throw new \Exception(json_encode(array('result'=>translate('NAME_EMPTY'), 'error'=>1)), 1);
		}

		if (empty($this->app->customer->customer_id))
		{
        	throw new \Exception(json_encode(array('result'=>translate('Login first'), 'error'=>1)), 1);
		}

	}




	
    
    /**
     * Channels list page for frontend
     */
    public function channels()
    {
		$this->app = new \config\APP;

		$settings = $this->app->SystemSetting();

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'channels' => $this->repo->get(),
                'layout' => 'channels'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
	
    
    /**
     * search Channels list page for frontend
     */
    public function search()
    {
		$this->app = new \config\APP;

		$settings = $this->app->SystemSetting();

        $params['limit'] = $settings['view_items_limit'] ?? null;
        $list = $this->repo->getWithFilter($params);

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'layout' => 'search/search',
                'sub_layout' => 'artist',
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }


}
