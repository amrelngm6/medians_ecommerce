<?php

namespace Medians\Categories\Infrastructure;

use Medians\Categories\Domain\Category;
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
		return Category::find($id);
	}

	public function get($model = null, $limit = 100)
	{
		return Category::with('content')->withCount('blog')->where('model', Blog::class)->limit($limit)->get();
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
    	$Object->update($dataArray);

    	// Store languages content
    	$this->storeContent($data['content'] ,$Object->id);

    	return $Object;
    }
    	
    	

    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Category::find($data['id']);
		
		$data['updated_at'] = date('Y-m-d H:i:s');
		// Return the FBUserInfo object with the new data
    	$Object->update( (array) $data);

    	// Store languages content
    	$this->storeContent($data['content'] ,$Object->id);

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
			
			$delete = Category::find($id)->delete();

			if ($delete){
				$this->storeContent(null, $id);
			}

			return true;

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


	/**
	* Save related items to database
	*/
	public function storeContent($data, $id) 
	{
		Content::where('item_type', Category::class)->where('item_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$fields = $value;
				$fields['item_type'] = Category::class;	
				$fields['item_id'] = $id;	
				$fields['lang'] = $key;	
				$fields['prefix'] = isset($value['prefix']) ? $value['prefix'] : Content::generatePrefix($value['title']);	
				$fields['created_by'] = $this->app->auth()->id;

				$Model = Content::create($fields);
				$Model->update($fields);
			}
	
			return $Model;		
		}
	}

}
