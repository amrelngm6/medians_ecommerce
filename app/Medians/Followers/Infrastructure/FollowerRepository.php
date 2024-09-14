<?php

namespace Medians\Followers\Infrastructure;

use Medians\Followers\Domain\Follower;


class FollowerRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Follower::find($id);
	}

	public function get($limit = 1000)
	{
		return Follower::with('item')->limit($limit)->get();
	}




	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Follower();
		
		$data['item_type'] = (new \Medians\Media\Domain\MediaItem)::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['status'] = isset($dataArray['status']) ? 'on' : null;
		// Return the Model object with the new data
    	$Object = Follower::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Follower::find($data['follow_id']);
		
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
			
			return Follower::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
