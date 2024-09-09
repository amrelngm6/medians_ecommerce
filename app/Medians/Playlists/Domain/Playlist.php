<?php

namespace Medians\Playlists\Domain;

use Shared\dbaser\CustomModel;


class Playlist extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'playlists';

    protected $primaryKey = 'playlist_id';

	public $fillable = [
		'name',
		'description',
		'customer_id',
		'status'
	];



	public function getFields()
	{
		return $this->fillable;
	}

	public function items()
	{
		return $this->morphTo();	
	}

}
