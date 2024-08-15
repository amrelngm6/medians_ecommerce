<?php

namespace Medians\Help\Domain;

use Shared\dbaser\CustomModel;
use Medians\Users\Domain\User;
use Medians\Customers\Domain\Customer;

class HelpMessageComment extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'help_message_comments';

    protected $primaryKey = 'comment_id';
	
	public $fillable = [
		'user_id',
		'user_type',
		'message_id',
		'comment',
	];
	
	public $appends = ['date', 'short_date', 'receiver'];
	
	public function getShortDateAttribute()
	{
		$date = date('Y-m-d', strtotime($this->created_at));
		return date( ($date == date('Y-m-d')) ? 'H:i' : 'M d, H:i'  , strtotime($this->created_at));
	}


	public function getReceiverAttribute()
	{
		// return null;
		return $this->message->user;
	}

	public function getDateAttribute()
	{
		return date('Y-m-d H:i', strtotime($this->created_at));
	}

	
	/**
	 * Relations with onother Models
	 */
    public function message() {
        return $this->hasOne(HelpMessage::class, 'message_id', 'message_id');
    }

    public function user() {
        return $this->morphTo();
    }

	public function getFields()
	{
		return $this->fillable;
	}
	
	
	public function receiverAsCustomer() 
	{
		return $this->message->where('user_type', Customer::class)->user;
	}

	public function receiverAsUser() 
	{
	}

}
