<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;


class ProductMedia extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'product_media';

    protected $primaryKey = 'media_id';
	
	public $fillable = [
		'product_id',
		'type',
		'path',
		'sort',
	];

}
