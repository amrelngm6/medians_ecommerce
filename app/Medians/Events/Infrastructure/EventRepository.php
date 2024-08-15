<?php

namespace Medians\Events\Infrastructure;

use Medians\Events\Domain\Event;
use Medians\CustomFields\Domain\CustomField;
use Medians\Users\Domain\User;


class EventRepository 
{

	public function find($id)
	{
		return Event::find($id);
	}

	public function get($limit = 100)
	{
		return Event::limit($limit)->orderBy('event_id', 'DESC')->get();
	}


	public function eventsByDate($params)
	{
		$query = Event::whereBetween('created_at', [$params['start'], $params['end']]);
		return $query;
	}


	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Event();

		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}		

		// Return the  object with the new data
    	$Object = Event::create($dataArray);

    	return $Object;
    }
    	

    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Event::find($data['event_id']);
		
		// Return the  object with the new data
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
			
			$delete = Event::find($id)->delete();

			return true;

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}


 
}