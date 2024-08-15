<?php

namespace Medians\Cart\Infrastructure;

use Medians\Cart\Domain\Cart;
use Medians\Products\Domain\Product;


class CartRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Cart::find($id);
	}

	public function get($customerId)
	{
		return Cart::with('item')->where('customer_id', $customerId)->get();
	}

	public function guest_items($sessionId)
	{
		return Cart::whereHas('item')->with('item')->where('session_id', $sessionId)->get();
	}




	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Cart();
		
		$data['item_type'] = (new \Medians\Products\Domain\Product)::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Cart::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Cart::find($data['cart_id']);
		
		// Return the Model object with the new data
    	$Object->update( (array) $data);

    	return $Object;

    } 
    	
    /**
     * Update Lead
     */
    public function updateCustomerSessionItems($sessionId, $customer_id)
    {

		$update = Cart::where('session_id', $sessionId)->update(['customer_id'=> $customer_id]);
		
		// Return the Model object with the new data
    	return $update;

    } 


	/**
	* Delete item to database
	*
	* @Returns Boolen
	*/
	public function delete($id) 
	{
		try {
			
			return Cart::find($id)->delete();

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
