<?php

namespace Medians\Products\Infrastructure;

use Medians\Categories\Domain\Category;
use Medians\Products\Domain\Product;
use Medians\Content\Domain\Content;
use Medians\Languages\Domain\Language;


class CategoryRepository 
{


	public function find($id)
	{
		return Category::find($id);
	}

	public function get($limit = 100)
	{
        return Category::with('parent')->withCount('products')->where('model', Product::class )->limit($limit)->get();
	}

	public function list($categoryId = 0)
	{
        return Category::where('category_id', '!=', $categoryId)->where('model', Product::class )->select('*','category_id as value')->get();
	}

	public function getGrouped($limit = 100)
	{
        return Category::where('model', Product::class )
		->where('parent_id', 0)
		->with('childs')
		->limit($limit)->get();
	}

	/**
	 * Get all categories by Model
	 * 
	 * @param String
	 */ 
	public function categories($model)
	{
		return Category::where('model', $model)->orderBy('id', 'DESC')->get();
	}






	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Category();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['status'] = isset($dataArray['status']) ? 'on' : null;
		$dataArray['model'] = Product::class;
		// Return the Model object with the new data
    	$Object = Category::firstOrCreate($dataArray);

		isset($data['content_langs']) ? $this->storeContent( $data['content_langs'], $Object) : '';

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Category::find($data['category_id']);
		
		// Return the Model object with the new data
    	$Object->update( (array) $data);

		$this->storeContent( $data['content_langs'], $Object);

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
			
			return Category::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

	/**
	* Save related items to database
	*/
	public function storeContent($data, $Object) 
	{

		$langs = Language::get();
		foreach ($langs as $key => $value)
		{
			$data = (array) $data;
			Content::where('lang', $key)->where('item_id', $Object->category_id)->where('item_type', Category::class)->delete();
			$fields = ['title'=>'-'];
			if (isset($data[ $value->language_code ])) {
				$fields = (array) $data[$value->language_code];
			}
			$fields['lang'] = $value->language_code;
			$fields['item_id'] = $Object->category_id;	
			$fields['item_type'] = Category::class;	
			$fields['prefix'] = isset($fields['prefix']) ? Content::generatePrefix($fields['prefix']) : Content::generatePrefix( $fields['title']);	

			$Model = Content::create($fields);
		}

		return $Model;		
	}


}
