<?php

namespace Medians\Channels\Domain;

use Shared\dbaser\CustomModel;

use Medians\Devices\Domain\Device;
use Medians\Products\Domain\Product;

class Channel extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'channels';

    protected $primaryKey = 'channel_id';

	public $fillable = [
		'name',
		'description',
		'picture',
		'cover',
		'customer_id',
		'status'
	];



	public function getFields()
	{
		return $this->fillable;
	}

	public function items()
	{
		return $this->morphTo();	
	}

}
