<?php

namespace Medians\Orders\Infrastructure;

use Medians\Orders\Domain\Order;
use Medians\Orders\Domain\OrderItem;
use Medians\CustomFields\Domain\CustomField;
use Medians\Products\Domain\Product;
use Medians\Customers\Domain\Customer;


/**
 * Order class database queries
 */
class OrderRepository 
{


	/**
	* Find item by `order_id` 
	*/
	public function find($order_id) 
	{
		return Order::with('customer', 'items', 'invoice')->find($order_id);
	}

	/**
	* Find item by `order_id` 
	*/
	public function findCustomerOrder($order_id, $customerId) 
	{
		return Order::with('customer', 'items', 'invoice')->where('customer_id', $customerId)->find($order_id);
	}

	/**
	* Find items by `params` 
	*/
	public function get($limit = 500) 
	{
		return Order::with('customer', 'items', 'invoice')
		
		->limit($limit)
		->orderBy('order_id', 'DESC')
		->get();
	}

	/**
	* Find items by `params` 
	*/
	public function getCustomerOrders($customerId) 
	{
		return Order::with('customer', 'items')
		->where('customer_id', $customerId)
		->where('customer_type', Customer::class)
		->limit(10)
		->orderBy('order_id', 'DESC')
		->get();
	}


	/**
	* Find all items between two days By BranchId
	*/
	public function getByDate($params )
	{
	  	$check = Order::with('customer', 'items', 'invoice');

	  	if (!empty($params["start_date"])){
	  		$check = $check->whereBetween('date' , [$params['start_date'] , $params['end_date']]);
	  	}
	  	if (!empty($params["status"])){
	  		$check = $check->where('status' , $params['status']);
	  	}

  		return $check->orderBy('created_at', 'DESC')->get();
	}




	/**
	* Find latest items
	*/
	public function getLatest($params, $limit = 10 ) 
	{
	  	return Order::whereBetween('created_at' , [$params['start'] , $params['end']])
		
	  	->limit($limit)
	  	->orderBy('created_at', 'DESC');
	}
	

	
	public function eventsByDate($params)
	{
		$query = Order::whereBetween('date', [$params['start'], $params['end']]);
		return $query;
	}
	
	public function allEventsByDate($params)
	{
		$query = Order::whereBetween('date', [$params['start'], $params['end']]);
		return $query;
	}


	/**
	* Save item to database
	*/
	public function store($data) 
	{	

		$Model = new Order();
		
		$data['customer_type'] = Customer::class;	
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Order::firstOrCreate($dataArray);

    	// Store order items
    	!empty($data['items']) ? $this->storeItems($data['items'], $Object) : '';

    	// Store Custom fields
    	!empty($data['field']) ? $this->storeCustomFields((array) $data['field'], $Object->order_id) : '';

    	return $Object;
	}


	/**
	* Update item to database
	*/
    public function update($data)
    {

		$Object = Order::find($data['order_id']);
		
		// Return the Model object with the new data
    	$Object->update( (array) $data);

    	// Store Custom fields
    	!empty($data['field']) ? $this->storeCustomFields( $data['field'], $Object->order_id) : '';

    	return $Object;
    } 



	/**
	* Delete item to database
	*
	* @Returns Boolen
	*/
	public function delete($order_id) 
	{
		try {
			
			return Order::find($order_id)->delete();

		} catch (Exception $e) {

			throw new Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


	/**
	* Save related items to database
	*/
	public function storeCustomFields($data, $id) 
	{
		CustomField::where('model_type', Order::class)->where('model_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['model_type'] = Order::class;	
				$fields['model_id'] = $id;	
				$fields['code'] = $key;	
				$fields['value'] = $value;

				$Model = CustomField::firstOrCreate($fields);
			}
	
			return $Model;		
		}
	}

	
	
	/**
	* Save related items to database
	*/
	public function storeItems($data, $order) 
	{
		if ($data)
		{
			$totalAmount = 0;
			$totalTaxAmount = 0;
			foreach ($data as $key => $value)
			{
				$totalTaxAmount = ($value->qty * $value->item->tax_amount());
				$totalAmount = ($value->qty * $value->item->price) + $totalTaxAmount;
				$fields = array();
				$fields['order_id'] = $order->order_id;
				$fields['subtotal'] = ($value->qty * $value->item->price);
				$fields['discount_amount'] = 0;
				$fields['quantity'] = $value->qty;
				$fields['total_amount'] = $totalAmount;
				$fields['tax_amount'] = $totalTaxAmount;
				$fields['item_id'] = $value->item_id;
				$fields['item_type'] = $value->item_type;	
				$fields['color'] = $value->color;	
				$fields['size'] = $value->size;	
				$fields['date'] = date('Y-m-d');
				$fields['status'] = 'new';
				$fields['code'] = $this->generateCode();
				$Model = OrderItem::create($fields);

				$value->delete();
			}
			
			return $Model;		
		}
	}


	/**
	 * Generate order code
	 */
	public function generateCode($prefix = 'INV-')
	{
		$count = Order::count();
		return $prefix.($count + 1);
	}
}