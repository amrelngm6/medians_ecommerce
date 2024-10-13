<?php

namespace config;

use Twig\Environment;
use \Shared\RouteHandler;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Medians\Settings\Infrastructure\SystemSettingsRepository;

use \Medians\Auth\Application\AuthService;
use \Medians\Auth\Application\CustomerAuthService;
use \Medians\Auth\Application\GuestAuthService;


class APP 
{

	public $default_lang = 'english';

	public $lang_code = 'english';

	public $lang;

	public $auth;

	public $customer;

	public $hasBranches = false;

	public $CONF;

	public $currentPage;

	public $capsule;

	public $session;
	
	public $setting;


	function __construct()
	{

		// $this->setLang(); // Set the active language 

		$this->currentPage = $this->request()->getPathInfo(); // Filter the request URI to get the current page

		$this->CONF = (new \config\Configuration())->getCONFArray();  // Load configuration as Array

		$this->capsule = (new \config\Configuration())->checkDB(); // Check database connection

		$this->auth(); // Check active secttion

	}

	public function setLang()
	{
		if (!empty($this->request()->headers->get('lang')))
		{
			$_SESSION['site_lang'] = $this->request()->headers->get('lang');
		}

		if (isset($_SERVER['HTTP_REFERER']))
		{
			$arr = explode('/', $_SERVER['HTTP_REFERER']);

			if (in_array(end($arr), array_column($this->Languages()->toArray(), 'language_code') ))
			{
				$_SESSION['site_lang'] = end($arr);
				$_SESSION['lang'] = end($arr);
			}
		}
		
		$_SESSION['lang'] = isset($_SESSION['site_lang']) ? $_SESSION['site_lang'] : $this->lang_code;
		$this->lang = $_SESSION['lang']; // Check active language

		return $this;
	}

	/**
	 * Is dark
	 */
	public function is_dark()
	{
		$setting = $this->SystemSetting();
		$_COOKIE['is_dark'] = !empty($setting['is_dark']) ? true : null;
		return isset($_COOKIE['is_dark']) ? true : false;
	}

	/**
	 * Load all setting for a Business 
	 * return as Array
	 */ 
	public function BusinessSettings()
	{
		return  (new \Medians\Settings\Application\SettingsController())->getAll();
	}

	/**
	 * Load Sysetem Settings
	 */ 
	public function SystemSetting()
	{
		$output = (new \Medians\Settings\Application\SystemSettingsController())->getAll();
		return $output;
	}

	/**
	 * Load languages
	 */ 
	public function Languages()
	{
		$output = (new \Medians\Languages\Application\LanguageController())->getAll();
		return $output;
	}

	/**
	 * Load Playlists
	 */ 
	public function playlists()
	{
		$this->customer = $this->customer_auth();
		$output = (new \Medians\Playlists\Infrastructure\PlaylistRepository())->getByCustomer($this->customer->customer_id ?? 0);
		return $output;
	}

	

	/**
	 * Get setting value by code 
	 * return value
	 */ 
	public function setting($code)
	{
		return (new SettingsRepository)->getByCode($code);
	}

	public function auth()
	{
		$request = Request::createFromGlobals();
		
		$this->session = !empty($this->session) ? $this->session : (new AuthService())->checkSession();

		return $this->session ? $this->session : $this->checkAPISession();
	}

	public function customer_auth()
	{
		$request = Request::createFromGlobals();
		
		$session = (new CustomerAuthService())->checkSession();

		$this->customer = $session ?? $this->checkAPISession();
		
		return  $this->customer;
	}

	public function customer_id()
	{
		return (new CustomerAuthService())->checkSessionId();
	}

	public function google_login_link()
	{
		return (new CustomerAuthService())->loginWithGoogle();
	}

	/**
	 * Get session for the Guests
	 */
	public function guest_auth()
	{
		return (new GuestAuthService())->guestSession();
	}

