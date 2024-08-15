<?php

namespace Medians\Settings\Application;
use \Shared\dbaser\CustomController;

use Medians\Settings\Infrastructure\AppSettingsRepository;


class AppSettingsController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	
	public $updated = true;



	function __construct()
	{
		
		$this->app = new \config\APP;

		$this->repo = new AppSettingsRepository();

	}

	
	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            
			'basic'=> [	
	            [ 'key'=> "logo", 'title'=> translate('logo'), 'fillable'=>true, 'column_type'=>'file' ],
				[ 'key'=> "app_name", 'title'=> translate('App Name'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "default_lang", 'title'=> translate('Languange'), 
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'title', 
					'data' => [['default_lang'=>'arabic','title'=>translate('Arabic')], ['default_lang'=>'english','title'=>translate('English')]]  
				]
			],
			'Header'=> [
				[ 'key'=> "header", 'title'=> translate('Header style'), 
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'title', 
					'data' => [['header'=>'header1','title'=>translate('Header 1')], ['header'=>'header2','title'=>translate('Header 2')],['header'=>'header3','title'=>translate('Header 3')]]  
				],
				[ 'key'=> "header_text_color", 'title'=> translate('Header Text Color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "header_color", 'title'=> translate('Header BG Color'), 'fillable'=> true, 'column_type'=>'color' ],
	            [ 'key'=> "header_bg", 'title'=> translate('Header background'), 'fillable'=>true, 'column_type'=>'file' ],
			],
			'Style colors'=> [	
				[ 'key'=> "main_bg", 'title'=> translate('Main BG Color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "section_bg", 'title'=> translate('Section BG Color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "text_color", 'title'=> translate('Text Color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "title_color", 'title'=> translate('Title Color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "label_color", 'title'=> translate('Labels Color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "border_color", 'title'=> translate('Border Color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "shadow_color", 'title'=> translate('Shadow Color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "icon_color", 'title'=> translate('Icon Color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "button_bg_color", 'title'=> translate('Button bg color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "button_text_color", 'title'=> translate('Button text color'), 'fillable'=> true, 'column_type'=>'color' ],
				[ 'key'=> "action_bg_color", 'title'=> translate('Call-to-action bg color'), 'fillable'=> true, 'column_type'=>'color' ],
			],
			'Social media login'=> [	
				[ 'key'=> "login_with_google", 'title'=> translate('Login with Google'), 'help_text'=>translate('Let users login & signup using their Gmail'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "login_with_twitter", 'title'=> translate('Login with Twitter'), 'help_text'=>translate('Let users login & signup using their Twitter (X) account'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "twitter_redirect_link", 'title'=> translate('Twitter Redirect callback'), 'help_text'=> translate('Redirect should be scheme like (mediansparents://callback)'), 'fillable'=> true, 'column_type'=>'text' ],
            ],
			
			'Data loading'=> [	
				[ 'key'=> "business_load_limit", 'title'=> translate('Providers list limit per load'), 'help_text'=>translate('The count of the loaded items in single query and when they load more items'), 'fillable'=> true, 'column_type'=>'number' ],
            ],
        ];
	}


	/**
	 * Index settings page
	 * 
	 */
	public function index()
	{
		return render('app_settings', [
            'load_vue' => true,
            'app_type' => 'Driver',
            'app_setting' => $this->getAll('Driver'),
            'fillable' => $this->fillable(),
            'title' => translate('Driver app Settings'),
	    ]);
	} 

	/**
	 * Index settings page
	 * 
	 */
	public function parent_index()
	{
		return render('parent_app_settings', [
            'load_vue' => true,
            'app_type' => 'Parent',
            'app_setting' => $this->getAll('Parent'),
            'fillable' => $this->parent_fillable(),
            'title' => translate('Parents app Settings'),
	    ]);
	} 

	public function parent_fillable() 
	{
		$list = $this->fillable();
		
		$list['payment_methods'] = [
			[ 'key'=> "cash_payment", 'title'=> translate('Cash payment'), 'help_text'=>translate('Allow the users to pay for the taxi trips and subscriptions in cash, the balance would be added to the Driver debit balance'), 'fillable'=> true, 'column_type'=>'checkbox' ],
			[ 'key'=> "paypal_payment", 'title'=> translate('PayPal payment'), 'help_text'=>translate('Allow the users to pay for the taxi trips and subscriptions in PayPal'), 'fillable'=> true, 'column_type'=>'checkbox' ],
			[ 'key'=> "paystack_payment", 'title'=> translate('PayStack payment'), 'help_text'=>translate('Allow the users to pay for the taxi trips and subscriptions in PayStack'), 'fillable'=> true, 'column_type'=>'checkbox' ],
		];

		return $list;
	}


    /**
     * Get APP Settings 
     */    
	public function getAll($app) 
	{	
		$data = $this->repo->getAll($app);

		return $data ? array_column(json_decode($data), 'value', 'code') :  [];
	}

    /**
     * Load APP Settings 
     */    
	public function loadSetting() 
	{	
		$app = $this->app->request()->headers->get('userType');
		 
		return $this->getAll($app ? $app : 'driver');
	}


	/**
	* Return the Settings
	*/
	public function update() 
	{

		$params = $this->app->params();
		$targetApp = $this->app->request()->get('app');

		try {

            $update = $this->updateSettings($targetApp, $params);

            if (isset($update->updated)) 
            	return array('success'=>1, 'result'=>translate('Updated'));

        } catch (Exception $e) {
            return  array('error'=>$e->getMessage());
        }
	}



	/**
	* Return the Settings
	*/
	public function updateSettings($targetApp, $params) 
	{
		try {
			
			foreach ($params as $code => $value)
			{
				$this->deleteItem($targetApp, $code)->saveItem($targetApp, $code, $value);
			}

			$this->updated = true;
			
			return $this;

		} catch (Exception $e) {
            return  array('error'=>$e->getMessage());
		}
	}



	public function saveItem($targetApp, $code, $value) 
	{
		$data = [
			'created_by' => $this->app->auth()->id,
			'app' => $targetApp,
			'code' => $code,
			'value' => $value
		];

		return $this->repo->store($data);

	}


	public function deleteItem($targetApp, $code) 
	{
		$this->repo->delete($targetApp, $code);

		return $this;
	}


}
