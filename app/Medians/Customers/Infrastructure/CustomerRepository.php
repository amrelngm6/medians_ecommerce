<?php

namespace Medians\Customers\Infrastructure;

use Medians\Customers\Domain\Customer;
use Medians\CustomFields\Domain\CustomField;

class CustomerRepository 
{


	protected $app;


	/**
	* Find all items between two days 
	*/
	public function masterByDateCount($params )
	{
	  	return Customer::whereBetween('created_at' , [$params['start'] , $params['end']])->count();
	}



	public function getClassName()
	{
		return Customer::class;
	}

	public function find($customerId)
	{
		return Customer::find($customerId);
	}

	public function get()
	{
		return Customer::all();
	}

	public function findByEmail($email)
	{
		return Customer::where('email' , $email)->first();
	}


	/**
	 * Check Customer session by his token
	 */
	public function findByToken($token, $code = 'API_token')
	{
		return Customer::with('custom_fields')->whereHas('custom_fields', function($q) use ($token, $code) {
			$q->where('code', $code)->where('value',$token);
		})->first();
	}

	/**
	 * Login with email & password 
	 */	
	public function checkLogin($email, $password)
	{
		return Customer::where('password', $password)->where('email' , $email)->first();
	}


	/**
	 * Generate random password
	 */
	public function randomPassword($length = 8) {
		$alphabet = '12345678900';
		$pass = array(); //remember to declare $pass as an array
		$alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
		for ($i = 0; $i < $length; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		return implode($pass); //turn the array into a string
	}


    /**
     * Reset & Update password 
     */
    public function resetChangePassword($data)
    {
		$Auth = new \Medians\Auth\Application\AuthService;

		$Object = $this->findByToken($data['reset_token'], 'reset_token');
		
		if (!$Object)
		{
			return translate('Sent token is not valid');
		}

		$newPassword = $Auth->encrypt($data['password']);

		// Return the  object with the new data
    	$Object->update( ['password'=> $newPassword]);

    	return $Object;
    }


	/**
	* Find latest items
	*/
	public function getLatest($params, $limit = 10 ) 
	{
	  	return Customer::whereBetween('created_at' , [$params['start'] , $params['end']])
	  	->limit($limit)
	  	->orderBy('customer_id', 'DESC');
	}
	

	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Customer();

		$dataArray = [];
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$Model = $Model->firstOrCreate($dataArray);

		// Return the Model object with the new data
    	return $Model;

	}
	

	/**
	* Update item to database
	*/
	public function update($data) 
	{
		try {
			
			$Object = Customer::find($data['customer_id']);
			
			if (!$Object) {
				throw new \Exception(translate('this Customer not found'), 1);
			}

			// Return the Model object with the new data
	    	$Object->update( (array) $data);
				
			// Store Custom fields
			!empty($data['field']) ? $this->storeCustomFields($data['field'], $Object->customer_id) : '';

    		return $Object;	

		} catch (\Exception $e) {
			return $e->getMessage();
		}
	}

	

	/**
	* Save item to database
	*/
	public function signup($data) 
	{

		$Model = new Customer();

		$validateEmail = $this->validateEmail($data['email']);
		if ($validateEmail) {
			return $validateEmail;	
		}

		$Model = $Model->firstOrCreate($data);

    	$data['customer_id'] = $Model->customer_id;
		$this->checkUpdatePassword($data);
    	/**
		* Set token for activation by Customer
		*/
		$value = Customer::encrypt(strtotime(date('YmdHis')).$data['customer_id']);
    	$this->setCustomCode($Model, 'activation_token', $value);
    	$this->setCustomCode($Model, 'otp', $this->randomPassword(6));

		// Return the Model object with the new data
    	return $this->find($Model->customer_id);

	}

	/**
	* validate Email 
	*/
	public function validateEmail($email, $id = 0) 
	{
		if (!empty($email))
		{
			$check = Customer::where('email', $email)->where('customer_id', '!=', $id)->first();
		}

		return  (empty($check)) ? null : translate('EMAIL_FOUND');
	}

	/**
	* Update item to database
	*/
	public static function checkUpdatePassword($data) 
	{
		if (isset($data['customer_id']))
		{
			$Object = Customer::find($data['customer_id']);
		}
		
		if (!empty($data['password']))
		{
			// Return the Model object with the new data
    		$Object->password =  Customer::encrypt($data['password']);
    		$Object->save();
		}
    	
    	return isset($Object) ? $Object : null;	
	}

	/**
	* Update item to database
	*/
	public function changePassword($data, $Object) 
	{
		if (isset($data['customer_id']))
		{
			throw new \Exception(translate('Customer not found'), 1);
		}
		
		if (!empty($data['password']))
		{
			// Return the Model object with the new data
    		$Object->password =  Customer::encrypt($data['password']);
    		$Object->save();
		}
    	
    	return isset($Object) ? $Object : null;	
	}


	/**
	* Save related items to database
	*/
	public function storeCustomFields($data, $id) 
	{
		CustomField::where('model_type', Customer::class)->where('model_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['model_type'] = Customer::class;	
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
	* Set Custom field for Customer
	*/
	public function setCustomCode($data, $customCode, $value) 
	{

		$fillable = ['code'=>$customCode,'model_type'=>Customer::class, 'model_id'=>$data->customer_id, 'value'=>$value];

		CustomField::firstOrCreate($fillable);
	}

}
