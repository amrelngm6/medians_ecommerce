<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;


class ProductShipping extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'product_shipping';

    protected $primaryKey = 'product_shipping_id';
	
	public $fillable = [
		'product_id',
		'shipping_id',
	];

}
