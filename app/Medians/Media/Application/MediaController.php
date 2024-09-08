<?php

namespace Medians\Media\Application;
use Shared\dbaser\CustomController;

use Medians\Media\Infrastructure\MediaRepository;


class MediaController extends CustomController 
{

	protected $app;
	
	protected $repo;

	function __construct()
	{
		$this->repo = new MediaRepository;
	}

	public function list()
	{

		return json_encode($this->repo->getList());

	}


	public function media()
	{
		$this->app = new \config\APP;

		$user = $this->app->auth();

		echo json_encode(['media'=> ($this->app->request()->get('page') == 1) ? $this->repo->getList($this->app->request()->get('media'), $user) : []]);

	}

	public function upload()
	{
		$this->app = new \config\APP;

		foreach ($this->app->request()->files as $key => $value) {
			$this->repo->upload($value);
		}
		return json_encode(['data'=> ['message'=>'Uploaded successfully']]);
	}

	public function uploadFile($type)
	{
		$this->app = new \config\APP;

		foreach ($this->app->request()->files as $key => $value) {
			if ($value)
			{
				return $this->repo->upload($value, $type);
			}
		}
		
	}

	public function delete()
	{
		try {
			
			$this->app = new \config\APP;
		
		    $item = json_decode($this->app->request()->get('file_name'));

			echo $this->repo->delete($item->file_name);

			echo json_encode(['data'=> ['message'=>translate('Deleted')]]);
			

		} catch (\Exception $e) {
			throw new Exception("Error Processing Request ".$e->getMessage(), 1);
			
		}
	}


	public function stream()
	{
		$this->app = new \config\APP;
		$filepath = $this->app->request()->get('image');
		$isThumbnail = $this->app->request()->get('thumbnail');

		if (!empty($isThumbnail))
		{
			$resized = $this->repo->resize($filepath, $isThumbnail);
			$filepath = is_file($_SERVER['DOCUMENT_ROOT'].$resized) ? $resized : $filepath;
		}

		if (strpos($filepath, 'uploads/') && is_file($_SERVER['DOCUMENT_ROOT'].$filepath))
		{

			$ext = explode('.', $filepath);
			// Set the caching headers
			$expires = 60 * 60 * 24 * 7; // 1 week (in seconds)
			header("Cache-Control: public, max-age=$expires");
			header("Expires: " . gmdate("D, d M Y H:i:s", time() + $expires) . " GMT");

			// Serve the CSS file
			$extension = "image/".end($ext);
			header("Content-Type: $extension");
			readfile($_SERVER['DOCUMENT_ROOT'].$filepath);

		} else {
			echo $_SERVER['DOCUMENT_ROOT'].$filepath;
		} 
	}

	public function stream_audio()
	{
		$this->app = new \config\APP;
		$filepath = '/uploads/audio/' . $this->app->request()->get('audio');

		if (strpos($filepath, 'uploads/') && is_file($_SERVER['DOCUMENT_ROOT'].$filepath))
		{
			$filename = explode('.', $filepath);

			$extension = "mp3";
			$mime_type = "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3";

			$file = $_SERVER['DOCUMENT_ROOT'].$filepath;

			if(file_exists($file)){
				header('Content-type: {$mime_type}');
				header('Content-length: ' . filesize($file));
				header('Content-Disposition: filename="' . $filename[0]);
				header('X-Pad: avoid browser bug');
				header('Cache-Control: no-cache');
				readfile($file);
			}else{
				header("HTTP/1.0 404 Not Found");
			}

			// $ext = explode('.', $filepath);
			// Set the caching headers
			// $expires = 60 * 60 * 24 * 7; // 1 week (in seconds)
			// header("Cache-Control: public, max-age=$expires");
			// header("Expires: " . gmdate("D, d M Y H:i:s", time() + $expires) . " GMT");
			// header('Content-Disposition: attachment; filename="'.basename($filepath).'"');

			// // Serve the CSS file
			// $extension = "audio/mpeg";
			// header("Content-Type: $extension");
			// header("Content-Length: ". filesize($filesize));
			// header("Accept-Ranges", "bytes");
			// header('Pragma: public');
			// header('Cache-Control: must-revalidate');
			// header('Expires: 0');

			// readfile($_SERVER['DOCUMENT_ROOT'].$filepath);

		} else {
			// echo $_SERVER['DOCUMENT_ROOT'].$filepath;
		} 
	}


	public function assets()
	{
		$this->app = new \config\APP;
		$filepath = $this->app->request()->get('asset');

		if (!strpos($filepath, '..') && is_file($_SERVER['DOCUMENT_ROOT'].$filepath))
		{
			// Set the caching headers
			$expires = 60 * 60 * 24 * 7; // 1 week (in seconds)
			header("Cache-Control: public, max-age=$expires");
			header("Expires: " . gmdate("D, d M Y H:i:s", time() + $expires) . " GMT");

			$type = "text/css";

			// Serve the CSS file
			header("Content-Type: $type");
			readfile($_SERVER['DOCUMENT_ROOT'].$filepath);
		} 
	}

}
