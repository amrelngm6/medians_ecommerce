<?php

namespace Medians\Settings\Application;
use \Shared\dbaser\CustomController;

use Medians\Settings\Infrastructure\SettingsRepository;

class SettingsController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;

	protected $updated;



	function __construct()
	{
		
		$this->app = new \config\APP;	

		$user = $this->app->auth();

		$this->repo = new SettingsRepository();
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
	 * Index settings page
	 * 
	 */
	public function index()
	{
		$user = $this->app->auth();

		return render('settings', [
			'load_vue' => true,
			'fillable' => $this->fillable(),
			'title' => translate('Settings'),
	    ]);
	} 



	public function getItem($code = null) 
	{	
		return $this->repo->getByCode($code);
	}


	public function getAll() 
	{	
		$data = $this->repo->getAll();
		return $data ? array_column(json_decode($data), 'value', 'code') :  [];
	}


	/**
	* Return the Settings
	*/
	public function update() 
	{

		$params = $this->app->params();
		
		try {

            if (isset($this->updateSettings($params)->updated)) 
            	return array('success'=>1, 'result'=>translate('Updated'));

        } catch (Exception $e) {
            return  array('error'=>$e->getMessage());
        }
	}



	/**
	* Return the Settings
	*/
	public function updateSettings($params) 
	{

		foreach ($params as $code => $value)
		{

			$this->deleteItem($code);
			$this->saveItem($code, $value);
		}

		$this->updated = true;
		
		return $this;
	}



	public function saveItemArray($code, $value) 
	{
		$this->deleteItem($code);

		foreach ($value as $k => $v) 
		{
			$this->repo->store($this->setObject($code, $v));
		}
	}

	public function saveItem($code, $value) 
	{
		
		if (is_array($value))
			return $this->saveItemArray($code, $value);
		
		return $this->repo->store($this->setObject($code, $value));

	}

	public function setObject($code, $value)
	{
		
		$user = $this->app->auth();

		return [
			'created_by' => $user->id,
			'model' => '',
			'code' => $code,
			'value' => $value
		];
		
	}

	public function deleteItem($code) 
	{

		return $this->repo->delete($code);
	}


}
