<?php

namespace Medians\Hooks\Domain;

use Shared\dbaser\CustomModel;
use Medians\Content\Domain\Content;

class Hook extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'hooks';

	public $fillable = [
		 'position', 'plugin', 'status', 
	];


	public $appends = ['field'];


	public function getFieldAttribute() 
	{
		return !empty($this->custom_fields) ? array_column($this->custom_fields->toArray(), 'value', 'code') : [];
	}


	public function getFields()
	{
		return $this->fillable;
	}

	
	public function lang_content()
	{
		return $this->morphOne(Content::class, 'item')->where('lang',$_SESSION['lang']);
	}


}
