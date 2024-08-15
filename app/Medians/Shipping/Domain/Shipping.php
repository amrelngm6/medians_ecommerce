<?php

namespace Medians\Shipping\Domain;

use Shared\dbaser\CustomModel;
use \Medians\Products\Domain\ProductShipping;


class Shipping extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'shipping';

    protected $primaryKey = 'shipping_id';

	public $fillable = [
		'name',
		'days',
		'price',
		'status',
	];



	public function getFields()
	{
		return $this->fillable;
	}

	public function items() 
	{
		return $this->hasMany(ProductShipping::class, 'shipping_id', 'shipping_id');	
	}
	
}
