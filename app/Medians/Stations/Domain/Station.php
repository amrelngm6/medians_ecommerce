<?php

namespace Medians\Stations\Domain;

use Shared\dbaser\CustomModel;

use Medians\Likes\Domain\Like;
use Medians\Comments\Domain\Comment;
use Medians\Customers\Domain\Customer;

class Station extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'stations';

    protected $primaryKey = 'station_id';

	public $fillable = [
		'name',
		'description',
		'picture',
		'customer_id',
		'status'
	];

	public $appends = ['picture_name'];


	public function getPictureNameAttribute() 
	{
		$e = $this->picture ? explode('/', $this->picture) : [];
		return end($e);
	}

	public function getFields()
	{
		return $this->fillable;
	}

	public function items()
	{
		return $this->hasMany(StationMedia::class, 'station_id', 'station_id')->with('media');	
	}

	public function activeItem()
	{
		// return $this->hasOne(StationMedia::class, 'station_id', 'station_id')->with('media')->where('start_at', '<=', date('H:i:s'))->orderBy('start_at', 'DESC');	
		return $this->hasOne(StationMedia::class, 'station_id', 'station_id')->with('media');	
	}

	public function customer()
	{
		return $this->hasOne(Customer::class, 'customer_id', 'customer_id');	
	}

	public function likes()
	{
		return $this->morphMany(Like::class, 'item');	
	}

	public function comments()
	{
		return $this->morphMany(Comment::class, 'item')->orderBy('comment_id', 'DESC');	
	}

	public function liked($customer_id) 
	{
		return $this->morphOne(Like::class , 'item')->where('customer_id', $customer_id);	
	}
	
}
