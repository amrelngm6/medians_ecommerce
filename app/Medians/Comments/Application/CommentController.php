<?php

namespace Medians\Comments\Application;

use Medians\Comments\Infrastructure\CommentRepository;

use Shared\dbaser\CustomController;

class CommentController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	

	

	function __construct()
	{
		$this->repo = new CommentRepository();
	}

	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{
		return [
            [ 'value'=> "comment_id", 'text'=> "#"],
            [ 'value'=> "customer.name", 'text'=> translate('name'), 'sortable'=> true ],
            [ 'value'=> "item", 'text'=> translate('Item'),  ],
            [ 'value'=> "comment", 'text'=> translate('Rating'),  ],
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
            [ 'key'=> "comment_id", 'title'=> "#", 'column_type'=>'hidden'],
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
	        'title' => translate('Comments'),
	        'items' => $this->repo->get(100),
	        'columns' => $this->columns(),
	        'fillable' => $this->fillable(),
			'object_name'=> 'Comment',
			'object_key'=> 'comment_id',
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

            if ($this->repo->delete($params['comment_id']))
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
        	throw new \Exception(translate('Item required'), 1);
		}
		
		if (empty($params['comment']))
		{
			throw new \Exception(translate('Comment required'), 1);
		}

	}

}
