<?php

namespace Medians\Gallery\Infrastructure;

use Medians\Gallery\Domain\Gallery;
use Medians\Gallery\Domain\GalleryField;



/**
 * Gallery class database queries
 */
class GalleryRepository 
{

	

	/**
	* Find item by `id` 
	*/
	public function find($id) 
	{
		return Gallery::find($id);
	}

	/**
	* Find items by `params` 
	*/
	public function get($params = null) 
	{
		return Gallery::get();
	}


	/**
	* Save item to database
	*/
	public function store($data) 
	{	

		$Model = new Gallery();
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Gallery::firstOrCreate($dataArray);

    	return $Object;
	}


	/**
	* Update item to database
	*/
    public function update($data)
    {

		$Object = Gallery::find($data['gallery_id']);
		
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
			
			return Gallery::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


	
	
}