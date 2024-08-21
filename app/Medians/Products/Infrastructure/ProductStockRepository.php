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
	public function storeProducts($data) 
	{
		$newArray = [];
		$newArray['qty'] = $data['qty'];
		$newArray['type'] = $data['type'];
		foreach ($data['product_id'] as $key => $value) 
		{
			if ($value > 0)
			{
				$newArray['product_id'] = $value;
				$item = $this->store($newArray);
			}
		}	

		return $item;
	}

		

	/**
	* Save item to database
	*/
	public function store($data) 
	{
		$Model = new ProductStock();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['date'] = date('Y-m-d');

		// Return the Model object with the new data
    	$Object = ProductStock::firstOrCreate($dataArray);

		// Update product stock
		$data['product_id'] = $Object->product_id;
		$updateStock = $this->updateItemstock($data);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function updateItemStock($data)
    {
		
		$productField = ProductField::where('product_id', $data['product_id'])->first();
		$updateStock = $productField->update(['stock'=> ($data['type'] == 'add') ? ($productField->stock + $data['qty']) : ($productField->stock - $data['qty'])]);

    	return $updateStock;
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
