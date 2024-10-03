<?php

namespace Medians\Categories\Domain;

use Shared\dbaser\CustomModel;
use Medians\Content\Domain\Content;

class VideoGenre extends Category
{

	/*
	/ @var String
	*/


	public $appends = ['content_langs', 'lang_content','name', 'class_name','picture_name'];

	
	public function getPictureNameAttribute() 
	{
		$e = $this->picture ? explode('/', $this->picture) : [];
		return end($e);
	}
	

	public function getClassNameAttribute()
	{
		return 'VideoGenre';
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


	public static function byModel($Model)
	{
		return VideoGenre::where('model', VideoGenre::class)->where('status', 'on')->get();
	}
	

	public function langs() 
	{
		return $this->morphMany(Content::class , 'item')->groupBy('lang');	
	}
}
