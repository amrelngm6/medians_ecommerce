<?php

namespace Medians\Products\Infrastructure;

use Medians\Products\Domain\Product;
use Medians\Products\Domain\ProductCategory;
use Medians\Products\Domain\ProductShipping;
use Medians\Products\Domain\ProductField;
use Medians\Products\Domain\ProductColor;
use Medians\Products\Domain\ProductSize;
use Medians\Products\Domain\ProductImage;
use Medians\Products\Domain\ProductMedia;
use Medians\Products\Domain\ProductTag;
use Medians\Products\Domain\ProductPrice;
use Medians\Content\Domain\Content;
use Medians\Customers\Domain\Customer;
use Medians\CustomFields\Domain\CustomField;
use Medians\Languages\Domain\Language;


class ProductRepository 
{



	public function find($product_id)
	{
		return  $this->handle(
			Product::with('reviews','brand', 'product_colors', 'product_sizes', 'images', 'product_categories', 'product_fields', 'product_tags', 'shipping','variants')
		 	->find($product_id)
		);
	}

	public function colors()
	{
		return ProductColor::groupBy('value')->get();
	}

	public function sizes()
	{
		return ProductSize::groupBy('value')->get();
	}

	public function brands()
	{
		return ProductField::with('brand')->groupBy('brand_id')->get();
	}

	public function get($limit = 100)
	{
		return Product::with('lang_content',  'category')->limit($limit)->get();
	}
	
	/**
	 * Load  productby prefix
	 */
	 public function findByPrefix($prefix)
	 {
		$model = Product::where('status', 'on')
		 ->whereHas('product_content', function($q) use ($prefix) {
			return $q->where('prefix', $prefix);
		 })
		 ->with('product_colors', 'product_sizes', 'images', 'categories', 'product_fields', 'product_tags', 'product_content','variants')
		 ->first();
		
		return $this->handle($model);
	 }
 
	
	
	/**
	 * Load  products with filters
	 */
	public function getWithFilter($params)
	{

			$model = Product::where('status', 'on')
			->with('product_colors', 'product_sizes', 'images', 'product_fields')
			->withCount('product_categories')
			->whereHas('product_categories', function($q) use ($params){
				isset($params['categories_ids']) ? $q->whereIn('product_categories.category_id', $params['categories_ids']) : $q;
			});
			

			if (isset($params['prices'])) {
				$model = $model->whereBetween('price', $params['prices']);
			}

			if (isset($params['colors'])) {
				$model = $model->whereHas('product_colors', function($q) use ($params) {
					$q->whereIn('value', $params['colors']);
				});
			}

			if (isset($params['sizes'])) {
				$model = $model->whereHas('product_sizes', function($q) use ($params) {
					$q->whereIn('value', $params['sizes']);
				});
			}

			if (isset($params['brands'])) {
				$model = $model->whereHas('product_fields', function($q) use ($params) {
					$q->whereIn('brand_id', $params['brands']);
				});
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
						$model = $model->withCount('orders')->orderBy('orders_count','DESC');
						break;
						
					default:
						$model = $model->orderBy('product_id','DESC');
						break;
				}
			}

			$totalCount = $model->count();

