<?php

namespace Medians\Categories\Infrastructure;

use Medians\Categories\Domain\Category;
use Medians\Categories\Domain\Genre;
use Medians\Categories\Domain\Mood;
use Medians\Blog\Domain\Blog;
use Medians\Content\Domain\Content;


class CategoryRepository 
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
		return new Category();
	}


	public function find($id)
	{
		$item = Category::find($id);
		return (new $item->model)->find($id);
	}

	public function get($limit = 100)
	{
		return Category::where('model', null)->limit($limit)->get();
	}

	public function getAllGenres( $limit = 100)
	{
		return Genre::where('model', Genre::class)->limit($limit)->get();
	}

	public function getGenres( $limit = 100)
	{
		return Genre::where('status', 'on')->where('model', Genre::class)->limit($limit)->get();
	}

	public function getAllMoods( $limit = 100)
	{
		return Mood::where('model', Mood::class)->limit($limit)->get();
	}

	public function categories($model)
	{
		return Category::where('model', $model)->get();
	}






	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Category();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $this->getModel()->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['status'] = isset($dataArray['status']) ? 'on' : 0;
		// Return the FBUserInfo object with the new data
    	$Object = Category::create($dataArray);

    	// Store languages content
    	$this->storeContent($data['content_langs'] ,$Object->category_id, $Object->model);

    	return $Object;
    }
    	
    	

    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Category::find($data['category_id']);
		
		// Return the FBUserInfo object with the new data
    	$Object->update( (array) $data);

    	// Store languages content
    	$this->storeContent($data['content_langs'] ,$Object->category_id, $Object->model);

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
			
			$item = Category::find($id);
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
	public function storeContent($data, $id, $modelClass) 
	{
		Content::where('item_type', $modelClass)->where('item_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$value = (array) $value;
				$fields = $value;
				$fields['item_type'] = $modelClass;	
				$fields['item_id'] = $id;	
				$fields['lang'] = $key;	
				$fields['prefix'] = !empty($value['prefix']) ? $value['prefix'] : Content::generatePrefix($value['title']);	
				$fields['created_by'] = $this->app->auth()->id;

				$Model = Content::create($fields);
				$Model->update($fields);
			}
	
			return $Model;		
		}
	}

}
