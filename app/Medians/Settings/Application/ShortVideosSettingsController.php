<?php

namespace Medians\Settings\Application;
use \Shared\dbaser\CustomController;

use Medians\Settings\Infrastructure\SystemSettingsRepository;

class ShortVideosSettingsController extends CustomController
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
				[ 'key'=> "enable_short_videos", 'title'=> translate('Allow short videos feature'), 'help_text'=>translate('You can allow / disallow with Short short videos at Frontend'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "shortvideo_max_duration", 'title'=> translate('Short Video max duration'), 'help_text'=>translate('Max duration to generate Short Videos'), 'fillable'=> true, 'column_type'=>'number' ],
                
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
			'title' => translate('Video Settings'),
	    ]);
	} 

}
