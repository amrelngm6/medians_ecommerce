<?php

namespace Medians\Packages\Domain;

use Shared\dbaser\CustomModel;

/**
 * Subscription class database queries
 */
class Package extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'packages';

    protected $primaryKey = 'package_id';

	protected $fillable = [
		'name',
		'description',
    	'status',
    	'created_by',
	];

    public $appends = ['field'];

	public function getFieldAttribute()
	{
		return !empty($this->custom_fields) ? array_column($this->custom_fields->toArray(), 'value', 'code') : [];
	}

	public function custom_fields()
	{
		return $this->morphMany(CustomField::class, 'model');
	}


}
