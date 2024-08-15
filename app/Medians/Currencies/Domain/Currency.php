<?php

namespace Medians\Currencies\Domain;

use Shared\dbaser\CustomModel;

/**
 * Transaction class database queries
 */
class Currency extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'currencies';

    protected $primaryKey = 'currency_id';

	protected $fillable = [
    	'name',
    	'code',
		'symbol',
		'main',
		'last_check',
    	'ratio',
	];

	public $appends = ['title'];

	public function getTitleAttribute()
	{
		return $this->name.' ('.$this->symbol.')';
	}


	
}
