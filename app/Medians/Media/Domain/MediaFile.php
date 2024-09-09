<?php

namespace Medians\Media\Domain;

use Shared\dbaser\CustomModel;


class MediaFile extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'media_files';

    protected $primaryKey = 'media_file_id';
	
	public $fillable = [
		'media_id',
		'type',
		'storage',
		'path',
		'sort',
	];

	public $appends = ['wave', 'filename'];

	public function getWaveAttribute() 
	{
		$a = explode('/', $this->path);
		$e = explode('.', $this->path);
		return !empty(end($a)) ? str_replace(end($e), 'png', end($a)) : '';
	}

	public function getFilenameAttribute() 
	{
		$e = explode('/', $this->path);
		return end($e);
	}


}
