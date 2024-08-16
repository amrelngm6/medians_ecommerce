<?php

namespace Medians\Branches\Domain;


use Shared\dbaser\CustomModel;

class Branch extends CustomModel
{


	/**
	* @var String
	*/
	protected $table = 'branches';

	/**
	* @var Array
	*/
	protected $fillable = [
    	'name',
    	'address',
    	'phone',
    	'info',
		'latitude',
		'longitude',
    	'status'
	];

	public $timestamps = null;
		

}
