<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;


class ProductPrice extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'product_prices';

    protected $primaryKey = 'price_id';
	
	public $fillable = [
		'product_id',
		'size_id',
		'color_id',
		'price',
	];

}
