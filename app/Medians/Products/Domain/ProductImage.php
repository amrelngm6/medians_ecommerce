<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;


class ProductImage extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'product_images';

    protected $primaryKey = 'image_id';
	
	public $fillable = [
		'product_id',
		'path',
		'sort',
	];

}
