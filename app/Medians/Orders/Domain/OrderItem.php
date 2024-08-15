<?php

namespace Medians\Orders\Domain;


use Shared\dbaser\CustomModel;

use Medians\Users\Domain\User;
use Medians\CustomFields\Domain\CustomField;

class OrderItem extends CustomModel
{


	/**
	* @var String
	*/
	protected $table = 'order_items';

	protected $primaryKey = 'order_item_id';

	/**
	* @var Array
	*/
	public $fillable = [
		'order_id'	
		,'item_id'	
		,'item_type'	
		,'quantity'	
		,'subtotal'	
		,'tax_amount'	
		,'total_amount'	
		,'discount_amount'	
		,'status'	
		,'color'	
		,'size'	
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


	public function getFields()
	{
		return $this->fillable;
	}
	
    public function item()
    {
        return $this->morphTo();
    }


}
