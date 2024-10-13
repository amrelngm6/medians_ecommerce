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
	
    public $cliendSecret;

	public $cliendId;

	function __construct($client_id, $client_secret)
	{

        $this->cliendId = $client_id;

        $this->cliendSecret = $client_secret;

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

            $fb = $this->client;

            $helper = $fb->getRedirectLoginHelper();

            try {
                $accessToken = $helper->getAccessToken();
            } catch (\Facebook\Exceptions\FacebookResponseException $e) {
                echo 'Graph returned an error: ' . $e->getMessage();
                exit;
            } catch (\Facebook\Exceptions\FacebookSDKException $e) {
                echo 'Facebook SDK returned an error: ' . $e->getMessage();
                exit;
            }
            
            if (!isset($accessToken)) {
                if ($helper->getError()) {
                    echo "Error: " . $helper->getError() . "\n";
                    echo "Error Code: " . $helper->getErrorCode() . "\n";
                    echo "Error Reason: " . $helper->getErrorReason() . "\n";
                    echo "Error Description: " . $helper->getErrorDescription() . "\n";
                } else {
                    echo 'Bad request';
                }
                exit;
            }
            
            // Debug the token metadata
            $oAuth2Client = $fb->getOAuth2Client();
            $tokenMetadata = $oAuth2Client->debugToken($accessToken);
            
            // Validate that the token belongs to the correct app
            $tokenMetadata->validateAppId($this->cliendId);  // This should match your actual App ID
            $tokenMetadata->validateExpiration(); // Validate that the token has not expired
                



            if (!$accessToken->isLongLived()) {
                // Exchange short-lived token for long-lived token if necessary
                try {
                  $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
                } catch (\Facebook\Exceptions\FacebookSDKException $e) {
                  echo 'Error getting long-lived access token: ' . $e->getMessage();
                  exit;
                }
              }
              
              // Set the access token in the session
              $_SESSION['fb_access_token'] = (string) $accessToken;
              
              // Now you can make API requests for user data
              try {
                $response = $fb->get('/me?fields=id,name,email,picture.type(large)', $accessToken);
                $user_info = $response->getGraphUser();
              } catch(\Facebook\Exceptions\FacebookResponseException $e) {
                echo 'Graph returned an error: ' . $e->getMessage();
                exit;
              } catch(\Facebook\Exceptions\FacebookSDKException $e) {
                echo 'Facebook SDK returned an error: ' . $e->getMessage();
                exit;
              }
              
            
            $localPic = $this->saveImageFromUrl($user['picture']['url'], '/uploads/images/'.md5($user_info['picture']['url']).'.jpg');
              
			// Prepare user data to store
			$params['email'] = $user_info['email'];
			$params['name'] = $user_info['name'];
			$params['picture'] = $localPic;
			$params['status'] = 'on';

			$user = $this->repo->findByEmail($params['email']);

			if (isset($user->customer_id))
				$user->update(['picture' => $localPic]);
			else 
				$user = $this->repo->store($params);

			// Check if user saved
			if (isset($user->customer_id)){
				$this->setSession($user);
		    	$this->repo->setCustomCode((object) $user, 'facebook_id', $user_info['id']);
			} else {
				return null;
			}  

			echo $this->app->redirect(isset($user->field['activation_token']) ? './activate-account/'.$user->field['activation_token'] : '/customer/dashboard');

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