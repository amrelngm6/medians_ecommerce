<?php

namespace Medians\Settings\Domain;

use Shared\dbaser\CustomModel;
use Medians\Currencies\Domain\Currency;



class SystemSettings extends CustomModel 
{

	/*
	/ @var String
	*/
	protected $table = 'system_settings';


	protected $fillable = [
    	'code',
    	'value',
    	'created_by',
	];

	// public $timestamps = false;


	public function currency()
	{
		return $this->hasOne(Currency::class, 'code', 'value');
	}

}
