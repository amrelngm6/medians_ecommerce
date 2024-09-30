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
			'pictures'=> [	
				[ 'key'=> "logo", 'title'=> translate('logo'), 'fillable'=>true, 'column_type'=>'file' ],
	            [ 'key'=> "dark_logo", 'title'=> translate('Dark logo'), 'fillable'=>true, 'column_type'=>'file' ],
				[ 'key'=> "menu_picture", 'title'=> translate('Menu picture'), 'help_text'=> translate('The image for the menu popup side background'), 'fillable'=> true, 'required'=> true, 'column_type'=>'picture' ],
			],			
			'cookies'=> [	
				[ 'key'=> "show_cookie_box", 'title'=> translate('Show Cookies Box'), 'help_text'=>translate('Show cookies box at the bottom of the page'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "cookie_text", 'title'=> translate('Cookies text'), 'help_text'=> translate('Text of the cookies box'), 'fillable'=> true, 'required'=> true, 'column_type'=>'text' ],
				[ 'key'=> "cookie_button", 'title'=> translate('Cookies button'), 'help_text'=> translate('Button Text of the cookies box'), 'fillable'=> true, 'required'=> true, 'column_type'=>'text' ],

			],
			'fonts'=> [	
				
				[ 'key'=> "head_font", 'title'=> translate('Headers font'),  'help_text' => translate('Choose the font style for Headlines elements'),
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'title' ,'column_key'=>'title', 
					'data' => $this->loadFonts()  
				],
				[ 'key'=> "text_font", 'title'=> translate('Headers font'),  'help_text' => translate('Choose the font style for Headlines elements'),
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'title' ,'column_key'=>'title', 
					'data' => $this->loadFonts()  
				],
			],
			'site_info'=> [	
				[ 'key'=> "footer_email", 'title'=> translate('Email'), 'help_text'=>translate('This email used for view at your frontend footer'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "footer_address", 'title'=> translate('Footer address'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "footer_phone", 'title'=> translate('Footer phone'), 'fillable'=> true, 'column_type'=>'phone' ],
			],
			
			'social_media'=> [	
				[ 'key'=> "facebook_link", 'title'=> translate('Facebook link'), 'help_text'=>translate('This links used for view at your frontend footer'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "twitter_link", 'title'=> translate('Twitter link'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "youtube_link", 'title'=> translate('YouTube link'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "instagram_link", 'title'=> translate('Instagram link'), 'fillable'=> true, 'column_type'=>'text' ],
			],
			
			'options'=> [	
				[ 'key'=> "allow_guest_checkout", 'title'=> translate('Allow Guest Checkout'), 'help_text'=>translate('Allow guests to complete checkout without signup'), 'fillable'=> true, 'column_type'=>'checkbox' ],
			],
			
			'streaming'=> [	
				[ 'key'=> "station_media_chunk", 'title'=> translate('Station Streaming Chunk limit'), 'help_text'=>translate('Limit in seconds to chunk the audio files for streaming at the Player'), 'fillable'=> true, 'column_type'=>'number' ],
				[ 'key'=> "station_interval", 'title'=> translate('Station Streaming Interval'), 'help_text'=>translate('Time in seconds to Check for the active audio files for stations streaming, This option recommeded to be accurated with streaming media duration average'), 'fillable'=> true, 'column_type'=>'number' ],
			],
			
			'layout_options'=> [	
				[ 'key'=> "show_newsletter_form", 'title'=> translate('Show newsletter at footer'), 'help_text'=>translate('Show newsletter form at footer to allow users to subscribe'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "view_items_limit", 'title'=> translate('Category page products limit'), 'help_text'=>translate('Show x products at category page as first load and each page'), 'fillable'=> true, 'column_type'=>'number' ],
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
			'title' => translate('Frontend Settings'),
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
