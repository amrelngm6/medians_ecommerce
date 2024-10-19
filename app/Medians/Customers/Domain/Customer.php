<?php

namespace Medians\Customers\Domain;

use Shared\dbaser\CustomModel;
use Medians\Followers\Domain\Follower;
use Medians\CustomFields\Domain\CustomField;
use Medians\Media\Domain\MediaItem;
use Medians\Playlists\Domain\Playlist;
use Medians\Stations\Domain\Station;
use Medians\Channels\Domain\Channel;
use Medians\Likes\Domain\Like;
use Medians\Views\Domain\View;
use Medians\Packages\Domain\PackageSubscription;


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

	public function subscriptions() 
	{
		return $this->hasMany(PackageSubscription::class , 'customer_id', 'customer_id');	
	}

	public function subscription() 
	{
		return $this->hasOne(PackageSubscription::class , 'customer_id', 'customer_id')->orderBy('end_date', 'DESC');	
	}

	public function followers() 
	{
		return $this->hasMany(Follower::class , 'customer_id', 'customer_id');	
	}

	public function media_items() 
	{
		return $this->hasMany(MediaItem::class , 'author_id', 'customer_id')->with('main_file');	
	}

	public function chartsMedia($type = 'audio', $limit = 4) 
	{
		return $this->hasMany(MediaItem::class , 'author_id', 'customer_id')->selectRaw("type, DATE_FORMAT(created_at, '%b %d') as label, COUNT(*) as y")->having('y', '>', 0)->where('type', $type)->orderBy('created_at')->groupBy('label')->limit($limit)->get();	
	}

	public function limitedMedia($type = 'audio', $limit = 4) 
	{
		return $this->hasMany(MediaItem::class , 'author_id', 'customer_id')->withSum('views', 'times')->withCount('likes', 'comments')->whereIn('type', $type)->orderBy('views_sum_times', 'DESC')->limit($limit)->get();	
	}

	public function audiobooks()
	{
		return $this->hasMany(MediaItem::class , 'author_id', 'customer_id')->withSum('views', 'times')->with('main_file')->where('type', 'audiobook')->orderBy('media_id', 'DESC');	
	}

	public function videos()
	{
		return $this->hasMany(MediaItem::class , 'author_id', 'customer_id')->withSum('views', 'times')->with('main_file')->where('type', 'video')->orderBy('media_id', 'DESC');	
	}

	public function audio_items()
	{
		return $this->hasMany(MediaItem::class , 'author_id', 'customer_id')->withSum('views', 'times')->with('main_file')->where('type', 'audio')->orderBy('media_id', 'DESC');	
	}

	public function playlists() 
	{
		return $this->hasMany(Playlist::class , 'customer_id', 'customer_id')->with('items');	
	}

	public function stations() 
	{
		return $this->hasMany(Station::class , 'customer_id', 'customer_id');	
	}

	public function channels() 
	{
		return $this->hasMany(Channel::class , 'customer_id', 'customer_id');	
	}

	public function following($customer_id) 
	{
		return $this->hasOne(Follower::class , 'customer_id', 'customer_id')->where('follower_id', $customer_id);	
	}

	
	public function likes() 
	{
		return $this->hasMany(Like::class, 'customer_id', 'customer_id')->with('item');	
	}


	public function viewscount() 
	{
		return $this->morphMany(View::class , 'item')->sum('times');	
	}
	


    public function receiverAsCustomer()
    {
		return  $this;
    }
	
}
