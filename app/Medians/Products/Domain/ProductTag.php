<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;


class ProductTag extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'product_tags';

    protected $primaryKey = 'tag_id';
	
	public $fillable = [
		'product_id',
		'tag',
	];

}
