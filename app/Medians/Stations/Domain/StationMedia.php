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
		'station_id',
		'start_at',
		'date',
		'sort'
	];

	public function media()
	{
		return $this->hasOne(MediaItem::class, 'media_id', 'media_id')->with('main_file');
	}

}
