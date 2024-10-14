<?php

namespace Medians\Settings\Application;
use \Shared\dbaser\CustomController;

use Medians\Settings\Infrastructure\SystemSettingsRepository;

class VideosSettingsController extends CustomController
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
				[ 'key'=> "enable_videos", 'title'=> translate('Allow videos feature'), 'help_text'=>translate('You can allow / disallow with Videos at Frontend'), 'fillable'=> true, 'column_type'=>'text' ],
                
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
			'title' => translate('Storage Settings'),
	    ]);
	} 

}
