<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;


class ProductStock extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'product_stock';

    protected $primaryKey = 'stock_id';
	
	public $fillable = [
		'product_id',
		'qty',
		'type',
		'date',
		'created_by',
	];


	/**
	 * Relations with onother Models
	 */
	public function product() 
	{
		return $this->hasOne(Product::class , 'product_id', 'product_id');	
	}
	
}
