<?php

namespace Medians;

use \Shared\dbaser\CustomController;

use Medians\Users\Infrastructure\UserRepository;

use Medians\Devices\Infrastructure\OrderDevicesRepository;

use Medians\Devices\Infrastructure\DevicesRepository;

use Medians\Products\Infrastructure\ProductsRepository;

use Medians\Bugs\Infrastructure\BugReportRepository;

use Medians\Blog\Infrastructure\BlogRepository;


class APIController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;
	protected $app;

	protected $BugReportRepo;



	function __construct()
	{
	
	}


	/**
	 * Model object 
	 * 
	 */
	public function handle($path)
	{

		$this->app = new \config\APP;
		$request = $this->app->request();
		$return = [];
		switch ($path) 
		{
			case 'load_config':
				$return = loadConfig($request->get('component'), []);
				break;
		}

		echo json_encode($return);
	} 

	
	/**
	 * Create model 
	 * 
	 */
	public function create()
	{
		
		$app = new \config\APP;
		$request = $app->request();
		
		try {
				
			$return = [];
			switch ($request->get('type')) 
			{

				case 'Payment.paypal_payment_confirmation':
					$return = (new Payments\Application\PaymentController())->confirmPayPalPlanPayment();
					break;

				case 'User.create':
					$return = (new Users\Application\UserController())->store();
					break;

				case 'User.get_started_save_business':
					$return = (new Users\Application\GetStartedController())->saveBusiness();
					break;

				case 'User.get_started_save_plan':
					$return = (new Users\Application\GetStartedController())->saveSelectedPlan();
					break;

				case 'User.get_started_save_free_plan':
					$return = (new Users\Application\GetStartedController())->saveFreePlan();
					break;
					
				case 'HelpMessage.create':
					return response((new Help\Application\HelpMessageController())->store());
					break;
		
				case 'Event.create':
					$return = (new Events\Application\EventController())->store();
					break;

	            case 'NotificationEvent.create':
	                $return =  (new Notifications\Application\NotificationEventController())->store(); 
	                break;

	            case 'Role.create':
	                $return =  (new Roles\Application\RoleController())->store(); 
	                break;
				
				case 'HelpMessageComment.create':
					$return =  (new Help\Application\HelpMessageController())->storeComment(); 
					break;
				
				case 'Page.create':
					$return =  (new Pages\Application\PageController())->store(); 
					break;

				case 'City.create':
					$return = (new Locations\Application\CityController)->store();
					break;
	
				case 'Country.create':
					$return = (new Locations\Application\CountryController)->store();
					break;
		
				case 'State.create':
					$return = (new Locations\Application\StateController)->store();
					break;

				case 'Translation.create':
					$return = (new Languages\Application\TranslationController)->store();
					break;
		
					
		
				case 'PaymentMethod.create':
					$return = (new PaymentMethods\Application\PaymentMethodController)->store();
					break;
		
				case 'Product.create':
					$return = (new Products\Application\ProductController)->store();
					break;
		
				case 'ProductCategory.create':
					$return = (new Products\Application\CategoryController)->store();
					break;
					
				case 'Brand.create':
					$return = (new Brands\Application\BrandController)->store();
					break;
					
				case 'Shipping.create':
					$return = (new Shipping\Application\ShippingController)->store();
					break;
					
				case 'Newsletter.create':
					$return = (new Newsletters\Application\NewsletterController)->store();
					break;
					
				case 'Subscriber.create':
					$return = (new Newsletters\Application\SubscriberController)->store();
					break;
					
				case 'Customer.create':
					$return = (new Customers\Application\CustomerController)->store();
					break;
					
				case 'WebTemplate.create':
					$return = (new Templates\Application\WebTemplateController)->store();
					break;
					
		
			}

			return response(json_encode($return));

		} catch (Exception $e) {
			return $e->getMessage();
		}
	} 

	/**
	 * Update model 
	 * 
	 */
	public function update()
	{
		$app = new \config\APP;
		$request = $app->request();

		switch ($request->get('type')) 
		{
			case 'SystemSettings.update':
                $controller =  new Settings\Application\SystemSettingsController; 
				break;

			case 'AppSettings.update':
                $controller =  new Settings\Application\AppSettingsController; 
				break;

				
			case 'HelpMessage.update':
				$controller =  new Help\Application\HelpMessageController;
				break;
	
				
            case 'Settings.update':
                $controller = new Settings\Application\SettingsController; 
                break;

            case 'User.update':
                $controller = new Users\Application\UserController; 
                break;

            case 'NotificationEvent.update':
                $controller =  new Notifications\Application\NotificationEventController; 
                break;

            case 'Event.update':
				$controller = new Events\Application\EventController;
                break;

			case 'Role.update':
				$controller =  new Roles\Application\RoleController; 
				break;			

			case 'Page.update':
				$controller =  new Pages\Application\PageController; 
				break;
			
			case 'Role.updatePermissions':
				return (new Roles\Application\RoleController)->updatePermissions(); 
				break;
		
			case 'User.updateStatus':
				return (new Users\Application\UserController())->updateStatus();
				break;
	

			case 'City.update':
				$controller = new Locations\Application\CityController;
				break;

			case 'Country.update':
				$controller = new Locations\Application\CountryController;
				break;

			case 'State.update':
				$controller = new Locations\Application\StateController;
				break;

			case 'PaymentMethod.update':
				$controller = new PaymentMethods\Application\PaymentMethodController;
				break;
			
			case 'Product.update':
				$controller = new Products\Application\ProductController;
				break;
			
			case 'ProductCategory.update':
				$controller = new Products\Application\CategoryController;
				break;
			
			case 'Brand.update':
				$controller = new Brands\Application\BrandController;
				break;
			
			case 'Shipping.update':
				$controller = new Shipping\Application\ShippingController;
				break;
			
			case 'Newsletter.update':
				$controller = new Newsletters\Application\NewsletterController;
				break;
			
			case 'Subscriber.update':
				$controller = new Newsletters\Application\SubscriberController;
				break;
			
			case 'Customer.update':
				$controller = new Customers\Application\CustomerController;
				break;
			
			case 'Currency.update':
				$controller = new Currencies\Application\CurrencyService;
				break;
				
			case 'Language.update':
				$controller = new Languages\Application\LanguageController;
				break;
				
			case 'Translation.update':
				$controller = new Languages\Application\TranslationController; 
				break;
			
			case 'Gallery.update':
				$controller = new Gallery\Application\GalleryController; 
				break;
			
			case 'Menu.update':
				$controller = new Menus\Application\MenuController; 
				break;
	
			case 'EmailTemplate.update':
				$controller = new Templates\Application\EmailTemplateController; 
				break;

			case 'WebTemplate.update':
				$controller = new Templates\Application\WebTemplateController; 
				break;

			case 'Review.update':
				$controller = new Reviews\Application\ReviewController; 
				break;

			case 'Country.update':
				$controller = new Countries\Application\CountryController; 
				break;
			

			case 'State.update':
				$controller = new Countries\Application\StateController; 
				break;
			
			case 'City.update':
				$controller = new Countries\Application\CityController; 
				break;

			case 'Order.update':
				$controller = new Orders\Application\OrderController; 
				break;
			
		}

		return response(isset($controller) ? json_encode($controller->update()) : []);
	} 

	

	/**
	 * delete model 
	 * 
	 */
	public function delete()
	{

		$app = new \config\APP;
		$request = $app->request();

		try {
			
			$return = [];
			switch ($request->get('type')) 
			{

				case 'User.delete':
					return response((new Users\Application\UserController())->delete());
					break;

				case 'HelpMessage.delete':
					return response((new Help\Application\HelpMessageController())->delete());
					break;

				case 'Role.delete':
					return response((new Roles\Application\RoleController())->delete());
					break;

				case 'NotificationEvent.delete':
					return response((new Notifications\Application\NotificationEventController())->delete());
					break;
			
				case 'Event.delete':
					return response((new Events\Application\EventController())->delete());
					break;
			
				case 'Page.delete':
					return response((new Pages\Application\PageController())->delete());
					break;
		
				case 'City.delete':
					return response((new Locations\Application\CityController())->delete());
					break;

				case 'Country.delete':
					return response((new Locations\Application\CountryController())->delete());
					break;

				case 'State.delete':
					return response((new Locations\Application\StateController())->delete());
					break;
			
				case 'PaymentMethod.delete':
					return response((new PaymentMethods\Application\PaymentMethodController())->delete());
					break;
			
				case 'Brand.delete':
					return response((new Brands\Application\BrandController())->delete());
					break;
			
				case 'Shipping.delete':
					return response((new Shipping\Application\ShippingController())->delete());
					break;
			
				case 'Newsletter.delete':
					return response((new Newsletters\Application\NewsletterController())->delete());
					break;
			
				case 'Subscriber.delete':
					return response((new Newsletters\Application\SubscriberController())->delete());
					break;
			
				case 'Customer.delete':
					return response((new Customers\Application\CustomerController())->delete());
					break;
			
				case 'Product.delete':
					return response((new Products\Application\ProductController())->delete());
					break;
			
				case 'WebTemplate.delete':
					return response((new Templates\Application\WebTemplateController())->delete());
					break;
			
				case 'Country.delete':
					return response((new Countries\Application\CountryController())->delete());
					break;
			
				case 'State.delete':
					return response((new Countries\Application\StateController())->delete());
					break;
			
				case 'City.delete':
					return response((new Countries\Application\CityController())->delete());
					break;
			
			}

		} catch (Exception $e) {
			throw new Exception("Error Processing Request", 1);
					
		}
	} 


	/**
	 * Debug function that takes screenshot 
	 * and save at the server with txt file 
	 * with full log
	 */
	public function bug_report()
	{
		$this->app = new \config\APP;

		$info = $_POST['info'];
		$err = $_POST['err'];
		$root_path_info = pathinfo(dirname(__DIR__));
		$output = date('YmdHis').'-'.$this->app->auth()->id.'-'.$info;
		file_put_contents($root_path_info['dirname'].'/uploads/bugs/'.$output.'.jpg', file_get_contents($_POST['image']));

		$txtLog = $root_path_info['dirname'].'/uploads/bugs/error_bugs.txt'; 
		file_put_contents($txtLog, file_get_contents($txtLog)."\r\n".$output . $err);

		$this->BugReportRepo = new BugReportRepository;

		$data = array();
		$data['user_id'] = $this->app->auth()->id;
		$data['file_name'] = $output.'.jpg';
		$data['info'] =  $info;
		$data['error'] =  $err;
		$this->BugReportRepo->store($data);

	}

}
