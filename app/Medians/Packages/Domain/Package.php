<?php

namespace Medians\Packages\Domain;

use Shared\dbaser\CustomModel;
use Medians\CustomFields\Domain\CustomField;

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
    	'payment_type',
    	'cost_month',
    	'cost_quarter',
    	'cost_year',
    	'status',
    	'created_by',
	];

    public $appends = ['feature'];

	public function getFeatureAttribute()
	{
		return !empty($this->features) ? array_column($this->features->toArray(), 'value', 'code') : [];
	}

	public function features()
	{
		return $this->hasMany(PackageFeature::class, 'package_id', 'package_id');
	}


}
