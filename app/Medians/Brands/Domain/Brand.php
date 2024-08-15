<?php

namespace Medians\Brands\Domain;

use Shared\dbaser\CustomModel;

use Medians\Devices\Domain\Device;
use Medians\Products\Domain\Product;

class Brand extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'brands';

    protected $primaryKey = 'brand_id';

	public $fillable = [
		'name',
		'description',
		'picture',
		'status',
	];



	public function getFields()
	{
		return $this->fillable;
	}

}
