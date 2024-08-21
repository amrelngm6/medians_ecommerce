<?php

namespace Medians\Products\Infrastructure;

use Medians\Products\Domain\ProductStock;
use Medians\Products\Domain\ProductField;
use Medians\Products\Domain\Product;
use Medians\Content\Domain\Content;
use Medians\Languages\Domain\Language;


class ProductStockRepository 
{


	public function find($id)
	{
		return ProductStock::find($id);
	}

	public function get($limit = 100)
	{
        return ProductStock::with('product')->limit($limit)->get();
	}



	/**
	* Save item to database
	*/
	public function store($data) 
	{
		return $data;
		$Model = new ProductStock();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = ProductStock::create($dataArray);

		$productField = ProductField::where('product_id',$Object->product_id)->first();

		$updateStock = $productField->update(['stock'=> ($data['type'] == 'add') ? ($productField->stock + $data['qty']) : ($productField->stock - $data['qty'])]);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = ProductStock::find($data['stock_id']);
		
		// Return the Model object with the new data
    	$Object->update( (array) $data);

    	return $Object;

    } 


	/**
	* Delete item to database
	*
	* @Returns Boolen
	*/
	public function delete($id) 
	{
		try {
			
			return ProductStock::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}



}
