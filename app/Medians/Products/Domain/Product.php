<?php

namespace Medians\Products\Domain;

use Medians\Categories\Domain\Category;
use Medians\Shipping\Domain\Shipping;
use Medians\Content\Domain\Content;
use Medians\Reviews\Domain\Review;
use Medians\Brands\Domain\Brand;
use Medians\Orders\Domain\OrderItem;
use Medians\CustomFields\Domain\CustomField;
use Shared\dbaser\CustomModel;


class Product extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'products';

    protected $primaryKey = 'product_id';
	
	public $fillable = [
		'name',
		'description',
		'old_price',
		'price',
		'picture',
		'category_id',
		'user_type',
		'user_id',
		'status',
	];

	public $appends = ['content_langs', 'lang_content','class_name'];

	public function getClassNameAttribute()
	{
		return 'Product';
	} 

	public function getContentLangsAttribute()
	{
		return $this->langs->keyBy('lang');
	} 


	public function getLangContentAttribute()
	{
		$lng = curLng();
		return isset($this->content_langs[$lng]) ? $this->content_langs[$lng] : [];
	} 


	/**
	 * Relations with onother Models
	 */
	public function category() 
	{
		return $this->hasOne(Category::class , 'category_id', 'category_id')->where('model', Product::class)->with('parent');	
	}
	 
	public function shipping() 
	{
		return $this->hasManyThrough(Shipping::class, ProductShipping::class, 'product_id', 'shipping_id', 'product_id', 'shipping_id');	
	}

	public function product_categories() 
	{
		return $this->hasManyThrough(Category::class, ProductCategory::class, 'product_id', 'category_id', 'product_id', 'category_id');	
	}

	public function product_colors() 
	{
		return $this->hasMany(ProductColor::class , 'product_id', 'product_id');	
	}
	

	public function product_sizes() 
	{
		return $this->hasMany(ProductSize::class , 'product_id', 'product_id');	
	}
	

	public function product_tags() 
	{
		return $this->hasMany(ProductTag::class , 'product_id', 'product_id');	
	}
	
	public function variants() 
	{
		return $this->morphMany(CustomField::class , 'model')->where('code', 'variants');	
	}
	

	public function images() 
	{
		return $this->hasMany(ProductImage::class , 'product_id', 'product_id');	
	}
	
	public function related() 
	{
		return $this->with('product_colors', 'product_sizes', 'images', 'product_categories', 'product_fields', 'product_tags', 'shipping','variants')
		->whereHas('lang_content', function($q) {
			$q->where('item_id', '!=', $this->product_id)->where('title', 'LIKE', '%'.str_replace(' ', '%', $this->lang_content->title).'%');
		})
		->where('product_id', '!=' , $this->product_id)
		->get();	
	}
	
	public function product_fields() 
	{
		return $this->hasOne(ProductField::class , 'product_id', 'product_id');	
	}
	
	public function brand() 
	{
		return $this->hasOneThrough(Brand::class, ProductField::class, 'product_id', 'brand_id', 'product_id', 'brand_id');	
	}
	
	public function langs() 
	{
		return $this->morphMany(Content::class , 'item')->groupBy('lang');	
	}
	
	public function lang_content() 
	{
		return $this->morphOne(Content::class , 'item')->where('lang', curLng());	
	}
	
	public function reviews() 
	{
		return $this->morphMany(Review::class , 'item')->where('status', 'on');	
	}
	
	public function orders() 
	{
		return $this->morphMany(OrderItem::class , 'item');	
	}
	
	public function rate() 
	{
		return $this->reviews->avg('rate');	
	}
	
	public function tax_amount() 
	{
		$taxAmount = $this->product_fields->tax_amount;
		$taxType = $this->product_fields->tax_type;
		if ($taxAmount > 0)
		{
			return ($taxType == 'percent' ? ($this->price * ($taxAmount / 100)) : ($taxAmount) );
		}
		return 0;
	}

}
