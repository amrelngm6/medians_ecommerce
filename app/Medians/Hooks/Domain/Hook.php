<?php

namespace Medians\Hooks\Domain;

use Shared\dbaser\CustomModel;
use Medians\Content\Domain\Content;
use Medians\Plugins\Domain\Plugin;

class Hook extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'hooks';

	public $fillable = [
		 'position', 'plugin', 'status', 
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

	public function getFields()
	{
		return $this->fillable;
	}

	
	public function langs() 
	{
		return $this->morphMany(Content::class , 'item')->groupBy('lang');	
	}
	
	
	public function plugin_object() 
	{
		return $this->hasOne(Plugin::class , 'class', 'plugin');	
	}
	
	public function hookPlugin() 
	{
		return class_exists($this->plugin) ? $this->plugin : null;	
	}
	

}
