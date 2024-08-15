<?php

namespace Medians\Currencies\Infrastructure;

use Medians\Currencies\Domain\Currency;
use Medians\Settings\Domain\SystemSettings;


/**
 * Currency class database queries
 */
class CurrencyRepository 
{

	/**
	* Find item by `id` 
	*/
	public function find($id) 
	{
		return Currency::find($id);
	}

	/**
	* Find item by `code` 
	*/
	public function load($code) 
	{
		return Currency::where('code', $code)->first();
	}

	/**
	* Find main item
	*/
	public function mainCurrency() 
	{
		$systemSerring = SystemSettings::where('code','currency')->first();
		return Currency::where('code', $systemSerring->value)->first();
	}

	/**
	* Find items grouped by code 
	*/
	public function get() 
	{
		return Currency::groupBy('code')->get();
	}

	/**
	* Find latest updated items 
	*/
	public function load_active() 
	{
		return Currency::where('last_check', date('Y-m-d'))->groupBy('code')->get();
	}

	
	/**
	* Load system default currency 
	*/
	public function default_currency()
	{
		$currency = SystemSetting::where('code', 'currency')->first();
		return isset($currency->value) ? $this->where('code', $currency->value)->first() : '';
	}


	/**
	* Save item to database
	*/
	public function store($data) 
	{	

		$Model = new Currency();
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Currency::firstOrCreate($dataArray);

    	return $Object;
	}


	/**
	* Update item to database
	*/
    public function update($data)
    {

		$Object = Currency::where('code', $data['code'])->first();
		
		// Return the Model object with the new data
		$data['last_check'] = date('Y-m-d');
    	$update = $Object->update( $data);

    	return $Object;
    } 



	/**
	* Delete item to database
	*
	* @Returns Boolen
	*/
	public function delete($id) 
	{
		try {
			
			return Currency::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


}