	/**
	 * Check if the request is through mobile
	 */
	public function checkAPISession()
	{
		if (!empty($this->request()->headers->get('token')))
		{
			return  (new AuthService())->checkAPISession($this->request()->headers->get('token'), $this->request()->headers->get('userType'));
		}
	}  

	/**
	 * Check if the request is through mobile
	 */
	public function checkAPICustomerSession()
	{
		if (!empty($this->request()->headers->get('token')))
		{
			return  (new CustomerAuthService())->checkAPISession($this->request()->headers->get('token'), $this->request()->headers->get('userType'));
		}
	}  


	public static function request()
	{
		return Request::createFromGlobals();
	}

	/**
	 * Load all request [params] parameter
	 * Used in most of the request
 	 */
	public function params()
	{
		$params = $this->request()->get('params');
		if (!$params)
			return;

		return sanitizeInput(is_array($params) ? $params : json_decode($params));
	}

	public static function redirect($url)
	{
		echo "<img width='100%' src='/uploads/img/redirect.gif' /><style>*{margin:0;color:#fff; overflow:hidden}</style>";
		echo new RedirectResponse($url);
		exit();
	}

	public function  run()
	{
		RouteHandler::dispatch();

		return true;
	}


	/**
	 * Template for Twig render 
	 */
	public function template()
	{
		$twig = new \Twig\Environment(new \Twig\Loader\FilesystemLoader('./app'), 
		    [
		        //'cache' => '/app/cache',
		        'debug' => true,
		    ]
		);

		$twig->addFilter(new \Twig\TwigFilter('html_entity_decode', 'html_entity_decode'));

		return $twig;
	}

	/**
	 * Template for Twig render 
	 */
	public function renderTemplate($code)
	{
		$twig = $this->template()->createTemplate($code);

		return $twig;
	}

	

	/**
	* Return Administrator menu
	* List of side menu
	*/
	public function front_menu($type = 'header')
	{
		$menuRepo = new \Medians\Menus\Infrastructure\MenuRepository;
        return $menuRepo->getMenuPages($type);
	}

