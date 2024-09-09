<?php

namespace Medians\Playlists\Domain;

use Shared\dbaser\CustomModel;


class PlaylistMedia extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'playlist_media';

    protected $primaryKey = 'playlist_media_id';

	public $fillable = [
		'media_id',
		'playlist_id',
		'customer_id',
		'sort'
	];



}
