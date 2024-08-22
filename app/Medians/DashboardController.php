<?php

namespace Medians;

use \Shared\dbaser\CustomController;

use Medians\Views\Domain\View;

class DashboardController extends CustomController
{

	/**
	* @var Object
	*/
	public  $contentRepo;
	public  $HelpMessageRepository;
	public  $InvoiceRepository;
	public  $TransactionRepository;
	public  $CustomerRepository;
	public  $ProductRepository;

	protected $app;
	public $start;
	public $end;
	public $month_beginning;
	

	function __construct()
	{
		$this->app = new \config\APP;
		$user = $this->app->auth();

		$this->contentRepo = new Content\Infrastructure\ContentRepository();
		$this->HelpMessageRepository = new Help\Infrastructure\HelpMessageRepository();
		$this->CustomerRepository = new Customers\Infrastructure\CustomerRepository();
		$this->InvoiceRepository = new Invoices\Infrastructure\InvoiceRepository();
		$this->TransactionRepository = new Transactions\Infrastructure\TransactionRepository();
		$this->ProductRepository = new Products\Infrastructure\ProductRepository();

		
		$setting = $this->app->SystemSetting();
		$defaultStart = isset($setting['default_dashboard_start_date']) ? date('Y-'. $setting['default_dashboard_start_date']) : date('Y-m-d');
		$this->start = $this->app->request()->get('start_date') ? date('Y-m-d', strtotime($this->app->request()->get('start_date'))) : $defaultStart;
		$this->end = $this->app->request()->get('end_date') ? date('Y-m-d', strtotime($this->app->request()->get('end_date'))) : date('Y-m-d');
		$this->end = date('Y-m-d', strtotime($this->end. ' + 1 days'));
		$this->month_beginning = date('Y-m-01', strtotime($this->end));
	}

	/**
	 * Load dashboard page
	 * 
	 * @return response for Vue  
	 */
	public function index()
	{
		try {
			
			$user = $this->app->auth();

			// Name of the Vue components
	        return $user->role_id == 1 ?  render('master_dashboard', $this->master_data()) :   render('dashboard', $this->data());
	        
		} catch (Exception $e) {
			return $e->getMessage();
		}
	} 


	/**
	 * Get the response as array and return as JSON
	 * 
	 * @return JSON of the response  
	 */
	public function json()
	{

		try {

			$user = $this->app->auth();
			
	        return json_encode($user->role_id == 1 ?  $this->master_data() :   $this->data());
	        
		} catch (Exception $e) {
			return $e->getMessage();
		}
	} 

	/**
	 * Dashboard response as Array  
	 * 
	 * @return Array  
	 */
	public function data()
	{

		try {

			$counts = $this->loadCounts();

			$array = [
	            'title' => 'Dashboard',
		        'load_vue' => true,
				'start'=>$this->start,
				'end'=>$this->end,
	        ];

			return array_merge($counts, $array);
	        
		} catch (Exception $e) {
			return $e->getMessage();
		}
	} 



	
	/**
	 * Dashboard response for Master
	 * 
	 * @return Array  
	 */
	public function master_data()
	{

		try {

			$counts = $this->loadMasterCounts();

			$array = [
	            'title' => 'Master Dashboard',
		        'load_vue' => true,
	        ];

			return array_merge($counts, $array);
	        
		} catch (Exception $e) {
			return $e->getMessage();
		}
	} 




