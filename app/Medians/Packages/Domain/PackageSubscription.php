<?php

namespace Medians\Packages\Domain;

use Shared\dbaser\CustomModel;

use Medians\Customers\Domain\StudentApplicant;
use Medians\CustomFields\Domain\CustomField;

/**
 * Subscription class database queries
 */
class PackageSubscription extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'package_subscriptions';

    protected $primaryKey = 'subscription_id';

	protected $fillable = [
    	'package_id',
		'customer_id',
        'start_date',
        'end_date',
        'payment_type',
        'payment_status',
        'total_cost',
        'notes',
	];

    public $appends = ['is_paid', 'is_valid','name', 'field'];

    
	public function getIsValidAttribute()
	{
		return (strtotime(date("Y-m-d")) >= strtotime($this->end_date)) ? true : false;
	}
    
	public function getFieldAttribute()
	{
		return !empty($this->custom_fields) ? array_column($this->custom_fields->toArray(), 'value', 'code') : [];
	}

	public function custom_fields()
	{
		return $this->morphMany(CustomField::class, 'model');
	}

    public function getNameAttribute()
    {
        return isset($this->package->name) ? $this->package->name : '';
    }

    public function getIsPaidAttribute()
    {
        return $this->payment_status == 'paid' ? true : null;
    }

    public function model()
    {
        return $this->morphTo();
    }

    public function package()
    {
        return $this->hasOne(Package::class, 'package_id', 'package_id');
    }

    public function customer()
    {
        return $this->hasOne(Customer::class, 'package_id', 'package_id');
    }


}
