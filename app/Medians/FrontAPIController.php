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
			case 'load_products':
				return (new Products\Application\ProductController)->load_products();
				break;
			case 'search_products':
				return (new Products\Application\ProductController)->search_products();
				break;
			case 'quick-search':
				return (new Products\Application\ProductController)->quick_search_products();
				break;
			case 'load_side_cart':
				return (new Cart\Application\CartController)->sideCart();
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
	
				case 'Wishlist.create':
					return printResponse((new Cart\Application\WishlistController())->store());
					break;
	
				case 'Compare.create':
					return printResponse((new Cart\Application\CompareController())->store());
					break;
		
				case 'Order.create':
					return printResponse((new Orders\Application\OrderController())->store());
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
		
				case 'Transaction.verify':
					$return = (new Transactions\Application\TransactionController)->verifyTransaction();
					break;
		
				case 'Comment.create':
					$return = (new Comments\Application\CommentController)->store();
					break;
		
				case 'Follower.create':
					$return = (new Followers\Application\FollowerController)->store();
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
			
			case 'MediaItem.update':
				$controller = new Media\Application\MediaItemController;
				break;
			
			case 'Audiobook.update':
				$controller = new Media\Application\AudiobookController;
				break;
			
			case 'Audiobook.upload_file':
				return printResponse((new Media\Application\AudiobookController)->upload());
				break;
			
			
			case 'Audiobook.update_chapters':
				return printResponse((new Media\Application\AudiobookController)->update_chapters());
				break;
			
			case 'StationMedia.update':
				return printResponse((new Media\Application\AudiobookController)->update_item());
				break;
			
			case 'Comment.update':
				$controller = new Comments\Application\CommentController;
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
