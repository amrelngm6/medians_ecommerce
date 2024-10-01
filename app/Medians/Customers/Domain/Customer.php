<?php

namespace Medians\Customers\Domain;

use Shared\dbaser\CustomModel;
use Medians\Followers\Domain\Follower;
use Medians\CustomFields\Domain\CustomField;
use Medians\Media\Domain\MediaItem;
use Medians\Playlists\Domain\Playlist;
use Medians\Likes\Domain\Like;


class Customer extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'customers';

	protected $primaryKey = 'customer_id';

	public $fillable = [
		'name',
		'email',
		'mobile',
		'picture',
		'gender',
		'birth_date',
		'generated_password',
		'password',
		'status'
	];



	public $appends = [ 'photo', 'not_removeable', 'field','picture_name'];

	
	public function getPictureNameAttribute() 
	{
		$e = $this->picture ? explode('/', $this->picture) : [];
		return end($e);
	}

	public function getFieldAttribute()
	{
		return !empty($this->custom_fields) ? array_column($this->custom_fields->toArray(), 'value', 'code') : [];
	}

	public function custom_fields()
	{
		return $this->morphMany(CustomField::class, 'model');
	}

	public function getNotRemoveableAttribute() 
	{
		return true;
	}

	public function getPhotoAttribute() : ?String
	{
		return !empty($this->picture) ? $this->picture : '/uploads/images/default_profile.png';
	}


	public function getFields()
	{
		return $this->fillable;
	}

	public function followers() 
	{
		return $this->hasMany(Follower::class , 'customer_id', 'customer_id');	
	}

	public function media_items() 
	{
		return $this->hasMany(MediaItem::class , 'author_id', 'customer_id')->with('main_file');	
	}

	public function audiobooks() 
	{
		return $this->hasMany(MediaItem::class , 'author_id', 'customer_id')->with('main_file')->where('type', 'audiobook')->orderBy('media_id', 'DESC');	
	}

	public function audio_items() 
	{
		return $this->hasMany(MediaItem::class , 'author_id', 'customer_id')->with('main_file')->where('type', 'audio')->orderBy('media_id', 'DESC');	
	}

	public function playlists() 
	{
		return $this->hasMany(Playlist::class , 'customer_id', 'customer_id')->with('items');	
	}

	public function following($customer_id) 
	{
		return $this->hasOne(Follower::class , 'customer_id', 'customer_id')->where('follower_id', $customer_id);	
	}

	
	public function likes() 
	{
		return $this->hasMany(Like::class, 'customer_id', 'customer_id')->with('item');	
	}

    public function receiverAsCustomer()
    {
		return  $this;
    }
	
}
