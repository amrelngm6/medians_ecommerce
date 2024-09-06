<?php

namespace Medians\Media\Infrastructure;

use Medians\Media\Domain\MediaItem;
use Medians\Media\Domain\MediaFile;
use Medians\Media\Domain\MediaGenre;
use Medians\Categories\Domain\Genre;
use Medians\Categories\Domain\Mood;
use Medians\Blog\Domain\Blog;
use Medians\Content\Domain\Content;


class MediaItemRepository 
{

	
	/**
	 * Load app for Sessions and helpful
	 * methods for authentication and
	 * settings for branch
	 */ 
	protected $app ;



	function __construct()
	{
		$this->app = new \config\APP;
	}


	public static function getModel()
	{
		return new MediaItem();
	}


	public function find($id)
	{
		return MediaItem::with('genres','main_file')->find($id);
	}

	public function get($limit = 100)
	{
		return MediaItem::with('main_file')->where('model', null)->limit($limit)->get();
	}

	public function categories($model)
	{
		return MediaItem::where('model', $model)->get();
	}






	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new MediaItem();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $this->getModel()->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['status'] = isset($dataArray['status']) ? 'on' : 0;
		// Return the FBUserInfo object with the new data
    	$Object = MediaItem::create($dataArray);

    	// Store languages content
    	$this->storeFiles($data['files'] ,$Object->media_id);

    	return $Object;
    }
    	
    	

    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = MediaItem::find($data['media_id']);
		
		// Return the FBUserInfo object with the new data
    	$Object->update( (array) $data);

    	// Store languages content
    	// $this->storeContent($data['files'] ,$Object->media_id);

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
			
			$item = MediaItem::find($id);
			$delete = $item->delete();

			if ($delete){
				$this->storeContent(null, $id, $item->model);
			}

			return true;

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


	/**
	* Save related items to database
	*/
	public function storeFiles($data, $id) 
	{
		MediaFile::where('media_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$value = (array) $value;
				$fields = $value;
                
				$fields['media_id'] = $id;	
				$fields['sort'] = $value['sort'] ?? 0;	

				$Model = MediaFile::create($fields);
			}
	
			return $Model;		
		}
	}

}