	/**
	* Return Administrator menu
	* List of side menu
	*/
	public function menu()
	{
		$user = $this->auth();

		if (empty($user))
			return null;

		if ($user->role_id == 1)
			return $this->superAdminMenu();
			
		return $this->checkMenuAccess($this->superAdminMenu(), $user);
	}

	
	/**
	 * Return Superadmin menu
	 * List of side menu
	 */
	public function superAdminMenu()
	{
		
		$data = array(
			
			array('permission'=> 'Dashboard.index', 'title'=>translate('Dashboard'), 'icon'=>'airplay', 'link'=>'dashboard', 'component'=>'master_dashboard'),
			

			array('permission'=>'Customers.index', 'title'=>translate('Artists'),  'icon'=>'users', 'link'=>'admin/customers', 'component'=>'data_table'),
			
			
			
			array('title'=>translate('Media'),  'icon'=>'music', 'link'=>'#media', 'sub'=>
			[
				array('permission'=>'Audio.index', 'title'=>translate('Music'),  'icon'=>'truck', 'link'=>'admin/audio', 'component'=>'media'),
				array('permission'=>'Audiobooks.index', 'title'=>translate('Audiobooks'),  'icon'=>'tag', 'link'=>'admin/audiobooks', 'component'=>'media'),
				array('permission'=>'Videos.index', 'title'=>translate('Videos'),  'icon'=>'truck', 'link'=>'admin/videos', 'component'=>'media'),
				array('permission'=>'Sorts.index', 'title'=>translate('Short Videos'),  'icon'=>'tag', 'link'=>'admin/shorts', 'component'=>'media'),
			]
			),
			
			
			array('title'=>translate('Streaming'),  'icon'=>'headphones', 'link'=>'#streaming', 'sub'=>
			[
				array('permission'=>'Stations.index', 'title'=>translate('Stations'),  'icon'=>'truck', 'link'=>'admin/stations', 'component'=>'data_table'),
				array('permission'=>'Channels.index', 'title'=>translate('Channels'),  'icon'=>'tag', 'link'=>'admin/channels', 'component'=>'data_table'),
			]
			),
			
			array('permission'=>'Blog.index', 'title'=>translate('Blog'),  'icon'=>'edit-3', 'link'=>'admin/blog', 'component'=>'blog'),
			
			array('title'=>translate('Categories'),  'icon'=>'list', 'link'=>'#genres', 'sub'=>
			[
				array('permission'=>'MediaGenres.index', 'title'=>translate('Genres'),  'icon'=>'truck', 'link'=>'admin/genres', 'component'=>'categories'),
				array('permission'=>'BookGenres.index', 'title'=>translate('Book Genres'),  'icon'=>'truck', 'link'=>'admin/book_genres', 'component'=>'categories'),
				array('permission'=>'VideoGenres.index', 'title'=>translate('Video Genres'),  'icon'=>'truck', 'link'=>'admin/video_genres', 'component'=>'categories'),
			]
			),
			
			array('title'=>translate('Marketing'),  'icon'=>'send', 'link'=>'#newsletters', 'sub'=>
			[
				array('permission'=>'Newsletters.index', 'title'=>translate('newsletters'),  'icon'=>'truck', 'link'=>'admin/newsletters', 'component'=>'data_table'),
				array('permission'=>'Subscribers.index', 'title'=>translate('Subscribers'),  'icon'=>'truck', 'link'=>'admin/newsletter_subscribers', 'component'=>'data_table'),
				array('permission'=>'EmailTemplate.index', 'title'=>translate('Email Templates'),  'icon'=>'tag', 'link'=>'admin/email_templates', 'component'=>'email_templates'),
			]
			),
			
			array( 'title'=>translate('Frontend'),  'icon'=>'airplay', 'link'=>'#frontend', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'Pages.index', 'title'=>translate('Front Pages'),  'icon'=>'tool', 'link'=>'admin/pages', 'component'=>'pages'),
				array('permission'=>'SiteSettings.index', 'title'=>translate('Frontend settings'),  'icon'=>'tool', 'link'=>'admin/site_settings', 'component'=>'system_settings'),
				array('permission'=>'Menus.index', 'title'=>translate('Menus'),  'icon'=>'tool', 'link'=>'admin/menus', 'component'=>'menus'),
				array('permission'=>'Gallery.index', 'title'=>translate('Gallery'),  'icon'=>'tool', 'link'=>'admin/gallery', 'component'=>'gallery'),
			]
			),
			// array( 'title'=>translate('Plugins'),  'icon'=>'gift', 'link'=>'#plugins', 'superadmin'=> true, 'sub'=>
			// [
			// 	array('permission'=>'Plugins.index', 'title'=>translate('Plugins'),  'icon'=>'tool', 'link'=>'admin/plugins', 'component'=>'plugins'),
			// 	array('permission'=>'Hooks.index', 'title'=>translate('Hooks'),  'icon'=>'tool', 'link'=>'admin/hooks', 'component'=>'hooks'),
			// ]
			// ),
			
