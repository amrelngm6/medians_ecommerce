<?php

namespace Medians\Help\Domain;

use Shared\dbaser\CustomModel;
use Medians\Users\Domain\User;
use Medians\Customers\Domain\Customer;

class HelpMessage extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'help_messages';

    protected $primaryKey = 'message_id';
	
	public $fillable = [
		'user_id',
		'user_type',
		'title',
		'subject',
		'message',
		'priority',
		'status',
	];

	public $appends = ['name', 'date', 'short_date', 'last_update'];

	public function getShortDateAttribute()
	{
		$date = date('Y-m-d', strtotime($this->created_at));
		return date( ($date == date('Y-m-d')) ? 'H:i' : 'M d, H:i'  , strtotime($this->created_at));
	}

	public function getDateAttribute()
	{
		return date('Y-m-d H:i', strtotime($this->created_at));
	}
	public function getLastUpdateAttribute()
	{
		return date('Y-m-d H:i', strtotime($this->updated_at));
	}
	public function getNameAttribute()
	{
	}

	
	
    public function user() {
        return $this->morphTo();
    }

	public function getFields()
	{
		return $this->fillable;
	}
	
	public function comments() 
	{
    	return $this->hasMany(HelpMessageComment::class, 'message_id', 'message_id')->with('user');
	}

	public function receiverAsCustomer() 
	{
		return $this->where('user_type', Customer::class)->user;
	}

	public function receiverAsUser() 
	{
	}

	
}
