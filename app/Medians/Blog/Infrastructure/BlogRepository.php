<?php

namespace Medians\Blog\Infrastructure;

use Medians\Blog\Domain\Blog;
use Medians\Hooks\Domain\Hook;
use Medians\Content\Domain\Content;
use Medians\CustomFields\Domain\CustomField;


class BlogRepository 
{


	/**
	 * Load app for Sessions and helpful
	 * methods for authentication and
	 * settings for branch
	 */ 
	protected $app ;


	function __construct()
	{
		$this->app = new \config\APP;

	}


	public static function getModel()
	{
		return new Blog();
	}


	public function find($id)
	{
		$item = Blog::with('content', 'langs')->withSum('views','times')->find($id);
		$item->content_langs = $item->langs->keyBy('lang');
		return $item;
	}

	public function get($limit = 500, $lang = null)
	{
		
		return Blog::with('user','content')->with(['category'=>function($q){
			return $q->with('content');
		}])->limit($limit)->orderBy('id', 'DESC')->get();
	}

	
	public function getFront($limit = 100, $lang = null)
	{
		return Blog::with('user','content')
		->whereHas('content', function($q){
			return $q->where('content', '!=', '');
		})
		->with(['category'=>function($q){
			return $q->with('content');
		}])->limit($limit)
		->where('status', 'on')
		->orderBy('id', 'DESC')->get();
	}


	public function getByCategory($id, $limit = 100)
	{
		return Blog::with('content', 'user')
		->whereHas('content', function($q){
			return $q->where('content', '!=', '');
		})
		->where('status', 'on')
		->where('category_id', $id)
		->limit($limit)
		->orderBy('id', 'DESC')->get();
	}

	public function countByCategory($id)
	{
		return Blog::whereHas('content', function($q){
			return $q->where('content', '!=', '');
		})
		->where('status', 'on')
		->where('category_id', $id)
		->count();
	}

	public function paginateByCategory($id, $limit = 100, $offset = 0)
	{
		return Blog::with('content','user')
		->whereHas('content', function($q){
			return $q->where('content', '!=', '');
		})
		->where('status', 'on')
		->where('category_id', $id)
		->limit($limit)
		->offset($offset)
		->orderBy('id', 'DESC')
		->get();
	}

	public function getFeatured($limit = 1)
	{
		return Blog::with('content','user')
		->where('status', 'on')
		->whereHas('content', function($q){
			return $q->where('content', '!=', '');
		})->orderBy('updated_at', 'DESC')->first();
	}


	public function search($request, $limit = 20)
	{
		$title = $request->get('search');
		$return = Blog::whereHas('content', function($q) use ($title){
			$q->where('title', 'LIKE', '%'.$title.'%');
		})
		->where('status', 'on')
		->with('content','user')
		->limit($limit)->orderBy('updated_at', 'DESC')
		->get();

		return $return;
	}

	public function similar($model, $limit = 3)
	{
		$title = str_replace([' ','-'], '%', $model->content->title);

		return Blog::whereHas('content', function($q) use ($title){
			foreach (explode('%', $title) as $i) {
				$q->where('title', 'LIKE', '%'.$i.'%')->orWhere('content', 'LIKE', '%'.$i.'%');
			}
		})
		->where('id', '!=', $model->id)
		->where('status', 'on')
		->with('category', 'content','user')->limit($limit)->orderBy('updated_at', 'DESC')->get();
	}




	/**
	* Save model to database
	*/
	public function store($data) 
	{

		$Model = new Blog();
		
		foreach ($data as $key => $value) 
		{
			if (in_array($key, $this->getModel()->getFields()))
			{
				$dataArray[$key] = $value;
			}
		}		

		// Return the FBUserInfo object with the new data
    	$Object = Blog::create($dataArray);
    	$Object->update($dataArray);

    	// Store languages content
    	$this->storeContent($data['content_langs'], $Object->id);

    	// Store Custom fields
    	isset($data['field']) ? $this->storeCustomFields($data['field'], $Object->id) : '';

    	return $Object;
    }
    	
    /**
     * Update Lead
     */
    public function update($data)
    {

		$Object = Blog::find($data['id']);
		
		$data['updated_at'] = date('Y-m-d H:i:s');
		// Return the FBUserInfo object with the new data
    	$Object->update( (array) $data);

    	// Store languages content
    	!empty($data['content_langs']) ? $this->storeContent(json_decode($data['content_langs'], true), $data['id']) : '';

    	// Store Custom fields
    	!empty($data['field']) ? $this->storeCustomFields($data['field'], $data['id']) : '';

    	return $Object;

    }


