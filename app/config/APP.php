<?php

namespace config;

use Twig\Environment;
use \Shared\RouteHandler;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Medians\Settings\Infrastructure\SystemSettingsRepository;
use Medians\Currencies\Infrastructure\CurrencyRepository;

use Medians\Currencies\Application\CurrencyService;
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

	public $currency;


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
		$_SESSION['currency'] = $_SESSION['currency'] ?? (isset($output['currency']) ? $output['currency'] : null);
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
	 * Load currency
	 */ 
	public function currency()
	{	
		$this->currency = (new CurrencyRepository)->load($_SESSION['currency']);
		return $this->currency;
	}

	/**
	 * Load custom currency
	 */ 
	public function customCurrency($currency)
	{	
		return  (new CurrencyRepository)->load($currency);
	}

	/**
	 * Load currency
	 */ 
	public function currencies()
	{	
		$currencies = (new CurrencyRepository)->get();
		return $currencies;
	}
	
	/**
	 * Price based on currency
	 */ 
	public function currency_amount($amount, $requiredCurrency = null)
	{

		$settings = $this->SystemSetting();
		$activeCurrency =  $this->currency();
		if ($activeCurrency->code == $settings['currency'])
			return $amount;
		
		if ($activeCurrency->last_check == date('Y-m-d'))
			return number_format($amount * ($activeCurrency->ratio ?? 1), 2);

		
		$activeCurrency = (new CurrencyService)->getCurrency($activeCurrency->code);
		return $this->currency_amount($amount, $requiredCurrency);
	}
	
	/**
	 * Convert amount of currency
	 */ 
	public function currency_converter($amount, $requiredCurrency = null)
	{
		try {
			$settings = $this->SystemSetting();
			$activeCurrency = (object) (new CurrencyService)->getCurrency($requiredCurrency);

			if (!$activeCurrency)
				return 0;
			
			if ($activeCurrency->code == $settings['currency'])
				return $amount;
			
			if ($activeCurrency->last_check == date('Y-m-d'))
				return number_format($amount * ($activeCurrency->ratio ?? 1), 2);
	
			return ($amount && isset($activeCurrency->code)) ? $this->currency_converter($amount, $activeCurrency->code) : $amount;
			
		} catch (\Throwable $th) {
			return null;
		}
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

		return $session ?? $this->checkAPISession();
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
			
		return $this->checkMenuAccess($this->adminMenu(), $user);
	}

	
	/**
	 * Return Administrator menu
	 * List of side menu
	 */
	public function adminMenu()
	{
		$user = $this->auth();

		$data = array(
			
			array('permission'=> 'Dashboard.index', 'title'=>translate('Dashboard'), 'icon'=>'airplay', 'link'=>'dashboard', 'component'=>'dashboard'),
			
			array( 'title'=>translate('Products'),  'icon'=>'wind', 'link'=>'#Products', 'sub'=>
			[
				array('permission'=>'Products.index', 'title'=>translate('Products'),  'icon'=>'user', 'link'=>'admin/products', 'component'=>'products'),
				array('permission'=>'Categories.index', 'title'=>translate('Categories'),  'icon'=>'user', 'link'=>'admin/product_categories', 'component'=>'categories'),
				array('permission'=>'Brands.index', 'title'=>translate('Brands'),  'icon'=>'user', 'link'=>'admin/brands', 'component'=>'brands'),
			]
			),

	        array('permission'=>'Shipping.index', 'title'=>translate('Shipping'),  'icon'=>'truck', 'link'=>'admin/shipping', 'component'=>'shipping'),
	        
			array('permission'=>'Customers.index', 'title'=>translate('Customers'),  'icon'=>'users', 'link'=>'admin/customers', 'component'=>'customers'),

			
			array('title'=>translate('Orders'),  'icon'=>'shopping-bag', 'link'=>'#Orders', 'sub'=>
			[
				array('permission'=>'Orders.index', 'title'=>translate('Orders'),  'icon'=>'truck', 'link'=>'admin/orders', 'component'=>'data_table'),
				array('permission'=>'Orders.index', 'title'=>translate('Cancelled Orders'),  'icon'=>'truck', 'link'=>'admin/orders?status=cancelled', 'component'=>'data_table'),
			]
			),
			
			array('title'=>translate('Newsletters'),  'icon'=>'send', 'link'=>'#newsletters', 'sub'=>
			[
				array('permission'=>'Newsletters.index', 'title'=>translate('newsletters'),  'icon'=>'truck', 'link'=>'admin/newsletters', 'component'=>'data_tables'),
				array('permission'=>'Subscribers.index', 'title'=>translate('Subscribers'),  'icon'=>'truck', 'link'=>'admin/newsletter_subscribers', 'component'=>'data_tables'),
			]
			),

			array('title'=>translate('Finance'),  'icon'=>'credit-card', 'link'=>'#finance', 'sub'=>
			[
				array('permission'=> 'Transaction.index', 'title'=> translate('Transactions'), 'icon'=>'credit-card', 'link'=>'admin/transactions', 'component'=>'transactions'),
				array('permission'=> 'Invoice.index', 'title'=> translate('Invoices'), 'icon'=>'credit-card', 'link'=>'admin/invoices', 'component'=>'invoices'),
			]
			),
			array( 'title'=>translate('Management'),  'icon'=>'tool', 'link'=>'#management', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'Gallery.index', 'title'=>translate('Gallery'),  'icon'=>'tool', 'link'=>'admin/gallery', 'component'=>'gallery'),
				array('permission'=>'HelpMessage.index', 'title'=>translate('Help Messages'),  'icon'=>'help-circle', 'link'=>'admin/help_messages', 'component'=>'help_messages'),
				array('permission'=> 'Settings.index', 'title'=> translate('Business Settings'),  'icon'=>'tool', 'link'=>'admin/settings', 'component'=>'settings'),
			]
			),
			array('permission'=>'Dashboard.index', 'title'=> translate('Logout'),  'icon'=>'log-out', 'link'=>'logout'),
		);

		return $data;
	}
	
	/**
	 * Return Superadmin menu
	 * List of side menu
	 */
	public function superAdminMenu()
	{
		
		$data = array(
			
			array('permission'=> 'Dashboard.index', 'title'=>translate('Dashboard'), 'icon'=>'airplay', 'link'=>'dashboard', 'component'=>'master_dashboard'),
			
			array( 'title'=>translate('Products'),  'icon'=>'wind', 'link'=>'#Products', 'sub'=>
			[
				array('permission'=>'Products.index', 'title'=>translate('Products'),  'icon'=>'user', 'link'=>'admin/products', 'component'=>'products'),
				array('permission'=>'Categories.index', 'title'=>translate('Categories'),  'icon'=>'user', 'link'=>'admin/product_categories', 'component'=>'categories'),
				array('permission'=>'Brands.index', 'title'=>translate('Brands'),  'icon'=>'user', 'link'=>'admin/brands', 'component'=>'data_table'),
			]
			),

	        
			array('permission'=>'Customers.index', 'title'=>translate('Customers'),  'icon'=>'users', 'link'=>'admin/customers', 'component'=>'data_table'),
			
			array('title'=>translate('Orders'),  'icon'=>'shopping-bag', 'link'=>'#Orders', 'sub'=>
			[
				array('permission'=>'Orders.index', 'title'=>translate('Orders'),  'icon'=>'truck', 'link'=>'admin/orders', 'component'=>'orders'),
				array('permission'=>'Orders.index', 'title'=>translate('New Orders'),  'icon'=>'truck', 'link'=>'admin/orders?status=new', 'component'=>'orders'),
				array('permission'=>'Orders.index', 'title'=>translate('Completed Orders'),  'icon'=>'truck', 'link'=>'admin/orders?status=completed', 'component'=>'orders'),
				array('permission'=>'Orders.index', 'title'=>translate('Cancelled Orders'),  'icon'=>'truck', 'link'=>'admin/orders?status=cancelled', 'component'=>'orders'),
				array('permission'=> 'Invoice.index', 'title'=> translate('Invoices'), 'icon'=>'credit-card', 'link'=>'admin/invoices', 'component'=>'invoices'),
			]
			),
			
			array('title'=>translate('Newsletters'),  'icon'=>'send', 'link'=>'#newsletters', 'sub'=>
			[
				array('permission'=>'Newsletters.index', 'title'=>translate('newsletters'),  'icon'=>'truck', 'link'=>'admin/newsletters', 'component'=>'data_table'),
				array('permission'=>'Subscribers.index', 'title'=>translate('Subscribers'),  'icon'=>'truck', 'link'=>'admin/newsletter_subscribers', 'component'=>'data_table'),
			]
			),
			
			
			array('title'=>translate('Finance'),  'icon'=>'credit-card', 'link'=>'#finance', 'sub'=>
			[
				array('permission'=>'Payments.index', 'title'=>translate('Payments'),  'icon'=>'tool', 'link'=>'admin/payments', 'component'=>'payments'),
				array('permission'=> 'PaymentMethods.index', 'title'=> translate('Payment methods'), 'icon'=>'credit-card', 'link'=>'admin/payment_methods', 'component'=>'payment_methods'),
			]
			),
			
			array( 'title'=>translate('Users'),  'icon'=>'tool', 'link'=>'#users', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'User.index', 'title'=>translate('Users'),  'icon'=>'users', 'link'=>'admin/users', 'component'=>'users'),
				array('permission'=> 'Roles.index', 'title'=> translate('ROLES MANAEGMENT'),  'icon'=>'tool', 'link'=>'admin/roles', 'component'=>'roles'),
			]
			),
			array( 'title'=>translate('Frontend'),  'icon'=>'airplay', 'link'=>'#frontend', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'Pages.index', 'title'=>translate('Front Pages'),  'icon'=>'tool', 'link'=>'admin/pages', 'component'=>'pages'),
				array('permission'=>'SiteSettings.index', 'title'=>translate('Frontend settings'),  'icon'=>'tool', 'link'=>'admin/site_settings', 'component'=>'system_settings'),
				array('permission'=>'Menus.index', 'title'=>translate('Menus'),  'icon'=>'tool', 'link'=>'admin/menus', 'component'=>'menus'),
			]
			),
			array( 'title'=>translate('Management'),  'icon'=>'target', 'link'=>'#management', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'Reviews.index', 'title'=>translate('Reviews'),  'icon'=>'tool', 'link'=>'admin/reviews', 'component'=>'data_table'),
				array('permission'=>'Currencies.index', 'title'=>translate('Currencies'),  'icon'=>'tool', 'link'=>'admin/currencies', 'component'=>'data_table'),
				array('permission'=>'NotificationEvent.index', 'title'=>translate('notifications_events'),  'icon'=>'tool', 'link'=>'admin/notifications_events', 'component'=>'notifications_events'),
				array('permission'=>'EmailTemplate.index', 'title'=>translate('Email Templates'),  'icon'=>'tag', 'link'=>'admin/email_templates', 'component'=>'email_templates'),
				array('permission'=>'Event.index', 'title'=>translate('Events'),  'icon'=>'tag', 'link'=>'admin/events', 'component'=>'data_table'),
			]
			),
			array( 'title'=>translate('Support'),  'icon'=>'help-circle', 'link'=>'#support', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'HelpMessage.index', 'title'=>translate('Help Messages'),  'icon'=>'help-circle', 'link'=>'admin/help_messages', 'component'=>'help_messages'),
				array('permission'=>'ContactForm.index', 'title'=>translate('Forms messages'),  'icon'=>'tag', 'link'=>'admin/contact_forms', 'component'=>'contact_forms'),
			]
			),
			
			array( 'title'=>translate('Shipping'),  'icon'=>'map', 'link'=>'#locations', 'superadmin'=> true, 'sub'=>
			[
				array('permission'=>'Shipping.index', 'title'=>translate('Shipping methods'),  'icon'=>'truck', 'link'=>'admin/shipping', 'component'=>'data_table'),
				array('permission'=>'Country.index', 'title'=>translate('Countries'),  'icon'=>'tool', 'link'=>'admin/countries', 'component'=>'data_table'),
				array('permission'=>'State.index', 'title'=>translate('States'),  'icon'=>'tag', 'link'=>'admin/states', 'component'=>'data_table'),
				array('permission'=>'City.index', 'title'=>translate('Cities'),  'icon'=>'tag', 'link'=>'admin/cities', 'component'=>'data_table'),
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
				array('permission'=> 'SystemSettings.index', 'title'=> translate('Payment settings'),  'icon'=>'tool', 'link'=>'admin/payment_settings', 'component'=>'system_settings'),
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