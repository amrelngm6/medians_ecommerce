<?php

namespace Medians\Settings\Application;
use \Shared\dbaser\CustomController;

use Medians\Settings\Infrastructure\SystemSettingsRepository;
use Medians\Currencies\Infrastructure\CurrencyRepository;


class PaymentSettingsController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;

	protected $currencyRepo;


	function __construct()
	{
		
		$this->app = new \config\APP;

		$this->repo = new SystemSettingsRepository();
		$this->currencyRepo = new CurrencyRepository();
	}

	
	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            		
			'basic'=> [	
				[ 'key'=> "currency", 'title'=> translate('Currency'), 
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'title', 'column_key'=> 'code',
					'data' => $this->currencyRepo->get()  
				],
				[ 'key'=> "currency_converter_api", 'title'=> translate('Currency converter API'), 'help_text'=> translate('Important required if you want to enable paystack payment from CurrencyAPI https://app.currencyapi.com/api-keys'),'fillable'=> true, 'required'=> true, 'column_type'=>'text' ],
			],
			'paypal'=> [	
				[ 'key'=> "paypal_payment", 'title'=> translate('Allow Paymment  with PayPal'), 'help_text'=>translate('Allow users to pay with PayPal for orders'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "paypal_api_key", 'title'=> translate('PayPal API Key'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "paypal_api_secret", 'title'=> translate('PayPal API Secret'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "paypal_mode", 'title'=> translate('PayPal mode'), 
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'title', 
					'data' => [['paypal_mode'=>'live','title'=>'Live'], ['paypal_mode'=>'sandbox','title'=>'Sandbox']]  
				],
			],
			'paystack'=> [
				[ 'key'=> "paystack_payment", 'title'=> translate('Allow Paymment  with paystack'), 'help_text'=>translate('Allow users to pay with paystack for orders'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "paystack_public_key", 'title'=> translate('PayStack public key'), 'help_text'=>translate('Get your Live / Test code from PayStack https://dashboard.paystack.com/#/settings/developers'), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "paystack_secret_key", 'title'=> translate('PayStack secret key'), 'help_text'=>translate(''), 'fillable'=> true, 'column_type'=>'text' ],
				[ 'key'=> "currency_converter_api", 'title'=> translate('Currency converter API'), 'help_text'=> translate('Important required if you want to enable paystack payment from CurrencyAPI https://app.currencyapi.com/api-keys'),'fillable'=> true, 'required'=> true, 'column_type'=>'text' ],
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
			'title' => translate('Site_Settings'),
	    ]);
	} 



	public function getItem($code = null) 
	{	
		return $this->repo->getByCode($code);
	}


	public function getAll() 
	{	
		$data = $this->repo->getAll();
		$output = $data ? array_column(json_decode($data), 'value', 'code') :  [];
		$_SESSION['currency'] = $_SESSION['currency'] ??  $output['currency'];
		return $output;
	}

	public function currency() 
	{	
		return $this->currencyRepo->load($_SESSION['currency']);
	}



	/**
	* Return the Settings
	*/
	public function update() 
	{
		$params = $this->app->params();

		try {

            if (isset($this->updateSettings($params)->updated)) 
            	return array('success'=>1, 'result'=>translate('Updated'));

        } catch (Exception $e) {
            return  array('error'=>$e->getMessage());
        }
	}



	/**
	* Return the Settings
	*/
	public function updateSettings($params) 
	{
		try {
			
			foreach ($params as $code => $value)
			{
				$this->deleteItem($code)->saveItem($code, $value);
			}

			$this->updated = true;
			
			return $this;

		} catch (Exception $e) {
            return  array('error'=>$e->getMessage());
		}
	}




	public function saveItem($code, $value) 
	{
		if (is_array($value))
			return $this->saveItemArray($code, $value);
		
		$data = [
			'created_by' => $this->app->auth()->id,
			'code' => $code,
			'value' => $value
		];

		return $this->repo->store($data);

	}


	public function saveItemArray($code, $value) 
	{
		foreach ($value as $k => $v) 
		{
			$data = [
				'created_by' => $this->app->auth()->id,
				'code' => $code,
				'value' => $v
			];
			
			$this->repo->store($data);
		}
	}


	public function deleteItem($code) 
	{
		$this->repo->delete($code);

		return $this;
	}


}
