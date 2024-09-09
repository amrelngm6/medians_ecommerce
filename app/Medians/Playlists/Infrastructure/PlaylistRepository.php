<?php

namespace Medians\Playlists\Infrastructure;

use Medians\Playlists\Domain\Playlist;
use Medians\Devices\Domain\Device;
use Medians\Products\Domain\Product;


class PlaylistRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Playlist::with('items')->withCount('likes')->find($id);
	}

	public function get($limit = 1000)
	{
		return Playlist::with('items')->limit($limit)->get();
	}

	public function getByCustomer($customer_id)
	{
		return Playlist::with('items')->where('customer_id', $customer_id)->get();
	}




	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Playlist();
		
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
    	$Object = Playlist::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Playlist::find($data['playlist_id']);
		
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
			
			return Playlist::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
