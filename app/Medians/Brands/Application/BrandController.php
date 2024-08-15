<?php

namespace Medians\Brands\Application;

use Medians\Brands\Infrastructure\BrandRepository;

use Shared\dbaser\CustomController;

class BrandController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	

	

	function __construct()
	{
		$this->repo = new BrandRepository();
	}

	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{
		return [
            [ 'value'=> "brand_id", 'text'=> "#"],
            [ 'value'=> "name", 'text'=> translate('name'), 'sortable'=> true ],
            [ 'value'=> "picture", 'text'=> translate('Logo'),  ],
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
            [ 'key'=> "brand_id", 'title'=> "#", 'column_type'=>'hidden'],
			[ 'key'=> "name", 'title'=> translate('name'), 'required'=>true,  'fillable'=> true, 'column_type'=>'text' ],
			[ 'key'=> "description", 'title'=> translate('description'),  'fillable'=> true, 'column_type'=>'textarea' ],
			[ 'key'=> "picture", 'title'=> translate('Logo'),   'fillable'=> true, 'column_type'=>'file'
			],
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
	        'title' => translate('Product brands'),
	        'items' => $this->repo->get(100),
	        'columns' => $this->columns(),
	        'fillable' => $this->fillable(),
			'object_name'=> 'Brand',
			'object_key'=> 'brand_id',
	    ]);
	}



	public function store() 
	{

		$this->app = new \config\APP;

		$params = $this->app->params();

        try {	

        	$this->validate($params);

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

            if ($this->repo->delete($params['brand_id']))
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

	}

}
