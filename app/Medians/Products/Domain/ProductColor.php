<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;


class ProductColor extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'product_colors';

    protected $primaryKey = 'color_id';
	
	public $fillable = [
		'product_id',
		'value',
	];

}
