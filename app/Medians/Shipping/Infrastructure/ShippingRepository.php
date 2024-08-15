<?php

namespace Medians\Shipping\Infrastructure;

use Medians\Shipping\Domain\Shipping;


class ShippingRepository 
{

	public function find($id)
	{
		return Shipping::find($id);
	}

	public function get($limit = 100)
	{
		return Shipping::limit($limit)->get();
	}

	public function getByItems($ids)
	{
		return Shipping::whereHas('items', function($q) use ($ids) {
			$q->whereIn('product_id', $ids);
		})->get();
	}




	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Shipping();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['status'] = isset($dataArray['status']) ? 'on' : null;
		// Return the Model object with the new data
    	$Object = Shipping::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Shipping::find($data['shipping_id']);
		
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
			
			return Shipping::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
