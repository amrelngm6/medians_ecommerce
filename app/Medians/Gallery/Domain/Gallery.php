<?php

namespace Medians\Gallery\Domain;

use Shared\dbaser\CustomModel;

/**
 * Transaction class database queries
 */
class Gallery extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'gallery';

    protected $primaryKey = 'gallery_id';

	protected $fillable = [
		'picture',
    	'status',
    	'created_by',
	];



}
