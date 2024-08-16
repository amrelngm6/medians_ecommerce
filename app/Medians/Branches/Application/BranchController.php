<?php

namespace Medians\Branches\Application;
use Shared\dbaser\CustomController;

use Medians\Branches\Infrastructure\BranchRepository;


class BranchController extends CustomController 
{


	/*
	/ @var new CustomerRepository
	*/
	private $repo;

	public $app;


	function __construct()
	{
		$this->app = new \config\APP;
		
		$this->repo = new BranchRepository();
	}


	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{
		return [
            [ 'value'=> "id", 'text'=> "#"],
            [ 'value'=> "name", 'text'=> translate('name'), 'sortable'=> true ],
            [ 'value'=> "phone", 'text'=> translate('phone'),  ],
            [ 'value'=> "address", 'text'=> translate('Address'),  ],
            [ 'value'=> "edit", 'text'=> translate('edit')  ],
            [ 'value'=> "status", 'text'=> translate('Status')  ],
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
            [ 'key'=> "id", 'title'=> "#", 'column_type'=>'hidden'],
			[ 'key'=> "name", 'title'=> translate('name'), 'required'=>true,  'fillable'=> true, 'column_type'=>'text' ],
			[ 'key'=> "address", 'title'=> translate('address'),   'fillable'=> true, 'column_type'=>'text'],
			[ 'key'=> "phone", 'title'=> translate('phone'),   'fillable'=> true, 'column_type'=>'phone'],
			[ 'key'=> "info", 'title'=> translate('info'),   'fillable'=> true, 'column_type'=>'text'],
			[ 'key'=> "latitude", 'title'=> translate('Latitude'),   'fillable'=> true, 'column_type'=>'text'],
			[ 'key'=> "longitude", 'title'=> translate('Longitude'),   'fillable'=> true, 'column_type'=>'text'],
			[ 'key'=> "status", 'title'=> translate('Status'),   'fillable'=> true, 'column_type'=>'checkbox'],
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
	        'title' => translate('Branches'),
	        'items' => $this->repo->get(100),
	        'columns' => $this->columns(),
	        'fillable' => $this->fillable(),
			'object_name'=> 'Branch',
			'object_key'=> 'id',
	    ]);
	}


	/**
	 * Create new Branch
	 * 
	 */
	public function store() 
	{

		$params = $this->app->params();

        try {	

			$params['status'] = !empty($params['status']) ? $params['status'] : null;

            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (\Exception $es) {
        	return array('result'=>$es->getMessage(), 'error'=>1);
        }

		return $returnData;
	}



	/**
	 * Update Branch
	 * 
	 */
	public function update()
	{
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


	/**
	 * Delete Branch
	 * 
	 */
	public function delete() 
	{

		$params = $this->app->params();

        try {

            if ($this->repo->delete($params['id']))
            {
                return json_encode(array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1));
            }
            
        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        }
	}

	
	
	/**
	 * Ajax load productsby with filters
	 */
	public function list()
	{
		$this->app = new \config\App;
		$params = $this->app->params();
		$settings = $this->app->SystemSetting();
		echo render('/views/front/'.$settings['template'].'/pages/list_branches.html.twig', [
			'branches'=> $this->repo->get()
		]);
	}


}
