<?php

namespace Medians\Stations\Application;

use Medians\Stations\Infrastructure\StationRepository;

use Shared\dbaser\CustomController;
use getID3;

class StationMediaController extends CustomController
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
			
			$filePath = $_SERVER['DOCUMENT_ROOT']. $params['media_path'];
			$getID3 = new getID3;
			if (substr($params['media_path'], 0, 4) == 'http' ) {
				
				$tempFilePath = tempnam(sys_get_temp_dir(), 'audio');
				file_put_contents($tempFilePath, fopen($params['media_path'], 'r'));
				$filePath = $tempFilePath;
			}
			$fileInfo = $getID3->analyze($filePath);

            if (isset($fileInfo['playtime_seconds'])) {
                $params['duration'] = round($fileInfo['playtime_seconds'], 0);
			}

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

            if ($this->repo->deleteItem($params['station_media_id']))
            {
                return array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1);
            }
            

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}

    /**
     * Station page for frontend
     */
    public function media_popup()
    {
		$this->app = new \config\APP;
		
		$settings = $this->app->SystemSetting();

        $params = $this->app->params();

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/popups/edit-station-track.html.twig', [
				'item' => $this->repo->findItem($params['station_media_id'])
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }

	
}
