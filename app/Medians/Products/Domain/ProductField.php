<?php

namespace Medians\Products\Domain;

use Shared\dbaser\CustomModel;

use \Medians\Brands\Domain\Brand;

class ProductField extends CustomModel
{

	/*
	/ @var String
	*/
	protected $table = 'product_fields';

    protected $primaryKey = 'product_field_id';
	
	public $fillable = [
		'product_id',
		'brand_id',
		'sku',
		'min_purchase_qty',
		'unit',
		'barcode',
		'weight',
		'dimensions',
		'refundable',
		'featured',
		'vat_amount',
		'vat_type',
		'tax_amount',
		'tax_type',
		'low_stock_alert',
		'template',
	];

	public function brand() {
		return $this->hasOne(Brand::class, 'brand_id', 'brand_id');
	}
}
