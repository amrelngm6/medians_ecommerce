<?php

namespace Medians\Channels\Infrastructure;

use Medians\Channels\Domain\Channel;
use Medians\Customers\Domain\Customer;


class ChannelRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Channel::find($id);
	}

	public function get($limit = 1000)
	{
		return Channel::with('item')->limit($limit)->get();
	}


	
	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Channel();
		
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
    	$Object = Channel::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Channel::find($data['channel_id']);
		
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
			
			return Channel::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
