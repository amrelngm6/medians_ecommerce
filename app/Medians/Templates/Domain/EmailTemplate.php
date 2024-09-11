<?php

namespace Medians\Templates\Domain;

use Shared\dbaser\CustomModel;

use Medians\Content\Domain\Content;
use Medians\Menus\Domain\Menu;
use Medians\CustomFields\Domain\CustomField;

class EmailTemplate extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'email_templates';

    protected $primaryKey = 'template_id';

	public $fillable = [
		'title', 
		'status', 
		'created_by', 
	];


	public function content()
	{
		return $this->morphOne(Content::class, 'item');
	}

	public function langs_content()
	{
		return $this->morphMany(Content::class, 'item');
	}

	public function custom_fields()
	{
		return $this->morphMany(CustomField::class, 'model');
	}




}
