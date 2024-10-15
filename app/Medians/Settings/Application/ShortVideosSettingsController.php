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
				[ 'key'=> "shortvideo_default_duration", 'title'=> translate('Short Video default duration'), 'help_text'=>translate('Default duration to generate Short Videos in seconds 1 min : 60'), 'fillable'=> true, 'column_type'=>'number' ],
				[ 'key'=> "shortvideo_max_duration", 'title'=> translate('Short Video max duration'), 'help_text'=>translate('Max duration to generate Short Videos in seconds 5 min : 300'), 'fillable'=> true, 'column_type'=>'number' ],
                
			],		
			'audoplay'=> [	
				[ 'key'=> "autoplay_shorts", 'title'=> translate('Autoplay for Shorts'), 'help_text'=>translate('Auto play videos at shorts list page'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "autoplay_short_page", 'title'=> translate('Autoplay at single page'), 'help_text'=>translate('Auto play videos at short video page'), 'fillable'=> true, 'column_type'=>'checkbox' ],
                
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
