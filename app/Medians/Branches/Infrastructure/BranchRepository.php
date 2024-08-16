<?php

namespace Medians\Branches\Infrastructure;

use Medians\Branches\Domain\Branch;


class BranchRepository   
{




	public function get()
	{

		return Branch::get();

	}


	public function find($id)
	{

		return Branch::find($id);

	}

	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Branch();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}		

		// Return the  object with the new data
    	$Object = Branch::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Branch::find($data['id']);
		
		// Return the  object with the new data
    	$update = $Object->update( (array) $data);

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
			
			$delete = Branch::find($id)->delete();

			return true;

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}



}