	/**
	* Delete model to database
	*
	* @Returns Boolen
	*/
	public function delete($id) 
	{
		try {
			
			$delete = Blog::find($id)->delete();

			if ($delete){
				$this->storeContent(null, $id);
				$this->storeCustomFields(null, $id);
			}

			return true;

		} catch (\Exception $e) {

			throw new \Exception("Error Processing Request " . $e->getMessage(), 1);
			
		}
	}





	/**
	* Save related models to database
	*/
	public function storeContent($data, $id) 
	{
		Content::where('item_type', Blog::class)->where('item_id', $id)->delete();
		if ($data)
		{
			foreach ($data as $key => $value)
			{
				$fields = $value;
				$fields['item_type'] = Blog::class;	
				$fields['item_id'] = $id;	
				$fields['lang'] = $key;	
				$fields['prefix'] = isset($value['prefix']) ? $value['prefix'] : Content::generatePrefix($value['title']);	
				$fields['created_by'] = $this->app->auth()->id;

				$Model = Content::create($fields);
				$Model->update($fields);
			}
	
			return $Model;		
		}
	}

	/**
	* Save related models to database
	*/
	public function storeCustomFields($data, $id) 
	{
		CustomField::where('model_type', Blog::class)->where('model_id', $id)->delete();
		if ($data && $data != '[]')
		{
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['model_type'] = Blog::class;	
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
	 * Filter short codes for Hooks
	 */
	public function filterShortCode ($model)
	{
		$postContent = $model->content->content;

		$hooks = $this->_plugins_shortcode_filter($postContent);
		
		if (!empty($hooks[2][0])) {
			
			foreach ($hooks[2] as $key => $value) 
			{
				$codeToReplace = $hooks[0][$key];
				$id = $hooks[2][$key];

				$hook = Hook::find($id);
				$hookContent = unserialize($hook->content)['content'];

				$postContent = str_replace($codeToReplace, $hookContent, $postContent);
				
			}
		}

		$output = str_replace("h=&amp;", '', $postContent);
		preg_match_all('/<iframe.*src=\"(.*)\".*><\/iframe>/isU', $output, $matches);
		if (isset($matches[1]))
		{
			foreach ($matches[1] as $k => $match) {

				$video = str_replace('https://www.youtube.com/embed/' , '', $match); 
				$videoContent = $this->videoContent($video, $model);
				$output = str_replace($matches[0][$k] , $videoContent, $output); 
			}

			
		}
		

		$model->content->content = $output;
		return $model;
	}
	
 
	public static function _plugins_shortcode_filter($val) {
		
		/** 
		 * Plugin shortcode 
		 * Usage:  [--@plugin= Plugin Name --@id= Plugin ID --]
		 * 
		*/
		
		$val ? preg_match_all("|\[--@plugin=(.*)\--@id=(.*)\--](.*)</[^>]+>|U", $val, $matches, PREG_PATTERN_ORDER) : null;	
		
		return $matches ?? $val;
		
	}
	
	

	public function videoContent($video_id, $model)
	{
		$img = $this->videoFrame($video_id);
		return '
		<div class="video-center show-modal-iframe relative" data-youtube-link="'.$video_id.'">
			<div class="iframe-container">
				<iframe  class="w-full lazy-iframe" height="460" data-src="https://www.youtube.com/embed/'.$video_id.'" frameborder="0" allowfullscreen></iframe>
			</div>
		</div>
		';
	}

	public function storeFrame($remoteFile, $video_id)
	{
		$filepath =  '/uploads/youtube/'.$video_id.'.jpg';
		file_put_contents($_SERVER['DOCUMENT_ROOT'].$filepath, file_get_contents($remoteFile));
		return $filepath;
	}

	public function videoFrame($video_id)
	{

		if (is_file($_SERVER['DOCUMENT_ROOT'].'/uploads/youtube/'.$video_id.'.jpg'))
			return '/uploads/youtube/'.$video_id.'.jpg';

		$yt = new \helper\YTChannel('AIzaSyAX2RDygDexQhJ2QXhBUvY4LPlNZdlzXb8');

		$output = $yt->video_info($video_id);

		if (!empty($output['thumbnails']['hd']))
			return $this->storeFrame($output['thumbnails']['hd'], $video_id);
		
			if (!empty($output['thumbnails']['high']))
			return $this->storeFrame($output['thumbnails']['high'], $video_id);
		
		if (!empty($output['thumbnails']['default']))
			return $this->storeFrame($output['thumbnails']['default'], $video_id);
		
		return '/stream?image=/uploads/thumbnails/video.webp';
	}
}