<?php
namespace Medians\Events\Application;

use Shared\dbaser\CustomController;

use Medians\Events\Infrastructure\EventRepository;

class EventController extends CustomController 
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;

	

	function __construct()
	{

		$this->app = new \config\APP;

		$this->repo = new EventRepository	();
	}




	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{

		return [
            [ 'value'=> "event_id", 'text'=> "#"],
            [ 'value'=> "title", 'text'=> translate('Title'), 'sortable'=> true ],
            [ 'value'=> "status", 'text'=> translate('status'), 'sortable'=> true ],
            [ 'value'=> "date", 'text'=> translate('date'), 'sortable'=> true ],
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
            [ 'key'=> "event_id", 'title'=> "", 'fillable'=>true, 'column_type'=>'hidden'],
            [ 'key'=> "title", 'title'=> translate('title'),  'fillable'=> true, 'column_type'=>'text', 'required'=>true ],
            [ 'key'=> "description", 'title'=> translate('Content'),  'fillable'=> true, 'column_type'=>'textarea','required'=>true ],
            [ 'key'=> "status", 'title'=> translate('status'),  'fillable'=>true, 'column_type'=>'checkbox' ],
            [ 'key'=> "picture", 'title'=> translate('picture'),  'fillable'=> true, 'column_type'=>'file' ],
        ];
	}

	

	/**
	 * Admin index items
	 * 
	 * @param Silex\Application $app
	 * @param \Twig\Environment $twig
	 * 
	 */ 
	public function index( ) 
	{
		
		try {
			
		    return render('data_table', [
		        'load_vue' => true,
		        'title' => translate('Events'),
		        'columns' => $this->columns(),
		        'fillable' => $this->fillable(),
		        'items' => $this->repo->get(),
		        'object_name' => 'Event',
		        'object_key' => 'event_id',
		    ]);
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			
		}
	}


	


	public function store() 
	{

		$params = $this->app->params();

        try {	

        	$params['created_by'] = $this->app->auth()->id;        	

            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (Exception $e) {
        	throw new Exception(json_encode(array('result'=>$e->getMessage(), 'error'=>1)), 1);
        }

		return $returnData;
	}

	/**
	 * Load latest notifications at mobile
	 * 
	 */
	public function loadEvents()
	{
		$this->app = new \config\APP;

		return $this->repo->get(10);
	}  

	

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


	public function delete() 
	{

		$params = $this->app->params();

        try {

        	$check = $this->repo->find($params['event_id']);


            if ($this->repo->delete($params['event_id']))
            {
                return json_encode(array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1));
            }
            

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}

	public function validate($params) 
	{

		if (empty($params['content']['ar']['title']))
		{
        	throw new \Exception(json_encode(array('result'=>translate('NAME_EMPTY'), 'error'=>1)), 1);
		}

	}


}