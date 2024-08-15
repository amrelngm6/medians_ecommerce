<?php

namespace Medians\Brands\Infrastructure;

use Medians\Brands\Domain\Brand;
use Medians\Devices\Domain\Device;
use Medians\Products\Domain\Product;


class BrandRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Brand::find($id);
	}

	public function get($limit = 100)
	{
		return Brand::limit($limit)->get();
	}

	public function getActive($limit = 100)
	{
		return Brand::where('status', 'on')->limit($limit)->get();
	}




	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Brand();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['status'] = isset($dataArray['status']) ? 'on' : null;
		// Return the Model object with the new data
    	$Object = Brand::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Brand::find($data['brand_id']);
		
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
			
			return Brand::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
