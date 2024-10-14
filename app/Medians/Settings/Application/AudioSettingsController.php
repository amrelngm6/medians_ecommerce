<?php

namespace Medians\Settings\Application;
use \Shared\dbaser\CustomController;

use Medians\Settings\Infrastructure\SystemSettingsRepository;

class AudioSettingsController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;


	function __construct()
	{
		
		$this->app = new \config\APP;

		$this->repo = new SystemSettingsRepository();
	}

	
	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
			'basic'=> [	
				[ 'key'=> "enable_audio", 'title'=> translate('Allow audio feature'), 'help_text'=>translate('You can allow / disallow with Audio at Frontend'), 'fillable'=> true, 'column_type'=>'checkbox' ],
                
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
			'setting' => (new SystemSettingsController())->getAll(),
			'fillable' => $this->fillable(),
			'title' => translate('Audio Settings'),
	    ]);
	} 

}
