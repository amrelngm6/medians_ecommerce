<?php

namespace Medians\Transactions\Domain;


use Shared\dbaser\CustomModel;

use Medians\Users\Domain\User;
use Medians\Branches\Domain\Branch;
use Medians\Packages\Domain\PackageSubscription;
use Medians\CustomFields\Domain\CustomField;
use Medians\Invoices\Domain\Invoice;

class Transaction extends CustomModel
{


	/**
	* @var String
	*/
	protected $table = 'transactions';

	protected $primaryKey = 'transaction_id';

	/**
	* @var Array
	*/
	public $fillable = [
		'transaction_id'	
		,'invoice_id'
		,'model_id'	
		,'model_type'	
		,'item_id'	
		,'item_type'	
		,'payment_method'	
		,'amount'	
		,'date'	
		,'status'	
		,'notes'
		,'created_by'
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
	
    public function model()
    {
        return $this->morphTo();
    }

    public function item()
    {
        return $this->morphTo();
    }

	

	public function invoice()
	{
		return $this->hasOne(Invoice::class, 'invoice_id', 'invoice_id');
	}


}
