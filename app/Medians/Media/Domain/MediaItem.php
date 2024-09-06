<?php

namespace Medians\Media\Domain;

use Medians\Categories\Domain\Category;
use Medians\Content\Domain\Content;
use Medians\Reviews\Domain\Review;
use Medians\CustomFields\Domain\CustomField;
use Shared\dbaser\CustomModel;


class MediaItem extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'media_items';

    protected $primaryKey = 'media_id';
	
	public $fillable = [
		'name',
		'description',
		'picture',
		'author_id',
		'model_class',
		'status',
		'created_by',
	];

	public $appends = ['content_langs', 'lang_content', 'field'];

	
	public function getFieldAttribute() 
	{
		return !empty($this->custom_fields) ? array_column($this->custom_fields->toArray(), 'value', 'code') : [];
	}


	public function getNameAttribute()
	{
		return $this->lang_content->title ?? '';
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
		return $this->hasOne(Category::class , 'category_id', 'category_id')->where('model', MediaItem::class)->with('parent');	
	}
	 
	public function media_categories() 
	{
		return $this->hasManyThrough(Category::class, MediaItemCategory::class, 'media_id', 'category_id', 'media_id', 'category_id');	
	}

	public function media_tags() 
	{
		return $this->hasMany(MediaItemTag::class , 'media_id', 'media_id');	
	}
	
	public function custom_fields()
	{
		return $this->morphMany(CustomField::class, 'model');
	}

	public function files() 
	{
		return $this->hasMany(MediaFile::class , 'media_id', 'media_id');	
	}
	
	public function main_file() 
	{
		return $this->hasOne(MediaFile::class , 'media_id', 'media_id');	
	}
	
	public function related($limit = null) 
	{
		return $this->with('media_categories','media_tags')
		->whereHas('lang_content', function($q) {
			$q
			->where('title', 'LIKE', '%'.str_replace(' ', '%', $this->lang_content->title).'%')
			->orWhere('content', 'LIKE', '%'.str_replace(' ', '%', $this->lang_content->title).'%');
		})
		->where('media_id', '!=' , $this->media_id)
		->limit($limit ?? 6)
		->get();	
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
	
	public function rate() 
	{
		return $this->reviews->avg('rate');	
	}
	
}
