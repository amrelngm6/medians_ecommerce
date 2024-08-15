<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;


class ProductSize extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'product_sizes';

    protected $primaryKey = 'size_id';
	
	public $fillable = [
		'product_id',
		'value',
	];

}