			$limit = (($params['limit'] ?? 4) * (floatval($params['page'] ?? 1) ?? 1));
			return ['count' => $totalCount, 'items'=>$model->limit($limit)->get()];
	 }
 
	

	 public function handle($model)
	 {
		 
		 if ($model)
		 {
			 $model->tags = $model->product_tags->pluck('tag')->toArray();
			 $model->colors = $model->product_colors->pluck('value')->toArray();
			 $model->sizes = $model->product_sizes->pluck('value')->toArray();
			 $model->lang = $model->content_langs->groupBy('lang')->map(function ($items) {
				 return $items->first();
			 });
			 $model->categories = $model->product_categories->map(function ($items) {
				 return $items->select('*','category_id as value')->first();
			 });;
 
			 return $model;
		 };
	 }
 

	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Product();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}		

		$dataArray['user_type'] = Customer::class;

		// Return the  object with the new data
    	$Object = Product::create($dataArray);

    	// Store Custom fields
    	isset($data['shipping']) ? $this->storeShipping(($data['shipping']), $Object) : '';
    	isset($data['content_langs']) ? $this->storeContent( ($data['content_langs']), $Object) : '';
    	isset($data['product_categories']) ? $this->storeCategories(($data['product_categories']), $Object) : '';
    	isset($data['product_fields']) ? $this->storeFields(($data['product_fields']), $Object) : '';
    	isset($data['colors']) ? $this->storeColors(($data['colors']), $Object) : '';
    	isset($data['sizes']) ? $this->storeSizes(($data['sizes']), $Object) : '';
    	isset($data['tags']) ? $this->storeTags(($data['tags']), $Object) : '';
    	isset($data['images']) ? $this->storeImages(($data['images']), $Object) : '';
    	isset($data['media']) ? $this->storeMedia(($data['media']), $Object) : '';
    	isset($data['variants']) ? $this->storeVariants(($data['variants']), $Object) : '';
    	isset($data['prices']) ? $this->storePrice(($data['prices']), $Object) : '';

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {
		// $data['product_id'] = null;
		// return $this->store($data);
		
		$Object = Product::find($data['product_id']);
		
		// Return the  object with the new data
    	$Object->update( (array) $data);

    	// Store Custom fields
    	isset($data['content_langs']) ? $this->storeContent( ($data['content_langs']), $Object) : '';
    	isset($data['product_fields']) ? $this->storeFields(($data['product_fields']), $Object) : '';
    	isset($data['product_categories']) ? $this->storeCategories(($data['product_categories']), $Object) : '';
    	isset($data['colors']) ? $this->storeColors(($data['colors']), $Object) : '';
    	isset($data['sizes']) ? $this->storeSizes(($data['sizes']), $Object) : '';
    	isset($data['tags']) ? $this->storeTags(($data['tags']), $Object) : '';
    	isset($data['images']) ? $this->storeImages(($data['images']), $Object) : '';
    	isset($data['media']) ? $this->storeMedia(($data['media']), $Object) : '';
    	isset($data['prices']) ? $this->storePrice(($data['prices']), $Object) : '';
    	isset($data['variants']) ? $this->storeVariants(($data['variants']), $Object) : '';
    	isset($data['shipping']) ? $this->storeShipping(($data['shipping']), $Object) : '';

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
			
			$delete = Product::find($id)->delete();

			if ($delete){
	
				Content::where('item_id', $id)->where('item_type', Product::class)->delete();
				ProductShipping::where('product_id', $id)->delete();
				ProductCategory::where('product_id', $id)->delete();
				ProductColor::where('product_id', $id)->delete();
				ProductSize::where('product_id', $id)->delete();
				ProductField::where('product_id', $id)->delete();
				ProductImage::where('product_id', $id)->delete();
				CustomField::where('model_id', $id)->where('model_type', Product::class)->where('code', 'variants')->delete();
				ProductTag::where('product_id', $id)->delete();
			}

			return true;

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}



	
	/**
	 * Product related Shipping
	 */
	public function storeShipping($data, $Object)
	{
		if ($data)
		{
			ProductShipping::where('product_id', $Object->product_id)->delete();
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['shipping_id'] = isset($value->shipping_id) ? $value->shipping_id : $value;	
				$fields['product_id'] = $Object->product_id;	

				$Model = ProductShipping::create($fields);
			}
		}
		return $Model ?? '';		
	}

	
	/**
	 * Product related categories
	 */
	public function storeCategories($data, $Object)
	{
		if ($data)
		{
			ProductCategory::where('product_id', $Object->product_id)->delete();
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['category_id'] = isset($value->category_id) ? $value->category_id : $value;	
				$fields['product_id'] = $Object->product_id;	

				$Model = ProductCategory::create($fields);
			}
		}

		return $Model ?? '';		
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
			$value = $value->toArray();
			Content::where('lang', $key)->where('item_id', $Object->product_id)->where('item_type', Product::class)->delete();
			$fields = ['title'=>'-'];
			if (isset($data[ $value['language_code'] ])) {
				$fields = (array) $data[$value['language_code']];
			}
			$fields['lang'] = $value['language_code'];
			$fields['item_id'] = $Object->product_id;	
			$fields['item_type'] = Product::class;	
			$fields['prefix'] = isset($fields['prefix']) ? Content::generatePrefix($fields['prefix']) : Content::generatePrefix( $fields['title']);	

			$Model = Content::create($fields);
		}

		return $Model ?? '';		
	}


	/**
	 * Store Product colors
	 */
	
	/**
	* Save product colors
	*
	* @param Array $data
	* @param Product $Object 
	*/
	public function storeColors($data, $Object) 
	{
		$clear = ProductColor::where('product_id', $Object->product_id)->delete();

		if ($data) {
			foreach ($data as $key => $value)
			{
				if ($value && $value != 'null')
				{
					$fields = [];
					$fields['product_id'] = $Object->product_id;	
					$fields['value'] = $value;
	
					$Model = ProductColor::create($fields);
				}
			}
	
			return $Model ?? '';		
		}
	}

	
	/**
	* Save product Sizes
	
	 * @param Array $data
	 * @param Product $Object 
	*/
	public function storeSizes($data, $Object) 
	{
		$clear = ProductSize::where('product_id', $Object->product_id)->delete();

		if ($data) {
			foreach ($data as $key => $value)
			{
				if ($value)
				{
					$fields = [];
					$fields['product_id'] = $Object->product_id;	
					$fields['value'] = $value;
	
					$Model = ProductSize::create($fields);
				}
			}
	
			return $Model ?? '';		
		}
	}


		
	/**
	* Save product Images
	
	 * @param Array $data
	 * @param Product $Object 
	*/
	public function storeImages($data, $Object) 
	{
		$clear = ProductImage::where('product_id', $Object->product_id)->delete();

		if ($data) {
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['product_id'] = $Object->product_id;	
				$fields['path'] = $value->path;
				$fields['sort'] = $key;

				$Model = ProductImage::create($fields);
			}
	
			return $Model ?? '';		
		}
	}

 
	
	/**
	* Save product Tags
	
	 * @param Array $data
	 * @param Product $Object 
	*/
	public function storeTags($data, $Object) 
	{
		$clear = ProductTag::where('product_id', $Object->product_id)->delete();

		if ($data) {
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['product_id'] = $Object->product_id;	
				$fields['tag'] = $value;

				$Model = ProductTag::create($fields);
			}
	
			return $Model ?? '';		
		}
	}

	
	/**
	* Save product fields
	
	 * @param Array $data
	 * @param Product $Object 
	*/
	public function storeFields($data, $Object) 
	{
		$clear = ProductField::where('product_id', $Object->product_id)->delete();

		if ($data) {
			
			$fields = (array) $data;
			$fields['product_id'] = $Object->product_id ;	

			$Model = ProductField::create($fields);
	
			return $Model ?? '';		
		}
	}
	
	/**
	 * Save product Variants
	 * 
	 * @param Array $data
	 * @param Product $Object 
	*/
	public function storeVariants($data, $Object) 
	{
		$clear = CustomField::where('model_id', $Object->product_id)->where('model_type', Product::class)->where('code', 'variants')->delete();

		if ($data) {
			
			foreach ($data as $key => $value)
			{
				$value = (array) $value;
				if (isset($value['title'])) {
					$fields = [];
					$fields['model_id'] = $Object->product_id;	
					$fields['model_type'] = Product::class;	
					$fields['code'] = 'variants';
					$fields['title'] = $value['title'];
					$fields['value'] = $value['value'];

					$Model = CustomField::create($fields);
				}
			}
	
			return $Model ?? '';		
		}
	}

 
}