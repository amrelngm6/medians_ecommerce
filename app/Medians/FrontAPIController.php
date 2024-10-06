<?php

namespace Medians;

use \Shared\dbaser\CustomController;


class FrontAPIController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;
	protected $app;

	protected $BugReportRepo;



	function __construct()
	{
	
	}


	/**
	 * Model object 
	 * 
	 */
	public function handle()
	{

		$this->app = new \config\APP;

		$type = $this->app->request()->get('type');
		$return = [];
		switch ($type) 
		{
			case 'load-list':
				return (new Media\Application\MediaItemController)->search_popup();
				break;
				
			case 'load-videos-list':
				return (new Media\Application\VideoController)->search_popup();
				break;
				
			case 'station-media-popup':
				return (new Stations\Application\StationMediaController)->media_popup();
				break;
				
			case 'station-media-json':
				return (new Stations\Application\StationMediaController)->json_media();
				break;
				
				
			case 'channel-media-popup':
				return (new Channels\Application\ChannelMediaController)->media_popup();
				break;
				
			case 'channel-media-json':
				return (new Channels\Application\ChannelMediaController)->json_media();
				break;
				
			case 'comments-list':
				return (new Comments\Application\CommentController)->load_stream_comments();
				break;
				
			case 'load-video-screenshots':
				return (new Media\Application\VideoController)->load_screenshots();
				break;
				
		}

		$return = isset($controller) ? $controller->find($this->app->request()->get('id')) : $return;

		return printResponse(json_encode(['status'=>true, 'result'=>$return]));
	} 

	/**
	 * Create model 
	 * 
	 */
	public function create()
	{
		
		$app = new \config\APP;
		$request = $app->request();
		
		try {
				
			$return = [];
			switch ($request->get('type')) 
			{
					
				case 'HelpMessage.create':
					return printResponse((new Help\Application\HelpMessageController())->store());
					break;
					
				case 'MediaItem.create':
					return printResponse((new Media\Application\MediaItemController())->store());
					break;

				case 'MediaItem.upload':
					return printResponse((new Media\Application\MediaItemController())->upload());
					break;

				case 'Audiobook.create':
					return printResponse((new Media\Application\AudiobookController())->store());
					break;

				case 'Video.upload':
					return printResponse((new Media\Application\VideoController())->upload());
					break;
	
				case 'HelpMessageComment.create':
					$return =  (new Help\Application\HelpMessageController())->storeComment(); 
					break;
					
				case 'Subscriber.create':
					$return = (new Newsletters\Application\SubscriberController)->store();
					break;
					
				case 'Customer.create':
					$return = (new Customers\Application\CustomerController)->store();
					break;
					
				case 'Review.create':
					$return = (new Reviews\Application\ReviewController)->store();
					break;
		
				case 'Playlist.create':
					$return = (new Playlists\Application\PlaylistController)->store();
					break;
		
				case 'Playlist.add':
					$return = (new Playlists\Application\PlaylistController)->add_item();
					break;
	
				case 'Like.media':
					$return = (new Likes\Application\LikeController)->likeMedia();
					break;
		
				case 'Like.playlist':
					$return = (new Likes\Application\LikeController)->likePlaylist();
					break;

				case 'Like.station':
					$return = (new Likes\Application\LikeController)->likeStation();
					break;

				case 'Like.channel':
					$return = (new Likes\Application\LikeController)->likeChannel();
					break;
		
				case 'Comment.create':
					return (new Comments\Application\CommentController)->store();
					break;
		
				case 'Follower.create':
					$return = (new Followers\Application\FollowerController)->store();
					break;
		
				case 'Station.create':
					$return = (new Stations\Application\StationController)->store();
					break;
						
				case 'StationMedia.create':
					$return = (new Stations\Application\StationMediaController)->store();
					break;

				case 'StationMedia.create_record':
					$return = (new Stations\Application\StationMediaController)->store_record();
					break;

				case 'Channel.create':
					$return = (new Channels\Application\ChannelController)->store();
					break;
						
				case 'ChannelMedia.create':
					$return = (new Channels\Application\ChannelMediaController)->store();
					break;
	
				case 'ShortVideo.create':
					$return = (new Media\Application\ShortVideoController)->store();
					break;
	
			}

			return printResponse(json_encode($return));

		} catch (Exception $e) {
			return $e->getMessage();
		}
	} 

	/**
	 * Update model 
	 * 
	 */
	public function update()
	{
		$app = new \config\APP;
		$request = $app->request();

		switch ($request->get('type')) 
		{
			
				
			case 'HelpMessage.update':
				$controller =  new Help\Application\HelpMessageController;
				break;

			case 'Subscriber.update':
				$controller = new Newsletters\Application\SubscriberController;
				break;
			
			case 'Customer.changePassword':
				return  (new Auth\Application\CustomerAuthService)->changePassword();
				break;
			
			case 'Customer.update':
				$controller = new Customers\Application\CustomerController;
				break;
			
			case 'Mediaitem.update':
			case 'MediaItem.update':
				$controller = new Media\Application\MediaItemController;
				break;
			
			case 'Audiobook.update':
				$controller = new Media\Application\AudiobookController;
				break;

			case 'Video.update':
				$controller = new Media\Application\VideoController;
				break;
			
			case 'Audiobook.upload_file':
				return printResponse((new Media\Application\AudiobookController)->upload());
				break;
			
			
			case 'Audiobook.update_chapters':
				return printResponse((new Media\Application\AudiobookController)->update_chapters());
				break;
			

			case 'Comment.update':
				$controller = new Comments\Application\CommentController;
				break;
			
			case 'Station.update':
				$controller = new Stations\Application\StationController;
				break;

			case 'StationMedia.update':
				$controller = new Stations\Application\StationMediaController;
				break;
				
			case 'Channel.update':
				$controller = new Channels\Application\ChannelController;
				break;

			case 'ChannelMedia.update':
				$controller = new Channels\Application\ChannelMediaController;
				break;

			case 'ShortVideo.update':
				$controller = new Media\Application\ShortVideoController;
				break;
				
			case 'ShortVideo.update_video':
				return printResponse((new Media\Application\ShortVideoController)->update_video());
				break;
				


		}

		return printResponse(isset($controller) ? json_encode($controller->update()) : []);
	} 

	

	/**
	 * delete model 
	 * 
	 */
	public function delete()
	{

		$app = new \config\APP;
		$request = $app->request();

		try {
			
			$return = [];
			switch ($request->get('type')) 
			{

				case 'HelpMessage.delete':
					return printResponse((new Help\Application\HelpMessageController())->delete());
					break;

				case 'Subscriber.delete':
					return printResponse((new Newsletters\Application\SubscriberController())->delete());
					break;
			
				case 'Cart.delete':
					return printResponse((new Cart\Application\CartController())->delete());
					break;
			
				case 'Wishlist.delete':
					return printResponse((new Cart\Application\WishlistController())->delete());
					break;

				case 'Compare.delete':
					return printResponse((new Cart\Application\CompareController())->delete());
					break;

				case 'Review.delete':
					return printResponse((new Reviews\Application\ReviewController())->delete());
					break;

				case 'Comment.delete':
					return printResponse((new Comments\Application\CommentController())->delete());
					break;
		
				case 'Follower.unfollow':
					return printResponse((new Followers\Application\FollowerController())->unfollow());
					break;
				
				case 'PlaylistItem.delete':
					return printResponse((new Playlists\Application\PlaylistController())->deleteItem());
					break;
				
				
				case 'StationMedia.delete':
					return printResponse((new Stations\Application\StationMediaController())->delete());
					break;
				
				case 'ChannelMedia.delete':
					return printResponse((new Channels\Application\ChannelMediaController())->delete());
					break;
				
				case 'MediaItem.delete':
					return printResponse((new Media\Application\MediaItemController())->delete());
					break;
				
			
			}

		} catch (Exception $e) {
			throw new Exception("Error Processing Request", 1);
					
		}
	} 


	/**
	 * Debug function that takes screenshot 
	 * and save at the server with txt file 
	 * with full log
	 */
	public function bug_report()
	{
		$this->app = new \config\APP;

		$info = $_POST['info'];
		$err = $_POST['err'];
		$root_path_info = pathinfo(dirname(__DIR__));
		$output = date('YmdHis').'-'.$this->app->auth()->id.'-'.$info;
		file_put_contents($root_path_info['dirname'].'/uploads/bugs/'.$output.'.jpg', file_get_contents($_POST['image']));

		$txtLog = $root_path_info['dirname'].'/uploads/bugs/error_bugs.txt'; 
		file_put_contents($txtLog, file_get_contents($txtLog)."\r\n".$output . $err);

		$this->BugReportRepo = new BugReportRepository;

		$data = array();
		$data['user_id'] = $this->app->auth()->id;
		$data['file_name'] = $output.'.jpg';
		$data['info'] =  $info;
		$data['error'] =  $err;
		$this->BugReportRepo->store($data);

	}

}
