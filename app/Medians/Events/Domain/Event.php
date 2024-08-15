<?php

namespace Medians\Events\Domain;

use Shared\dbaser\CustomModel;
use Medians\Users\Domain\User;

class Event extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'events';

    protected $primaryKey = 'event_id';
	
	public $fillable = [
		'title',
		'description',
		'picture',
		'status',
		'created_by',
	];

	public $appends = ['date', 'short_date', 'last_update'];

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
	
	public function getFields()
	{
		return $this->fillable;
	}
	
	
}
