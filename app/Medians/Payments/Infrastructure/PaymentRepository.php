<?php

namespace Medians\Payments\Infrastructure;

use Medians\Payments\Domain\Payment;
use Medians\Invoices\Domain\Invoice;


/**
 * Payment class database queries
 */
class PaymentRepository 
{



	/**
	* Find item by `id` 
	*/
	public function find($id) 
	{
		return Payment::find($id);
	}

	/**
	* Find items by `params` 
	*/
	public function get($limit = 500) 
	{
		return Payment::with('user', 'invoice', 'plan_subscription')
		->limit($limit)
		->orderBy('payment_id', 'DESC')
		->get();
	}


	/**
	* Find all items between two days By BranchId
	*/
	public function getByDate($params )
	{

	  	$check = Payment::with('user');

	  	if (!empty($params["created_by"]))
	  	{
	  		$check = $check->where('created_by', $params['created_by']);
	  	}

	  	if (!empty($params["start"]))
	  	{
	  		$check = $check->whereDate('created_at' , [$params['start'] , $params['end']]);
	  	}
  		

  		return $check->orderBy('payment_id', 'DESC');
	}


	/**
	 * Get sum of field 
	 * with start & end range
	 */
	public function getSumByDate($sumField, $start, $end)
	{
		$check = Payment::where('branch_id' , $this->app->branch->id)->with('user');
  		$check = $check->whereBetween('created_at' , [isset($start) ? $start : date('Y-m-d') , isset($end) ? $end : date('Y-m-d')]);
  		return $check->orderBy('payment_id', 'DESC')->sum($sumField);
	} 




	/**
	* Find latest items
	*/
	public function getLatest($params, $limit = 10 ) 
	{
	  	return Payment::whereBetween('created_at' , [$params['start'] , $params['end']])
	  	->limit($limit)
	  	->orderBy('payment_id', 'DESC');
	}
	

	/**
	* Save item to database
	*/
	public function store($data) 
	{	

		$Model = new Payment();
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = Payment::firstOrCreate($dataArray);

    	return $Object;
	}


	/**
	* Update item to database
	*/
    public function update($data)
    {

		$Object = Payment::find($data['id']);
		
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
			
			return Payment::find($id)->delete();

		} catch (Exception $e) {

			throw new Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


	
	/**
	 * Generate invoice code
	 */
	public function generateCode()
	{
		$count = Invoice::count();
		$prefix = "I-";
		return $prefix.($count + 1);
	}

}