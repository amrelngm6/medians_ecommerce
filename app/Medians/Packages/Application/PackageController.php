<?php

namespace Medians\Packages\Application;
use \Shared\dbaser\CustomController;

use Medians\Packages\Infrastructure\PackageRepository;

class PackageController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;



	function __construct()
	{
		$this->app = new \config\APP;

		$this->repo = new PackageRepository();
	}



	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{
		return [
            [ 'value'=> "package_id", 'text'=> "#"],
            [ 'value'=> "name", 'text'=> translate('Package name'), 'sortable'=> true ],
            [ 'value'=> "description", 'text'=> translate('Description'), 'sortable'=> true ],
            [ 'value'=> "payment_type", 'text'=> translate('Plan type'), 'sortable'=> true ],
            [ 'value'=> "status", 'text'=> translate('status'), 'sortable'=> true ],
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
        ];
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
		return render('packages', [
	        'load_vue' => true,
	        'title' => translate('Packages'),
			'columns' => $this->columns(),
			'fillable' => $this->fillable(),
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
        
		$params = $this->app->params();

        try 
		{
        	$user = $this->app->auth();

			$params['status'] = (isset($params['status']) && $params['status'] != 'false') ? 'on' : null;
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

		$this->app = new \config\APP;

		$params = $this->app->params();

        try {

			$params['status'] = (isset($params['status']) && $params['status'] != 'false') ? 'on' : null;

           	$returnData =  ($this->repo->update($params))
           	? array('success'=>1, 'result'=>translate('Updated'), 'reload'=>0)
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

           	return  ($this->repo->delete($params['package_id']))
            ? array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1)
           	: array('error'=>translate('Not allowed'));


        } catch (Exception $e) {
            $returnData = array('error'=>$e->getMessage());
        }

        return $returnData;

	}

	
	/**
	 * Load taxi trip for Driver
	 */
	public function load_packages()
	{
		$user = $this->app->auth();

		if (empty($user)) { return null; }
		

		return $this->repo->get();

	}

	

}
