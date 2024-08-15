<?php

namespace Medians\Cart\Domain;

use Shared\dbaser\CustomModel;

use Medians\Products\Domain\Product;

class Compare extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'compare';

    protected $primaryKey = 'compare_id';

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
