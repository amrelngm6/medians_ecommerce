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
	public  $CustomerRepository;

	protected $app;
	public $start;
	public $end;
	public $month_beginning;
	

	function __construct()
	{
		$this->app = new \config\APP;
		$user = $this->app->auth();

		$this->contentRepo = new Content\Infrastructure\ContentRepository();
		$this->CustomerRepository = new Customers\Infrastructure\CustomerRepository();

		
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
	        return $user->role_id ?  render('master_dashboard', $this->data()) : '';
	        
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
			
	        return json_encode($user->role_id ?  $this->data() : []);
	        
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

			$counts = $this->loadMasterCounts();

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
	 * Load countable statstics
	 */
	public function loadMasterCounts()
	{

		$subscriberRepo = new Newsletters\Infrastructure\SubscriberRepository();
		$mediaItemRepo = new Media\Infrastructure\MediaItemRepository();

		$data = [];

        $data['latest_visits'] = View::totalViews($this->start, $this->end)->with('item')->orderBy('updated_at', 'desc')->limit(5)->get();
        $data['top_visits'] = View::totalViews($this->start, $this->end)->with('item')->orderBy('times', 'desc')->limit(5)->get();
        $data['total_visits'] = View::totalViews($this->start, $this->end)->sum('times');


        // $data['top_products'] = $this->ProductRepository;
        $data['top_customers'] = [];
		$data['video_charts'] = $mediaItemRepo->eventsByDate(['start'=>$this->month_beginning, 'end'=>$this->end])->where('type', 'video')-> selectRaw('Date(created_at) as label, COUNT(*) as y')->having('y', '>', 0)->groupBy('label')->limit('10')->get();
        $data['video_count'] = $mediaItemRepo->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->where('type', 'video')->count();
        $data['latest_videos'] = $mediaItemRepo->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->withCount('views')->where('type', 'video')->with('artist')->limit('10')->get();

		$data['audio_charts'] = $mediaItemRepo->eventsByDate(['start'=>$this->month_beginning, 'end'=>$this->end])->where('type', 'audio')-> selectRaw('Date(created_at) as label, COUNT(*) as y')->having('y', '>', 0)->groupBy('label')->limit('10')->get();
        $data['audio_count'] = $mediaItemRepo->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->where('type', 'audio')->count();
        $data['latest_audio'] = $mediaItemRepo->eventsByDate(['start'=>$this->start, 'end'=>$this->end])->withCount('views')->where('type', 'audio')->with('artist')->limit('10')->get();

		$data['customers_count'] = $this->CustomerRepository->masterByDateCount(['start'=>$this->start, 'end'=>$this->end]);

		$data['visits_charts'] = View::totalViews($this->month_beginning, $this->end)->selectRaw('date, SUM(times) as y, item_type')->having('y', '>', 0)->groupBy('date')->limit('10')->get();
		$data['visits_count'] = View::totalViews($this->start, $this->end)->sum('times');

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
