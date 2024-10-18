<?php

namespace Medians\Packages\Infrastructure;

use Medians\Packages\Domain\Package;


/**
 * Package class database queries
 */
class PackageRepository 
{

	
	 
	

	function __construct()
	{
		
		
	}

	/**
	* Find item by `id` 
	*/
	public function find($id) 
	{

		return Package::find($id);
	}

	/**
	* Find items by `params` 
	*/
	public function get($params = null) 
	{
		return Package::get();
	}


	

	/**
	* Save item to database
	*/
	public function store($data) 
	{	

		$Model = new Package();
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Package::firstOrCreate($dataArray);

    	isset($data['field']) ? $this->storeCustomFields($data['field'] ,$Object->package_id) : '';

    	return $Object;
	}


	/**
	* Update item to database
	*/
    public function update($data)
    {

		$Object = Package::find($data['package_id']);
		
		// Return the Model object with the new data
    	$Object->update( (array) $data);

    	isset($data['field']) ? $this->storeCustomFields($data['field'] ,$Object->package_id) : '';


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
			
			return Package::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


	
	/**
	* Save file related items to database
	*/
	public function storeCustomFields($data, $id) 
	{
		CustomField::where('model_type', Package::class)->where('model_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['model_type'] = Package::class;	
				$fields['model_id'] = $id;	
				$fields['code'] = $key;	
				$fields['value'] = $value;

				$Model = CustomField::create($fields);
			}
	
			return $Model;		
		}
	}

}