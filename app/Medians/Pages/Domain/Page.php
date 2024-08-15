<?php

namespace Medians\Pages\Domain;

use Shared\dbaser\CustomModel;

use Medians\Content\Domain\Content;
use Medians\Menus\Domain\Menu;
use Medians\CustomFields\Domain\CustomField;

class Page extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'pages';

    protected $primaryKey = 'page_id';

	public $fillable = [
		'title', 
		'prefix', 
		'homepage', 
		'status', 
		'created_by', 
	];


	public $appends = ['photo','field','name', 'data','content_langs'];



	public function getContentLangsAttribute()
	{
		return $this->langs->keyBy('lang');
	} 

	public function getDataAttribute() 
	{
		return isset($this->content->content) ? $this->content->content : ''; 
	}

	public function getFieldAttribute() 
	{
		return !empty($this->custom_fields) ? array_column($this->custom_fields->toArray(), 'value', 'code') : [];
	}

	public function getNameAttribute() : ?String
	{
		return isset($this->content->title) ? $this->content->title : $this->title;
	}

	public function getPhotoAttribute() : ?String
	{
		return $this->photo();
	}


	public function photo() : String
	{
		return !empty($this->picture) ? $this->picture : '/uploads/images/default_profile.png';
	}

	public function getFields()
	{
		return $this->fillable;
	}

	public function lang_content()
	{
		return $this->morphOne(Content::class, 'item')->where('lang',$_SESSION['lang']);
	}

	// public function lang_content()
	// {
	// 	return $this->morphOne(Content::class, 'item');
	// }

	public function langs() 
	{
		return $this->morphMany(Content::class , 'item')->groupBy('lang');	
	}
	
	public function menu()
	{
		return $this->hasOne(Menu::class, 'page_id', 'page_id');
	}

	public function custom_fields()
	{
		return $this->morphMany(CustomField::class, 'model');
	}




}
