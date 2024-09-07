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
	 * Load items with filters
	 */
	public function getWithFilter($params)
	{

			$model = MediaItem::
            // where('status', 'on')->
			with('genres', 'main_file');

			if (isset($params['prices'])) {
				$prices = explode(',', $params['prices']);
				$model = $model->whereBetween('price', $prices);
			}

			if (isset($params['title'])) {
				$model = $model->whereHas('lang_content', function($q) use ($params) {
					$q->where('content', 'LIKE', '%'.$params['title'].'%')->orWhere('title', 'LIKE', '%'.$params['title'].'%');
				});
			}

			if (isset($params['sort_by']))
			{
				switch ($params['sort_by']) {
					case 'best':
						$model = $model->withCount('views')->orderBy('views_count','DESC');
						break;
						
					default:
						$model = $model->orderBy('media_id','DESC');
						break;
				}
			}

			$totalCount = $model->count();

			$limit = (($params['limit'] ?? 4) * (floatval($params['page'] ?? 1) ?? 1));
			return ['count' => $totalCount, 'items'=>$model->limit($limit)->get()];
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
    	$this->storeGenres($data['selected_genres'] ,$Object->media_id);

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

	/**
	* Save related genres to database
	*/
	public function storeGenres($data, $id) 
	{
		MediaGenre::where('media_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$fields = [];
                
				$fields['media_id'] = $id;	
				$fields['genre_id'] = $value;	

				$Model = MediaGenre::create($fields);
			}
	
			return $Model;		
		}
	}

}
