<?php

namespace Medians\Cart\Domain;

use Shared\dbaser\CustomModel;

use Medians\Products\Domain\Product;

class Wishlist extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'wishlist';

    protected $primaryKey = 'wishlist_id';

	public $fillable = [
		'item_id',
		'item_type',
		'customer_id',
		'session_id',
	];

	public function getFields()
	{
		return $this->fillable;
	}

	public function item()
	{
        return $this->morphTo();
	}


}
