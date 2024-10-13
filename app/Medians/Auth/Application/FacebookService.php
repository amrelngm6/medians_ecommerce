<?php

namespace Medians\Auth\Application;


use Medians\Mail\Application\MailService;

use Medians\Auth\Domain\AuthModel;

use Medians\Settings\Application\SystemSettingsController;


class FacebookService 
{

	/**
	* @var Instance Repo
	*/
	protected $repo;

	/**
	* @var Instance App
	*/
	protected $app;
	
	public $client;

	function __construct($client_id, $client_secret)
	{

		$this->app = new \config\APP;
		
		$this->repo = new \Medians\Users\Infrastructure\UserRepository();


        $this->client = new \Facebook\Facebook([
            'app_id' => $client_id,
            'app_secret' => $client_secret,
            'default_graph_version' => 'v17.0',
        ]);
        
	}


	public function getLoginUrl()
	{

        $helper = $this->client->getRedirectLoginHelper();
        
        $permissions = ['email']; // Optional: Add more permissions like 'user_photos', etc.
        
        return $helper->getLoginUrl($this->app->CONF['url'].'facebook_login_redirect', $permissions);
	}


	public function verifyLoginWithFacebook()
	{

		$this->app = new \config\APP;


		try {
				
			// Get system settings for Facebook Login
			$SystemSettings = new SystemSettingsController;

			$settings = $SystemSettings->getAll();

			$Facebook = new FacebookService($settings['facebook_login_key'], $settings['facebook_login_secret']);

			$code = $this->app->request()->get('code');

		  	$Facebook->client->setAccessToken($Facebook->client->fetchAccessTokenWithAuthCode($code));

		  	// Check if code is expired or invalid
		  	if($Facebook->client->isAccessTokenExpired())
		  	{
	  			return false;
		  	}


	  		// Get user data through API
			$google_oauth = new Google_Service_Oauth2($Google->client);
			$user_info = $google_oauth->userinfo->get();

			// Prepare user data to store
			$pictureName = rand(999999, 999999).date('Ymdhis').'.jpg';
			$params['email'] = $user_info['email'];
			$params['first_name'] = $user_info['givenName'];
			$params['last_name'] = $user_info['familyName'];
			$params['role_id'] = '3';
			$params['picture'] = $this->saveImageFromUrl($user_info['picture'], '/uploads/customers/'.$pictureName) ;

			$user = $this->repo->getByEmail($params['email']);

			if (isset($user->id))
				$user->update(['picture' => $user_info['picture']]);
			else 
				$user = $this->repo->store($params);

			// Check if user saved
			if (isset($user->id)){
				$this->setSession($user);
		    	$this->repo->setCustomCode((object) $user, 'facebook_id', $user_info['id']);
			} else {
				return null;
			}  

			echo $this->app->redirect('/dashboard');

		} catch (Exception $e) {
			return array('error'=>$e->getMessage());
		}


	}



	/**
	 * Set session  
	 */ 
	public function setSession($data, $code = null) 
	{

		$AuthService = new AuthService;

		return $AuthService->setSession($data, $code);
	}


	function saveImageFromUrl($url, $localPath) 
	{
		$image = file_get_contents($url);
		if ($image !== false) {
			file_put_contents($_SERVER['DOCUMENT_ROOT']. $localPath, $image);
			return $localPath; 
		}
	}






}
