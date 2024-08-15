<?php

namespace Medians\Payments\Domain;


use Shared\dbaser\CustomModel;

use Medians\Users\Domain\User;
use Medians\Invoices\Domain\Invoice;
use Medians\Plans\Domain\PlanSubscription;

class Payment extends CustomModel
{


	/**
	* @var String
	*/
	protected $table = 'payments';

	protected $primaryKey = 'payment_id';

	/**
	* @var Array
	*/
	public $fillable = [
		'invoice_id',
		'amount',
		'model_id',
		'model_type',
		'date',
		'payment_method',
		'payment_code',
		'created_by',
	];


	public function getFields()
	{
		return $this->fillable;
	}

	public function plan_subscription()
	{
		return $this->hasOne(PlanSubscription::class, 'subscription_id', 'model_id');
	}

	public function user()
	{
		return $this->hasOne(User::class, 'id', 'created_by');
	}
	
	public function invoice()
	{
		return $this->hasOne(Invoice::class, 'invoice_id', 'invoice_id');
	}


}
