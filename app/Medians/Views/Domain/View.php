<?php

namespace Medians\Views\Domain;


use Shared\dbaser\CustomModel;

class View extends CustomModel
{


	/*
	/ @var String
	*/
	protected $table = 'views';


	protected $fillable = [
    	'item_type',
    	'item_id',
    	'session',
    	'times',
	];

}