			array( 'title'=>translate('Management'),  'icon'=>'target', 'link'=>'#management', 'superadmin'=> true, 'sub'=>
			[

				array('permission'=>'Reviews.index', 'title'=>translate('Reviews'),  'icon'=>'tool', 'link'=>'admin/reviews', 'component'=>'data_table'),
				array('permission'=>'NotificationEvent.index', 'title'=>translate('notifications_events'),  'icon'=>'bell', 'link'=>'admin/notifications_events', 'component'=>'notifications_events'),
			]
			),
			
			
			array( 'title'=>translate('Users'),  'icon'=>'tool', 'link'=>'#users', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'User.index', 'title'=>translate('Users'),  'icon'=>'users', 'link'=>'admin/users', 'component'=>'users'),
				array('permission'=> 'Roles.index', 'title'=> translate('ROLES MANAEGMENT'),  'icon'=>'tool', 'link'=>'admin/roles', 'component'=>'roles'),
			]
			),
			
			array( 'title'=>translate('Support'),  'icon'=>'help-circle', 'link'=>'#support', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'HelpMessage.index', 'title'=>translate('Help Messages'),  'icon'=>'help-circle', 'link'=>'admin/help_messages', 'component'=>'help_messages'),
				array('permission'=>'ContactForm.index', 'title'=>translate('Forms messages'),  'icon'=>'tag', 'link'=>'admin/contact_forms', 'component'=>'contact_forms'),
			]
			),
			
			array( 'title'=>translate('localization'),  'icon'=>'mic', 'link'=>'#localization', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'Language.index', 'title'=>translate('Languages'),  'icon'=>'tag', 'link'=>'admin/languages', 'component'=>'data_table'),
				array('permission'=>'Translation.index', 'title'=>translate('Translations'),  'icon'=>'tag', 'link'=>'admin/translations', 'component'=>'translations'),
			]
			),
			
			array( 'title'=>translate('Settings'),  'icon'=>'tool', 'link'=>'#setting', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=> 'SystemSettings.index', 'title'=> translate('System Settings'),  'icon'=>'tool', 'link'=>'admin/system_settings', 'component'=>'system_settings'),
				array('permission'=> 'StorageSettings.index', 'title'=> translate('Storage settings'),  'icon'=>'tool', 'link'=>'admin/storage_settings', 'component'=>'system_settings'),
			]
			),
			
			array('permission'=>'Logout', 'title'=> translate('Logout'),  'icon'=>'log-out', 'link'=>'logout'),
		);

		return $data;
	}

	/**
	 * Check permission of the menu link
	 * @param String $permission
	 * @param Instance User $user
	 */
	public function checkMenuAccess($menu, $user)
	{
	
		$newMenu = [];
		if ($user->role_id > 1 )
		{
			foreach ($menu as $key => $item)
			{
				if (isset($item['sub'])) 
				{
					foreach ($item['sub'] as $k => $sub)
					{
						$newMenu[$key]['sub'][] = isset($user->permissions[$sub['permission']]) ? $sub : null;
					}
					$newMenu[$key]['sub'] = array_values(array_filter($newMenu[$key]['sub']));
					if (isset($newMenu[$key]['sub']))
					{
						$newMenu[$key]['title'] = $item['title'];
						$newMenu[$key]['icon'] = $item['icon'];
						$newMenu[$key]['link'] = $item['link'];
					}

				} elseif ($item) {
					$newMenu[$key] = isset($user->permissions[$item['permission']]) ? $item : null;
				}

				if (empty($newMenu[$key]['sub']) && empty($newMenu[$key]['permission']) )
					$newMenu[$key] = null;
			}

			return array_values(array_filter($newMenu));
		}
		return $menu;
	}


	
	
	/**
	 * Check permission of the menu link
	 * @param String $permission
	 * @param Instance User $user
	 */
	public function checkMenuPermissionsAccess($menu, $user)
	{
		if ($user->role_id == 3 )
		{
			return $menu;
		}

		$newMenu = [];
		if ($user->role_id > 3 )
		{
			foreach ($menu as $key => $item)
			{
				if (isset($item['sub'])) 
				{

					foreach ($item['sub'] as $k => $sub)
					{
						$newMenu[$key]['sub'][] = isset($user->permissions[$sub['permission']]) ? $sub : null;
					}
					$newMenu[$key]['sub'] = array_values(array_filter($newMenu[$key]['sub']));
					if (isset($newMenu[$key]['sub']))
					{
						$newMenu[$key]['title'] = $item['title'];
						$newMenu[$key]['icon'] = $item['icon'];
						$newMenu[$key]['link'] = $item['link'];
					}

				} else {
					$newMenu[$key] = isset($user->permissions[$item['permission']]) ? $item : null;
				}

				if (empty($newMenu[$key]['sub']) && empty($newMenu[$key]['permission']) )
					$newMenu[$key] = null;
			}

			return array_values(array_filter($newMenu));
		}
	}

}