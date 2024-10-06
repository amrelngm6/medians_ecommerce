<?php

namespace Medians\Channels\Domain;

use Shared\dbaser\CustomModel;

use Medians\Likes\Domain\Like;
use Medians\Comments\Domain\Comment;
use Medians\Views\Domain\View;
use Medians\Customers\Domain\Customer;

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
		return $this->hasMany(ChannelMedia::class, 'channel_id', 'channel_id')->with('media');	
	}

	public function activeItem()
	{
		return $this->hasOne(ChannelMedia::class, 'channel_id', 'channel_id')->with('media');	
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
	
	public function viewscount() 
	{
		return $this->morphMany(View::class , 'item')->sum('times');	
	}
	
	public function commentscount() 
	{
		return $this->morphMany(Comment::class , 'item')->count();	
	}
	
	public function likescount() 
	{
		return $this->morphMany(Like::class , 'item')->count();	
	}


}
