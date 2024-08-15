<?php

namespace Medians\Cart\Infrastructure;

use Medians\Cart\Domain\Wishlist;
use Medians\Products\Domain\Product;


class WishlistRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Wishlist::find($id);
	}

	public function get($customerId = 0)
	{
		return Wishlist::with('item')->where('customer_id', $customerId)->get();
	}

	public function guest_items($sessionId)
	{
		return Wishlist::whereHas('item')->with('item')->where('session_id', $sessionId)->get();
	}




	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Wishlist();
		
		$data['item_type'] = (new \Medians\Products\Domain\Product)::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Wishlist::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Wishlist::find($data['wishlist_id']);
		
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
			
			return Wishlist::find($id)->delete();

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
