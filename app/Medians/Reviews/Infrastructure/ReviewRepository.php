<?php

namespace Medians\Reviews\Infrastructure;

use Medians\Reviews\Domain\Review;
use Medians\Devices\Domain\Device;
use Medians\Products\Domain\Product;


class ReviewRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Review::find($id);
	}

	public function get($limit = 1000)
	{
		return Review::with('item')->limit($limit)->get();
	}




	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Review();
		
		$data['item_type'] = (new \Medians\Products\Domain\Product)::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['status'] = isset($dataArray['status']) ? 'on' : null;
		// Return the Model object with the new data
    	$Object = Review::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Review::find($data['review_id']);
		
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
			
			return Review::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
