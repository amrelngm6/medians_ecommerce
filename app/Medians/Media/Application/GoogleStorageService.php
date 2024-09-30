<?php

namespace Medians\Media\Application;
use Shared\dbaser\CustomController;

use Google\Cloud\Storage\StorageClient;

class GoogleStorageService extends CustomController 
{

	protected $app;

	protected $bucketName;
	
	function __construct()
	{

        $this->bucketName = 'medians-streaming';
        
	}


    function uploadFileToGCS($filePath, $destination) {

        // Create a Google Cloud Storage client
        $storage = new StorageClient([
            'keyFilePath' => $_SERVER['DOCUMENT_ROOT'].'/app/Shared/GoogleStorageService.json' // Path to service account JSON file
        ]);
 
        // Get the bucket
        $bucket = $storage->bucket($this->bucketName);

        // Upload the file
        $file = fopen($filePath, 'r');
        $bucket->upload($file, [
            'name' => $destination // The destination in the bucket
        ]);

        return "$this->bucketName$destination";
    }
}