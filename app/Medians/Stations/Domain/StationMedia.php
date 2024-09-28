<?php

namespace Medians\Stations\Domain;

use Shared\dbaser\CustomModel;
use Medians\Media\Domain\MediaItem;


class StationMedia extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'station_media';

    protected $primaryKey = 'station_media_id';

	public $fillable = [
		'media_id',
		'media_path',
		'station_id',
		'title',
		'start_at',
		'duration',
		'date',
		'sort'
	];

	public $appends = ['id', 'start', 'end'];

	public function getIdAttribute()
	{
		return $this->station_media_id;
	}

	public function getPictureAttribute()
	{
		return isset($this->media->picture) ? $this->media->picture : '';
	}
	
	public function getStartAttribute()
	{
		return $this->date . ' '.$this->start_at;
	}
	
	public function getEndAttribute()
	{
		return date($this->date . ' '.$this->start_at, strtotime("+".$this->duration." Seconds"));
	}

	public function media()
	{
		return $this->hasOne(MediaItem::class, 'media_id', 'media_id')->with('main_file');
	}

}
