<?php

namespace Medians\Media\Application;
use Shared\dbaser\CustomController;

use Google\Cloud\Storage\StorageClient;

class YoutubeService extends CustomController 
{

	protected $app;

	protected $client;
    
	protected $bucketName;
	
	function __construct($apiKey)
	{
        // Create a Google Cloud Storage client
        $this->client = new \Google_Client();

        $this->client->setDeveloperKey($apiKey);

        // Bucket name
        
	}

    /**
     * Upload file to Google Storage
     * 
     * @param $filePath String ( Full path ) 
     * @param $destination String  ( Path )
     */
    function checkVideo($filePath) {

        // Create a YouTube service object
        $youtube = new \Google_Service_YouTube($client);

        // The video ID you want details for
        $videoId = 'e3QZ39fy2pA';

        try {
            // Call the API's videos.list method to get the video details
            $response = $youtube->videos->listVideos('snippet,contentDetails,statistics', array(
                'id' => $videoId,
            ));

            // Access the video details
            $videoDetails = $response['items'][0];
            
            // Print video details
            echo 'Title: ' . $videoDetails['snippet']['title'] . PHP_EOL;
            echo 'Description: ' . $videoDetails['snippet']['description'] . PHP_EOL;
            echo 'Published At: ' . $videoDetails['snippet']['publishedAt'] . PHP_EOL;
            echo 'Views: ' . $videoDetails['statistics']['viewCount'] . PHP_EOL;
            echo 'Likes: ' . $videoDetails['statistics']['likeCount'] . PHP_EOL;

        } catch (Google_Service_Exception $e) {
            echo 'A service error occurred: ' . htmlspecialchars($e->getMessage());
        } catch (Google_Exception $e) {
            echo 'An client error occurred: ' . htmlspecialchars($e->getMessage());
        }
    }
    
}