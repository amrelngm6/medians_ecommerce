<?php

namespace Medians\Settings\Application;
use \Shared\dbaser\CustomController;

use Medians\Settings\Infrastructure\SystemSettingsRepository;
use Medians\Templates\Infrastructure\WebTemplateRepository;


class StorageSettingsController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;

	protected $templateRepo;


	function __construct()
	{
		
		$this->app = new \config\APP;

		$this->repo = new SystemSettingsRepository();

		$this->templateRepo = new WebTemplateRepository();
	}

	
	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            
			'basic'=> [	
				[ 'key'=> "default_storage", 'title'=> translate('Default Storage'), 'help_text'=> translate('The default storage location for media files'),
                    'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'title', 'column_key' => 'default_storage',
                    'data' => [['default_storage'=>'google','title'=>translate('Google Storage')], ['default_storage'=>'local','title'=>translate('Local Server')]]  
                ],	
			],		
					
        ];
	}

	/**
	 * Index settings page
	 * 
	 */
	public function index()
	{
		return render('system_settings', [
			'load_vue' => true,
			'setting' => $this->getAll(),
			'fillable' => $this->fillable(),
			'title' => translate('Storage Settings'),
	    ]);
	} 



	public function getItem($code = null) 
	{	
		return $this->repo->getByCode($code);
	}


	public function loadFonts() 
	{	

		return [
			['title'=>'Tajawal'],
			['title'=>'Cairo'],
			['title'=>'Roboto'],
		];
	}


	public function getAll() 
	{	

		return (new SystemSettingsController())->getAll();
	}


	/**
	* Return the Settings
	*/
	public function update() 
	{
		return (new SystemSettingsController())->update();
	}



	/**
	* Return the Settings
	*/
	public function updateSettings($params) 
	{
		return (new SystemSettingsController())->updateSettings($params);
	}




	public function saveItem($code, $value) 
	{
		return (new SystemSettingsController())->saveItem($code, $value);
	}


	public function saveItemArray($code, $value) 
	{
		return (new SystemSettingsController())->saveItemArray($code, $value);
	}


	public function deleteItem($code) 
	{
		return (new SystemSettingsController())->deleteItem($code);
	}


}
