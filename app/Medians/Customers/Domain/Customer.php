<?php

namespace Medians\Customers\Domain;

use Shared\dbaser\CustomModel;
use Medians\Locations\Domain\RouteLocation;
use Medians\CustomFields\Domain\CustomField;


class Customer extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'customers';

	protected $primaryKey = 'customer_id';

	public $fillable = [
		'name',
		'email',
		'mobile',
		'picture',
		'gender',
		'birth_date',
		'generated_password',
		'password',
		'status'
	];



	public $appends = [ 'photo', 'not_removeable', 'field'];

	public function getFieldAttribute()
	{
		return !empty($this->custom_fields) ? array_column($this->custom_fields->toArray(), 'value', 'code') : [];
	}

	public function custom_fields()
	{
		return $this->morphMany(CustomField::class, 'model');
	}

	public function getNotRemoveableAttribute() 
	{
		return true;
	}

	public function getPhotoAttribute() : ?String
	{
		return !empty($this->picture) ? $this->picture : '/uploads/images/default_profile.png';
	}


	public function getFields()
	{
		return $this->fillable;
	}

    public function route_locations()
    {
        return $this->morphMany(RouteLocation::class, 'notifiable');
    }

    public function route_location()
    {
        return $this->morphOne(RouteLocation::class, 'notifiable');
    }


    public function receiverAsCustomer()
    {
		return  $this;
    }
	
}