	/**
	 * Load countable statstics
	 */
	public function loadCounts()
	{
		$data = [];


        $data['customers_count'] = $this->CustomerRepository->masterByDateCount(['start'=>$this->start, 'end'=>$this->end]);
        $data['help_messages_count'] = $this->HelpMessageRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->count();
        $data['latest_help_messages'] = $this->HelpMessageRepository->load(5);
        $data['invoices_count'] = $this->InvoiceRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->count();
        $data['total_invoices_amount'] = $this->InvoiceRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->sum('total_amount');
        $data['payment_methods_invoices_amount'] = $this->InvoiceRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->selectRaw('SUM(total_amount) as value, payment_method')->groupBy('payment_method')->get();
        $data['latest_invoices'] = $this->InvoiceRepository->get(5);
        $data['latest_transactions'] = $this->TransactionRepository->get(5);
        $data['transactions_count'] = $this->TransactionRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->count();

        return $data;

	}  


	
	/**
	 * Load countable statstics
	 */
	public function loadMasterCounts()
	{

		$subscriberRepo = new Newsletters\Infrastructure\SubscriberRepository();
		$orderRepo = new Orders\Infrastructure\OrderRepository();

		$data = [];

        $data['latest_visits'] = View::totalViews($this->start, $this->end)->with('item')->orderBy('updated_at', 'desc')->limit(5)->get();
        $data['top_visits'] = View::totalViews($this->start, $this->end)->with('item')->orderBy('times', 'desc')->limit(5)->get();
        $data['total_visits'] = View::totalViews($this->start, $this->end)->sum('times');


        // $data['top_products'] = $this->ProductRepository;
        $data['top_customers'] = [];
        $data['help_messages_count'] = $this->HelpMessageRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->count();
        $data['latest_help_messages'] = $this->HelpMessageRepository->allEventsByDate(['start'=>$this->start,'end'=>$this->end], 5);
        $data['latest_invoices'] = $this->InvoiceRepository->get(5);
		
		$data['invoices_charts'] = $this->InvoiceRepository->eventsByDate(['start'=>$this->month_beginning, 'end'=>$this->end])->selectRaw('date as label, COUNT(*) as y, SUM(total_amount) as total_amount')->having('y', '>', 0)->orderBy('y', 'desc')->groupBy('label')->limit('10')->get();
        $data['invoices_count'] = $this->InvoiceRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->count();

		$data['orders_charts'] = $orderRepo->eventsByDate(['start'=>$this->month_beginning, 'end'=>$this->end])->selectRaw('date as label, COUNT(*) as y, SUM(total_amount) as total_amount')->having('y', '>', 0)->groupBy('label')->limit('10')->get();
        $data['orders_count'] = $orderRepo->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->count();
        $data['latest_orders'] = $orderRepo->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->with('customer')->limit('10')->get();
        $data['latest_order_items'] = $orderRepo->eventsItemsByDate(['start'=>$this->start, 'end'=>$this->end])->with('item')->selectRaw('*, COUNT(*) as y')->having('y', '>', 0)->orderBy('y', 'desc')->groupBy('item_id')->limit('6')->get();

		$data['customers_count'] = $this->CustomerRepository->masterByDateCount(['start'=>$this->start, 'end'=>$this->end]);

		$data['visits_charts'] = View::totalViews($this->month_beginning, $this->end)->selectRaw('date, SUM(times) as y, item_type')->having('y', '>', 0)->groupBy('date')->limit('10')->get();
		$data['visits_count'] = View::totalViews($this->start, $this->end)->sum('times');

		
		$data['total_invoices_amount'] = $this->InvoiceRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->sum('total_amount');
		$data['payment_methods_invoices_amount'] = $this->InvoiceRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->selectRaw('SUM(total_amount) as value, payment_method')->groupBy('payment_method')->get();

		// Products stats
		$data['products_charts'] = $this->ProductRepository->eventsByDate(['start'=>$this->month_beginning, 'end'=>$this->end])->selectRaw('Date(created_at) as label, COUNT(*) as y')->having('y', '>', 0)->groupBy('label')->limit('10')->get();
		$data['products_count'] = $this->ProductRepository->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->count();
        
		// Subscribers stats
		$data['subscribers_charts'] = $subscriberRepo->eventsByDate(['start'=>$this->month_beginning, 'end'=>$this->end])->selectRaw('Date(created_at) as label, COUNT(*) as y')->having('y', '>', 0)->groupBy('label')->limit('10')->get();
		$data['subscribers_count'] = $subscriberRepo->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->count();

        return $data;

	}  


	/**
	 * Load sum values 
	 */
	public function loadValues()
	{

		$data = [];

        return $data;

	}  


	/**
	 * Load Items List statstics
	 */
	public function loadList()
	{

		$data = [];

        return $data;

	}  

	
	public function switchLang($lang)
	{
		$app = new \config\APP;
		$languages = array_column($app->Languages()->toArray(), 'language_code');

		$_SESSION['site_lang'] = in_array($lang, $languages) ? $lang : 'english';
		$_SESSION['lang'] = in_array($lang, $languages) ? $lang : 'english';

		$redirectRequest = $app->request()->get('redirect') ?? null;
		$redirect = !empty($redirectRequest) ? $app->CONF['url'].$redirectRequest : ($_SERVER['HTTP_REFERER'] ?? $app->CONF['url']);
		echo $app->redirect($redirect);
	}

}
