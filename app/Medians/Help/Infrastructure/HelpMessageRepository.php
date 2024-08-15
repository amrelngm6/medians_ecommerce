<?php

namespace Medians\Help\Infrastructure;

use Medians\Help\Domain\HelpMessage;
use Medians\Help\Domain\HelpMessageComment;
use Medians\CustomFields\Domain\CustomField;
use Medians\Customers\Domain\Customer;
use Medians\Users\Domain\User;


class HelpMessageRepository 
{

	


	public function find($id)
	{
		return HelpMessage::with('comments','user')->find($id);
	}

	public function get($limit = 100)
	{
		return HelpMessage::with('comments')->with('user')->limit($limit)->orderBy('message_id', 'DESC')->get();
	}

	public function load($limit = 100)
	{
		return HelpMessage::with('user','comments' )->limit($limit)->orderBy('message_id', 'DESC')->get();
	}
	
	public function eventsByDate($params)
	{
		$query = HelpMessage::whereBetween('created_at', [$params['start'], $params['end']]);
		return $query;
	}

	public function allEventsByDate($params, $limit = 5)
	{
		return HelpMessage::whereBetween('created_at', [$params['start'], $params['end']])
		->with('user')
		->orderBy('created_at','DESC')
		->limit($limit)
		->get();
	}





	
	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new HelpMessage();

		$data['user_type'] = Customer::class;
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}		

		// Return the  object with the new data
    	$Object = HelpMessage::create($dataArray);

    	return $Object;
    }
    	
	

	/**
	* Save Comment from Admin / Agent
	*/
	public function storeUserComment($data) 
	{

		$Model = new HelpMessageComment();

		$data['user_type'] = User::class;
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}		
		
		// Return the  object with the new data
    	$Object = HelpMessageComment::create($dataArray);

    	return $Object;
    }
    	

    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = HelpMessage::find($data['message_id']);
		
		// Return the  object with the new data
    	$Object->update( (array) $data);

    	// Store Custom fields
    	!empty($data['field']) ? $this->storeCustomFields($data['field'], $data['message_id']) : '';

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
			
			$delete = HelpMessage::find($id)->delete();

			if ($delete){
				$this->storeCustomFields(null, $id);
			}

			return true;

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}



	/**
	* Save related items to database
	*/
	public function storeCustomFields($data, $id) 
	{
		CustomField::where('model_type', HelpMessage::class)->where('model_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['model_type'] = HelpMessage::class;	
				$fields['model_id'] = $id;	
				$fields['code'] = $key;	
				$fields['value'] = $value;

				$Model = CustomField::create($fields);
				$Model->update($fields);
			}
	
			return $Model;		
		}
	}


 
}