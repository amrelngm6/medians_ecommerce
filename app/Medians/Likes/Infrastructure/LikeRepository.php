<?php

namespace Medians\Likes\Infrastructure;

use Medians\Likes\Domain\Like;
use Medians\Media\Domain\MediaItem;
use Medians\Playlists\Domain\Playlist;

class LikeRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Like::find($id);
	}


	public function get($limit = 1000)
	{
		return Like::with('item')->limit($limit)->get();
	}

	public function checkLiked($item_id, $customer_id)
	{
		return Like::where('item_id', $item_id)->where('item_type', MediaItem::class)->where('customer_id', $customer_id)->first();
	}

	public function checkLikedPlaylist($item_id, $customer_id)
	{
		return Like::where('item_id', $item_id)->where('item_type', Playlist::class)->where('customer_id', $customer_id)->first();
	}




	/**
	* Save item to database
	*/
	public function store_media($data) 
	{

		$Model = new Like();
		
		$data['item_type'] = MediaItem::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Like::firstOrCreate($dataArray);

    	return $Object;
    }

	/**
	* Save item to database
	*/
	public function store_playlist($data) 
	{

		$Model = new Like();
		
		$data['item_type'] = \Medians\Playlists\Domain\Playlist::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Like::firstOrCreate($dataArray);

    	return $Object;
    }
    	

	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Like();
		
		$data['item_type'] = (new \Medians\Products\Domain\Product)::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Like::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Like::find($data['like_id']);
		
		// Return the Model object with the new data
    	$Object->update( (array) $data);

    	return $Object;

    } 


	/**
	* Delete item to database
	*
	* @Returns Boolen
	*/
	public function delete($params, $customer_id) 
	{
		try {
			
			return $this->checkLiked($params['item_id'], $customer_id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

	/**
	* Delete item to database
	*
	* @Returns Boolen
	*/
	public function deletePlaylist($params, $customer_id) 
	{
		try {
			
			return $this->checkLikedPlaylist($params['item_id'], $customer_id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
