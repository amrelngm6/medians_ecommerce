<?php

namespace Medians\Settings\Application;
use \Shared\dbaser\CustomController;

use Medians\Settings\Infrastructure\SystemSettingsRepository;

class ChannelsSettingsController extends CustomController
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
				[ 'key'=> "enable_channels", 'title'=> translate('Allow channels feature'), 'help_text'=>translate('You can allow / disallow channels at Frontend'), 'fillable'=> true, 'column_type'=>'checkbox' ],
                
			],		
			'streaming'=> [	
				[ 'key'=> "channel_direct_streaming", 'title'=> translate('Streaming Channels directly'), 'help_text'=>translate('Allow customers to stream Channels files through direct links. ( Recommended disable to prevent download media files anonymously )'), 'fillable'=> true, 'column_type'=>'checkbox' ],
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
			'title' => translate('Channels Settings'),
	    ]);
	} 

}
