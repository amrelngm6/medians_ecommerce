<?php

namespace Medians\Categories\Domain;

use Shared\dbaser\CustomModel;

use Medians\Content\Domain\Content;
use Medians\Products\Domain as Products;

class Category extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'categories';

    protected $primaryKey = 'category_id';

	public $fillable = [
		'name',
		'description',
		'picture',
		'model',
		'parent_id',
		'template',
		'status',
	];


	public $appends = ['content_langs', 'lang_content','name', 'class_name'];

	public function getClassNameAttribute()
	{
		return 'Category';
	} 

	public function getNameAttribute()
	{
		return isset($this->lang_content->title) ? $this->lang_content->title : '';
	} 

	public function getContentLangsAttribute()
	{
		return $this->langs->keyBy('lang');
	} 

	public function getLangContentAttribute()
	{
		$lng = curLng();
		return isset($this->content_langs[$lng]) ? $this->content_langs[$lng] : null;
	} 

	public function getFields()
	{
		return $this->fillable;
	}

	public static function byModel($Model)
	{
		return Category::where('model', $Model)->where('status', 'on')->get();
	}


	public function parent()
	{
		return $this->hasOne(Category::class, 'category_id', 'parent_id');
	}

	public function childs()
	{
		return $this->hasMany(Category::class, 'parent_id', 'category_id');
	}

	public function products()
	{
		return $this->hasMany(Products\Product::class, 'category_id', 'category_id');
	}

	public function colors()
	{
		return Products\ProductColor::groupBy('value')->get();
	}

	public function sizes()
	{
		return Products\ProductSize::groupBy('value')->get();
	}

	public function brands()
	{
		return Products\ProductField::with('brand')->groupBy('brand_id')->get();
	}

	public function langs() 
	{
		return $this->morphMany(Content::class , 'item')->groupBy('lang');	
	}
	
}
