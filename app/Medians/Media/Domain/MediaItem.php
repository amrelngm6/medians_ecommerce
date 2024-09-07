<?php

namespace Medians\Media\Domain;

use Medians\Views\Domain\View;
use Medians\Categories\Domain\Genre;
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
	 
	public function genres() 
	{
		return $this->belongsToMany(Genre::class, MediaGenre::class, 'media_id', 'genre_id');	
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
		
		$query = MediaItem::query();
		
		print_r(explode(' ', $this->name));
		
        foreach (explode(' ', $this->name) as $word) {
			$query->where('name', 'LIKE', '%' . $word . '%')
			->where('media_id', '!=' , $this->media_id)
			->orWhere('description', 'LIKE', '%' . $word . '%')
			->where('media_id', '!=' , $this->media_id);

        }


		return $query->with('genres','main_file')
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
	
	public function views() 
	{
		return $this->morphMany(View::class , 'item');	
	}
	
	public function rate() 
	{
		return $this->reviews->avg('rate');	
	}
	
}
