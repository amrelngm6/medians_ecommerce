<?php

namespace Medians\Orders\Domain;


use Shared\dbaser\CustomModel;

use Medians\Users\Domain\User;
use Medians\CustomFields\Domain\CustomField;
use Medians\Transactions\Domain\Transaction;
use Medians\Invoices\Domain\Invoice;

class Order extends CustomModel
{


	/**
	* @var String
	*/
	protected $table = 'orders';

	protected $primaryKey = 'order_id';

	/**
	* @var Array
	*/
	public $fillable = [
		'customer_id'	
		,'customer_type'	
		,'shipping_amount'	
		,'total_discount'	
		,'tax_amount'	
		,'subtotal'	
		,'total_amount'	
		,'date'	
		,'status'	
		,'notes'
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
	
    public function customer()
    {
        return $this->morphTo();
    }


	public function items()
	{
		return $this->hasMany(OrderItem::class, 'order_id', 'order_id')->with('item');
	}

	public function item()
	{
		return $this->hasOne(OrderItem::class, 'order_id', 'order_id')->with('item');
	}

	public function invoice()
	{
		return $this->hasOne(Invoice::class, 'order_id', 'order_id')->with('items');
	}



}
