<?php

namespace Medians\Reviews\Domain;

use Shared\dbaser\CustomModel;

use Medians\Devices\Domain\Device;
use Medians\Products\Domain\Product;

class Review extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'reviews';

    protected $primaryKey = 'review_id';

	public $fillable = [
		'name',
		'email',
		'user_id',
		'comment',
		'rate',
		'item_id',
		'item_type',
		'status'
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
