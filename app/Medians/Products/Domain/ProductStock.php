<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;


class ProductStock extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'products_stock';

    protected $primaryKey = 'stock_id';
	
	public $fillable = [
		'product_id',
		'qty',
		'type',
		'purchase_price',
		'created_by',
		'status',
	];


	/**
	 * Relations with onother Models
	 */
	public function product() 
	{
		return $this->hasOne(Product::class , 'product_id', 'product_id');	
	}
	
}
