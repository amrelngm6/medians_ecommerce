<?php

namespace Medians\Hooks\Domain;

use Shared\dbaser\CustomModel;

class Hook extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'hooks';

	public $fillable = [
		'title', 'position', 'plugin', 'plugin_class', 'content', 'pages', 'order', 'langs', 'status', 
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

	


}
