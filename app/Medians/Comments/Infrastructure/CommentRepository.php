<?php

namespace Medians\Comments\Infrastructure;

use Medians\Comments\Domain\Comment;


class CommentRepository 
{

	protected $app;



	function __construct()
	{
	}


	public function find($id)
	{
		return Comment::find($id);
	}

	public function get($limit = 1000)
	{
		return Comment::with('item')->limit($limit)->get();
	}




	/**
	* Save item to database
	*/
	public function store($data) 
	{

		$Model = new Comment();
		
		$data['item_type'] = (new \Medians\Media\Domain\MediaItem)::class;
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $Model->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}	

		$dataArray['status'] = isset($dataArray['status']) ? 'on' : null;
		// Return the Model object with the new data
    	$Object = Comment::firstOrCreate($dataArray);

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Comment::find($data['comment_id']);
		
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
			
			return Comment::find($id)->delete();

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}

}
