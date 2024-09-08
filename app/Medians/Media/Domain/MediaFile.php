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
		$e = explode('.', $this->path);
		return !empty($this->path) ? str_replace(end($e), 'png', $this->path) : '';
	}

	public function getFilenameAttribute() 
	{
		$e = explode('/', $this->path);
		return end($e);
	}


}
