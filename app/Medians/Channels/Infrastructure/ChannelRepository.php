<?php

namespace Medians\Channels\Infrastructure;

use Medians\Channels\Domain\Channel;
use Medians\Customers\Domain\Customer;


class ChannelRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Channel::find($id);
	}

	public function get($limit = 1000)
	{
		return Channel::with('item')->limit($limit)->get();
	}


	
	/**
	 * Load items with filters
	 */
	public function getWithFilter($params)
	{

			$model = new Customer;
            // where('status', 'on')->

			if (!empty($params['title']))
			{
				$model = $model->where('name', 'LIKE', '%'.$params['title'].'%');
			}

			if (!empty($params['sort_by']))
			{
				switch ($params['sort_by']) {
					case 'best':
						$model = $model->withCount('views')->orderBy('views_count','DESC');
						break;
						
					case 'old':
						$model = $model->orderBy('customer_id','ASC');
						break;
						
					// default:
					case 'new':
						$model = $model->orderBy('customer_id','DESC');
						break;
				}
			}

			if (!empty($params['date']))
			{
				switch (strtolower($params['date'])) {
					case 'day':
					case 'week':
					case 'month':
					case 'year':
						$model = $model->whereBetween('created_at', [ date('Y-m-d', strtotime("-1 ".$params['date'])) , date('Y-m-d')]);
						break;
						
					default:
						$model = $model->orderBy('customer_id','DESC');
						break;
				}
			}

			$totalCount = $model->count();

			$offset = (($params['limit'] ?? 1) * (!empty($params['page']) ? floatval( $params['page'] - 1)  : 0));
			return ['count' => $totalCount, 'items'=>$model->offset($offset)->limit(floatval($params['limit']))->get()];
	}


	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Channel();
		
		$data['item_type'] = (new \Medians\Products\Domain\Product)::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['status'] = isset($dataArray['status']) ? 'on' : null;
		// Return the Model object with the new data
    	$Object = Channel::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Channel::find($data['channel_id']);
		
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
			
			return Channel::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
