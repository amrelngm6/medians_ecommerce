<?php

namespace Medians\Channels\Domain;

use Shared\dbaser\CustomModel;

use Medians\Likes\Domain\Like;
use Medians\Comments\Domain\Comment;

class Channel extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'channels';

    protected $primaryKey = 'channel_id';

	public $fillable = [
		'name',
		'description',
		'picture',
		'cover',
		'customer_id',
		'status'
	];



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
		return $this->hasOne(StationMedia::class, 'station_id', 'station_id')->with('media');	
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
