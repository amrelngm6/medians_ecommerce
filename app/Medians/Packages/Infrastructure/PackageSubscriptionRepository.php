<?php

namespace Medians\Packages\Infrastructure;

use Medians\Packages\Domain\PackageSubscription;
use Medians\Students\Domain\Student;
use Medians\Customers\Domain\Employee;
use Medians\Customers\Domain\SuperVisor;


/**
 * PackageSubscription class database queries
 */
class PackageSubscriptionRepository 
{

	
	 
	

	

	function __construct()
	{
		
		
	}

	/**
	* Find item by `id` 
	*/
	public function find($id) 
	{

		return PackageSubscription::with('model','package', 'applicant')->find($id);
	}

	/**
	* Find items by `params` 
	*/
	public function get($params = null) 
	{
		return PackageSubscription::with('model','package','applicant')->get();
	}

	/**
	* Find pending students subscriptions
	* Filter all students based on Parent 
	*/
	public function loadPendingStudentsSubscription($parentId = null) 
	{
		return PackageSubscription::where('payment_status', 'unpaid')
		->where('model_type', Student::class)
		->whereHas('model', function($q) use  ($parentId) {
			return $q->where('parent_id', $parentId);
		})
		->whereHas('applicant', function($q) use  ($parentId) {
			return $q->where('status', 'approved');
		})
		->with('model','package', 'applicant')
		->first();
	}

	
	public function eventsByDate($params)
	{
		$query = PackageSubscription::whereBetween('created_at', [$params['start'], $params['end']]);
		return $query;
	}
	
	public function allEventsByDate($params)
	{
		$query = PackageSubscription::whereBetween('created_at', [$params['start'], $params['end']]);
		return $query;
	}


	/**
	* Save item to database
	*/
	public function store($data) 
	{	

		$data['model_type'] = $this->handleClassType($data['usertype']);

		$Model = new PackageSubscription();
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		// Return the Model object with the new data
    	$Object = PackageSubscription::firstOrCreate($dataArray);

    	return $Object;
	}


	/**
	 * Update Lead
	 */
	public function handleClassType($data)
	{

		if (strtolower($data) == 'employee')
			return Employee::class;
	
		if (strtolower($data) == 'student')
			return Student::class;
	
		if (strtolower($data) == 'supervisor')
			return SuperVisor::class;

	}
	
	/**
	* Update item to database
	*/
    public function update($data)
    {

		$Object = PackageSubscription::find($data['subscription_id']);
		
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
			
			return PackageSubscription::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

	/**
	* Delete item to database
	*
	* @Returns Boolen
	*/
	public function cancelSubscription($subscriptionId) 
	{
		try {
			
			$check = PackageSubscription::with('model')->find($subscriptionId);

			if (isset($check->payment_status) && $check->payment_status == 'unpaid')
			{
				return PackageSubscription::find($subscriptionId)->delete();
			}

			if (isset($check->payment_status) && $check->payment_status == 'paid')
			{
				return array('error'=>translate('Paid subscriptions not cancelable'));
			}


		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


}