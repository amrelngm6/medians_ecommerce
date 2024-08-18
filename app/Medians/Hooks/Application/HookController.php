<?php

namespace Medians\Hooks\Application;
use Shared\dbaser\CustomController;

use Medians\Hooks\Infrastructure\HookRepository;


class HookController extends CustomController 
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;

	

	function __construct()
	{

		$this->app = new \config\APP;
		$this->repo = new HookRepository;
	}


	
	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{

		return [
            [ 'value'=> "id", 'text'=> "#"],
            [ 'value'=> "content.title", 'text'=> translate('title'), 'sortable'=> false ],
            [ 'value'=> "position", 'text'=> translate('position'), 'sortable'=> true ],
            [ 'value'=> "plugin", 'text'=> translate('plugin'), 'sortable'=> true ],
            [ 'value'=> "status", 'text'=> translate('status'), 'sortable'=> false ],
			['value'=>'edit', 'text'=>translate('View')],
			['value'=>'delete', 'text'=>translate('Delete')],
        ];
	}

	
	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            
			'basic'=> [	
	            [ 'key'=> "logo", 'title'=> translate('logo'), 'fillable'=>true, 'column_type'=>'file' ],
				[ 'key'=> "allow_notifications", 'title'=> translate('Allow Notifications'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "lang", 'title'=> translate('Languange'), 
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'title', 
					'data' => [['lang'=>'arabic','title'=>translate('Arabic')], ['lang'=>'english','title'=>translate('English')]]  
				],
			],
			
			'information'=> [	
				[ 'key'=> "email", 'title'=> translate('Email'), 'help_text'=>translate('This email used for view at your profile, but for notifications we use your login email'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "address", 'title'=> translate('Address'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "mobile", 'title'=> translate('mobile'), 'fillable'=> true, 'column_type'=>'number' ],
				[ 'key'=> "phone", 'title'=> translate('phone'), 'fillable'=> true, 'column_type'=>'number' ],
			],

			
        ];
	}



	/**
	 * Admin index items
	 * Loads in vue 
	 */ 
	public function index() 
	{
		$params = $this->app->request()->query->all();

		return render('hooks', [
			'load_vue'=> true,
	        'title' => translate('Hooks list'),
	        'items' => $this->repo->get($params),
	        'columns' => $this->columns(),
	    ]);
	}




	/**
	 * Admin hook page
	 * 
	 */ 
	public function hook( $hook_id ) 
	{
		try {

			$item = $this->repo->find($hook_id);

			return render('', [
		        'load_vue' => true,
		        'title' => translate('Hook page'),
		        // 'columns' => $this->columns(),
		        'fillable' => $this->fillable(),
		        'item' => $item,
		    ]);

		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
	}

	public function store() 
	{

		$this->app = new \config\APP;

		$params = $this->app->params();

        try {	

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

            if ($this->repo->delete($params['id']))
            {
                return array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1);
            }
            

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}

}