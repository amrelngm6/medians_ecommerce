<?php

namespace Medians\Cart\Infrastructure;

use Medians\Cart\Domain\Compare;
use Medians\Products\Domain\Product;


class CompareRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Compare::find($id);
	}

	public function get($customerId)
	{
		return Compare::with('item')->where('customer_id', $customerId)->get();
	}

	public function guest_items($sessionId)
	{
		return Compare::whereHas('item')->with('item')->where('session_id', $sessionId)->get();
	}


	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Compare();
		
		$data['item_type'] = (new \Medians\Products\Domain\Product)::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Compare::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Compare::find($data['compare_id']);
		
		// Return the Model object with the new data
    	$Object->update( (array) $data);

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
			
			return Compare::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

	
	public function getPrices($items)
	{
		$price = 0;
		if (!$items)
		{
			return $price;
		}

		for ($i=0; $i < count($items); $i++) { 

			$price += isset($items[$i]->item) ? ($items[$i]->item->price) * ($items[$i]->qty) : 0 ;
		}

		return $price;
	}
}
