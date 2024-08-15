<?php

namespace Medians\Invoices\Infrastructure;

use Medians\Invoices\Domain\Invoice;
use Medians\Invoices\Domain\InvoiceItem;
use Medians\CustomFields\Domain\CustomField;
use Medians\Packages\Domain\PackageSubscription;
use Medians\Trips\Domain\TaxiTrip;
use Medians\Plans\Domain\Plan;
use Medians\Users\Domain\User;
use Medians\Plans\Domain\PlanSubscription;


/**
 * Invoice class database queries
 */
class InvoiceRepository 
{


	/**
	* Find item by `invoice_id` 
	*/
	public function find($invoice_id) 
	{
		return Invoice::with('user', 'items', 'order')->find($invoice_id);
	}

	
	/**
	* Find items by `params` 
	*/
	public function get($limit = 500) 
	{
		return Invoice::with('user', 'items', 'order', 'transaction')
		
		->limit($limit)
		->orderBy('invoice_id', 'DESC')
		->get();
	}

	/**
	* Find items by customer & invoice_id  
	*/
	public function findCustomerInvoice($code, $userId) 
	{
		return Invoice::with('user', 'items', 'order' , 'transaction')
		->where('user_id', $userId)
		->where('code', $code)
		->first();
	}

	/**
	* Find items by `params` 
	*/
	public function getUserInvoices($userId) 
	{
		return Invoice::with('user', 'items', 'item' , 'transaction')
		->where('user_id', $userId)
		->where('user_type', User::class)
		->limit(10)
		->orderBy('invoice_id', 'DESC')
		->get();
	}


	/**
	* Find all items between two days By BranchId
	*/
	public function getByDate($params )
	{
	  	$check = Invoice::with('user', 'items', 'order', 'transaction');

	  	if (!empty($params["start_date"]))
	  	{
	  		$check = $check->whereBetween('date' , [$params['start_date'] , $params['end_date']]);
	  	}

  		return $check->orderBy('created_at', 'DESC')->get();
	}




	/**
	* Find latest items
	*/
	public function getLatest($params, $limit = 10 ) 
	{
	  	return Invoice::whereBetween('created_at' , [$params['start'] , $params['end']])
		
	  	->limit($limit)
	  	->orderBy('created_at', 'DESC');
	}
	

	
	public function eventsByDate($params)
	{
		$query = Invoice::whereBetween('date', [$params['start'], $params['end']]);
		return $query;
	}
	
	public function allEventsByDate($params)
	{
		$query = Invoice::whereBetween('date', [$params['start'], $params['end']]);
		return $query;
	}


	/**
	* Save item to database
	*/
	public function store($data) 
	{	

		$Model = new Invoice();
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Invoice::firstOrCreate($dataArray);

    	// Store invoice items
    	!empty($data['items']) ? $this->storeItems($data['items'], $Object) : '';

    	// Store Custom fields
    	!empty($data['field']) ? $this->storeCustomFields((array) $data['field'], $Object->invoice_id) : '';

    	return $Object;
	}


	/**
	* Update item to database
	*/
    public function update($data)
    {

		$Object = Invoice::find($data['invoice_id']);
		
		// Return the Model object with the new data
    	$Object->update( (array) $data);

    	// Store Custom fields
    	!empty($data['field']) ? $this->storeCustomFields((array) $data['field'], $Object->invoice_id) : '';

    	return $Object;
    } 



	/**
	* Delete item to database
	*
	* @Returns Boolen
	*/
	public function delete($invoice_id) 
	{
		try {
			
			return Invoice::find($invoice_id)->delete();

		} catch (Exception $e) {

			throw new Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


	/**
	* Save related items to database
	*/
	public function storeCustomFields($data, $id) 
	{
		CustomField::where('model_type', Invoice::class)->where('model_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['model_type'] = Invoice::class;	
				$fields['model_id'] = $id;	
				$fields['code'] = $key;	
				$fields['value'] = $value;

				$Model = CustomField::create($fields);
				$Model->update($fields);
			}
	
			return $Model;		
		}
	}


	/**
	* Save related items to database
	*/
	public function storeItems($data, $invoice) 
	{
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$fields = array();
				$fields['invoice_id'] = $invoice->invoice_id;
				$fields['subtotal'] = $value->subtotal;
				$fields['discount_amount'] = 0;
				$fields['total_amount'] = $value->total_amount;
				$fields['tax_amount'] = $value->tax_amount;
				$fields['quantity'] = $value->quantity;
				$fields['item_id'] = $value->item_id;
				$fields['item_type'] = $value->item_type;	
				$fields['status'] = $value->status;
				$Model = InvoiceItem::create($fields);
			}
	
			return $Model;		
		}
	}


	/**
	 * Generate invoice code
	 */
	public function generateCode($prefix = 'INV-')
	{
		$count = Invoice::count();
		return $prefix.($count + 1);
	}
}