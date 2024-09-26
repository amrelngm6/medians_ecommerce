<?php

namespace Medians\Playlists\Infrastructure;

use Medians\Playlists\Domain\Playlist;
use Medians\Playlists\Domain\PlaylistMedia;


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
		return Playlist::withCount('likes')->with('items')->limit($limit)->get();
	}

	public function getTop($limit = 1000)
	{
		return Playlist::withCount('likes')->with('items')->limit($limit)->orderBy('likes_count', 'DESC')->get();
	}

	public function getByCustomer($customer_id)
	{
		return Playlist::withCount('likes')->with('items')->where('customer_id', $customer_id)->get();
	}




	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Playlist();
		
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
	* Save media item to database
	*/
	public function store_item($data) 
	{

		$Model = new PlaylistMedia();
		
		$data['item_type'] = PlaylistMedia::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = PlaylistMedia::firstOrCreate($dataArray);

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


	/**
	* Delete item to database
	*
	* @Returns Boolen
	*/
	public function deleteItem($id) 
	{
		try {
			
			return PlaylistMedia::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
