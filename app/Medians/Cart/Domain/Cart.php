<?php

namespace Medians\Cart\Domain;

use Shared\dbaser\CustomModel;

use Medians\Products\Domain\Product;

class Cart extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'cart';

    protected $primaryKey = 'cart_id';

	public $fillable = [
		'item_id',
		'item_type',
		'qty',
		'size',
		'color',
		'customer_id',
		'session_id',
	];

	public $appends = ['price'];

	public function getPriceAttribute()
	{
		return $this->item->price * $this->qty;
	}

	public function getFields()
	{
		return $this->fillable;
	}

	public function item()
	{
        return $this->morphTo()->with('product_fields');
	}


}
