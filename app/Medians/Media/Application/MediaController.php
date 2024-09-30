<?php

namespace Medians\Media\Application;
use Shared\dbaser\CustomController;

use Medians\Media\Infrastructure\MediaRepository;
use Medians\Media\Infrastructure\MediaItemRepository;

use getID3;

class MediaController extends CustomController 
{

	protected $app;
	
	protected $repo;

	protected $mediaRepo;

	function __construct()
	{
		$this->repo = new MediaRepository;
		$this->mediaRepo = new MediaItemRepository;

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

			$delete =  $this->repo->delete($item->file_name);

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
		$h = $this->app->request()->get('h');
		$folder = $this->app->request()->get('dir') ?? 'images';

		if (!empty($folder))
		{
			$filepath = '/uploads/'.$folder.'/'.$filepath;
		}

		if (!empty($isThumbnail))
		{
			$resized = $this->repo->resize($filepath, $isThumbnail, $h > 0 ? $h : '-1');
			$filepath = is_file($_SERVER['DOCUMENT_ROOT'].$resized) ? $resized : $filepath;
		}

		if (is_file($_SERVER['DOCUMENT_ROOT'].$filepath))
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

		$this->isDirectAccess();

		
		$this->app = new \config\APP;
		$settings = $this->app->SystemSetting();

		if (file_exists($_SERVER['DOCUMENT_ROOT'].'/uploads/audio/' . $this->app->request()->get('audio'))) {
			$filepath = '/uploads/audio/' . $this->app->request()->get('audio');
		} elseif (file_exists($_SERVER['DOCUMENT_ROOT'].'/uploads/audio/tmp/' . $this->app->request()->get('audio')))
		{
			$filepath = '/uploads/audio/tmp/' . $this->app->request()->get('audio');
		}

		$item = $this->mediaRepo->findByFile($filepath);

		if (isset($item->main_file->storage) && $item->main_file->storage == 'google')
		{
			$service = new GoogleStorageService();
			$filepath = '/uploads/audio/tmp/' . $this->app->request()->get('audio');
			
			$tmpFilePath = $_SERVER['DOCUMENT_ROOT'].'/uploads/audio/tmp/'.md5($filePath).'.mp3';

			$startTime = $this->app->request()->get('s');

			return file_exists($tmpFilePath) 
			? $this->streamAudioFromTimeRange($tmpFilePath, $startTime, 0)
			: $this->stream_external($service->generateSignedUrl($item->main_file->path), $tmpFilePath, $startTime, 0);
			// $upload = file_exists($_SERVER['DOCUMENT_ROOT'] . $filepath) ? null : file_put_contents($_SERVER['DOCUMENT_ROOT'] . $filepath, file_get_contents($service->generateSignedUrl($item->main_file->path)));
		}

		if ($item)
			$item->addView();

		if (is_file($_SERVER['DOCUMENT_ROOT'].$filepath))
		{

			$filename = explode('.', $filepath);

			$file_path = $_SERVER['DOCUMENT_ROOT'].$filepath;

			// Get the file size and MIME type
			$file_size = filesize($file_path);
			$mime_type = mime_content_type($file_path);

			// Handle range requests (for seeking)
			$start = 0;
			$length = $file_size;
			$end = $file_size - 1;

			if (isset($_SERVER['HTTP_RANGE'])) {
				$range = $_SERVER['HTTP_RANGE'];
				list(, $range) = explode('=', $range, 2);
				if (strpos($range, ',') !== false) {
					header("HTTP/1.1 416 Requested Range Not Satisfiable");
					header("Content-Range: bytes */$file_size");
					exit;
				}
				list($start, $end) = explode('-', $range);
				$start = intval($start);
				if ($end === "") {
					$end = $file_size - 1;
				} else {
					$end = intval($end);
				}
				if ($start > $end || $end >= $file_size) {
					header("HTTP/1.1 416 Requested Range Not Satisfiable");
					header("Content-Range: bytes */$file_size");
					exit;
				}
				$length = $end - $start + 1;
				header("HTTP/1.1 206 Partial Content");
				header("Content-Range: bytes $start-$end/$file_size");
			}

			// Set the headers to stream the file
			header("Content-Type: $mime_type");
			header("Content-Length: $length");
			header("Accept-Ranges: bytes");
			header("Content-Disposition: inline; filename=\"$file_name\"");

			// Open the file and stream the requested portion
			$handle = fopen($file_path, 'rb');
			fseek($handle, $start);
			$buffer_size = 1024 * 8; // 8KB buffer
			while (!feof($handle) && ($start <= $end)) {
				echo fread($handle, min($buffer_size, $end - $start + 1));
				$start += $buffer_size;
				ob_flush();
				flush();
			}
			fclose($handle);
		} 
		exit;
	}


	public function stream_station()
	{
		
		$this->app = new \config\APP;
		$settings = $this->app->SystemSetting();
		$stationId = $this->app->request()->get('station_id');
		
		$stationRepo = new \Medians\Stations\Infrastructure\StationRepository; 
		$station = $stationRepo->find($stationId);

		try {
			$stationMedia = $station->activeItem;
			
			if (empty($stationMedia->start_at))
				return;


			$targetTime = new \DateTime($stationMedia->start_at);
			$currentTime = new \DateTime();

			$interval = $targetTime->diff($currentTime);
			$startTime = ($interval->h * 3600) + ($interval->i * 60) + $interval->s;
				
			$filePath =  isset($stationMedia->media->main_file->path) ? ($stationMedia->media->main_file->path) : $stationMedia->media_path;

		} catch (\Throwable $th) {
		}

		// Check if the streaming media is external link
		if (substr($filePath, 0 , 4) == 'http' &&  empty($stationMedia->media)) {

			// Stream External files
			$tmpFilePath = $_SERVER['DOCUMENT_ROOT'].'/uploads/audio/tmp/'.md5($filePath).'.mp3';
			return $this->stream_external($filePath, $tmpFilePath, $startTime, $settings['station_media_chunk'] ?? 60);
		} 
		

		// Check if the file is stored locally
		if (substr($filePath, 0 , 4) == '/upl' &&  file_exists($_SERVER['DOCUMENT_ROOT'].$filePath))
		{
			return $this->streamAudioFromTimeRange($_SERVER['DOCUMENT_ROOT'].$filePath, $startTime, $settings['station_media_chunk'] ?? 60, $stationMedia->duration);
		} 
	}

	public function streamAudioFromTimeRange($filePath, $startTimeInSeconds = 0, $streamDuration = 60, $duration = 0) {
		
		
		if (!file_exists($filePath)) {
			header("HTTP/1.0 404 Not Found");
			return;
		}
		
	
		$getID3 = new \getID3;
		$fileInfo = $getID3->analyze($filePath);
	
		$totalDuration = !empty($fileInfo['playtime_seconds']) ? $fileInfo['playtime_seconds'] : $duration;
		$bitRate = $fileInfo['bitrate']; // Bitrate in bits per second
		
		$streamDuration = $streamDuration > 0 ? $streamDuration : ($totalDuration - $startTimeInSeconds);
		// Calculate byte offset for the start time
		$startByte = (int)(($startTimeInSeconds / $totalDuration) * $fileInfo['filesize']);
		$endByte = (int)(($streamDuration / $totalDuration) * $fileInfo['filesize']) + $startByte;
	
		// Open the file
		$fm = @fopen($filePath, 'rb');
		if (!$fm) {
			header("HTTP/1.0 505 Internal server error");
			return;
		}
	
		// Prevent session blocking
		session_write_close();
		ignore_user_abort(true); // Continue streaming even if the user disconnects
	
		// Seek to the start byte
		fseek($fm, $startByte);
	
		$contentLength = $endByte - $startByte;
		header("Content-Type: audio/mpeg");
		header("Accept-Ranges: bytes");
		header("Content-Length: " . $contentLength);
		header("Content-Range: bytes $startByte-$endByte/" . filesize($filePath));
		header("X-Pad: avoid browser bug");
		header("Cache-Control: no-cache");
	
		// Stream the file
		$bufferSize = 8192;
		$bytesSent = 0;
		while (!feof($fm) && ($bytesSent < $contentLength)) {
			$buffer = fread($fm, $bufferSize);
			echo $buffer;
			flush();
			$bytesSent += strlen($buffer);
	
			// Stop when we have sent enough bytes for the specified duration
			if ($bytesSent >= $contentLength) {
				break;
			}
		}
	
		fclose($fm);
		exit;
	}
	
	public function stream_external($fileUrl, $tmpFilePath, $startTimeInSeconds = 0, $streamDuration = 60)
	{
		
		if (!file_exists($tmpFilePath)) {
			$saveTmpFile = file_put_contents($tmpFilePath, fopen($fileUrl, 'r'));
		}
		
		return $this->streamAudioFromTimeRange($tmpFilePath, $startTimeInSeconds, $streamDuration);
	}


	function streamVideo($startTimeInSeconds = 0, $streamDuration = 20) {

		$this->app = new \config\APP;
		$video = $this->app->request()->get('video');
		$startTimeInSeconds = $this->app->request()->get('s');
		$streamDuration = $this->app->request()->get('d');

		$filePath = $_SERVER['DOCUMENT_ROOT'].'/uploads/videos/'.$video;


		if (!file_exists($filePath)) {
			header("HTTP/1.0 404 Not Found");
			return;
		}
	
		// Analyze the file using getID3 for duration and bitrate
		$getID3 = new \getID3;
		$fileInfo = $getID3->analyze($filePath);
	
		// Get total duration and bitrate
		$totalDuration = !empty($fileInfo['playtime_seconds']) ? $fileInfo['playtime_seconds'] : $duration;
		$bitRate = !empty($fileInfo['bitrate']) ? $fileInfo['bitrate'] : 0; // Bitrate in bits per second
		$fileSize = $fileInfo['filesize']; // File size in bytes
	
		$streamDuration = $streamDuration > 0 ? $streamDuration : ($totalDuration - $startTimeInSeconds);

		// Calculate byte offset for the start and end time based on the stream duration
		$startByte = (int)(($startTimeInSeconds / $totalDuration) * $fileSize);
		$endByte = (int)(($streamDuration / $totalDuration) * $fileSize) + $startByte;
	
		// Open the file
		$fm = @fopen($filePath, 'rb');
		if (!$fm) {
			header("HTTP/1.0 505 Internal server error");
			return;
		}
	
		// Prevent session blocking and allow streaming after user disconnect
		session_write_close();
		ignore_user_abort(true); // Continue streaming even if the user disconnects
	
		// Seek to the start byte
		fseek($fm, $startByte);
	
		$contentLength = $endByte - $startByte;
	
		// Set appropriate headers for video content
		$mimeType = !empty($fileInfo['mime_type']) ? $fileInfo['mime_type'] : "video/mp4";
		header("Content-Type: $mimeType");
		header("Accept-Ranges: bytes");
		header("Content-Length: " . $contentLength);
		header("Content-Range: bytes $startByte-$endByte/$fileSize");
		header("X-Pad: avoid browser bug");
		header("Cache-Control: no-cache");
	
		// Stream the file in chunks (buffer size: 8KB)
		$bufferSize = 8192;
		$bytesSent = 0;
		while (!feof($fm) && ($bytesSent < $contentLength)) {
			$buffer = fread($fm, $bufferSize);
			echo $buffer;
			flush(); // Ensure immediate delivery to the client
			$bytesSent += strlen($buffer);
	
			// Stop when we have sent enough bytes for the specified duration
			if ($bytesSent >= $contentLength) {
				break;
			}
		}
	
		fclose($fm);
		exit;
		
	}
	
	function isDirectAccess() {
		print_r($_SERVER);
		// Check the user-agent
		$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
		$referer = $_SERVER['HTTP_REFERER'] ?? '';
	
		// Check if there's a referrer (usually means it's embedded in an HTML page)
		if (empty($referer)) {
			exit; // Assume embedded access
		}
	
		// You can also inspect the user-agent for clues
		if (stripos($userAgent, 'Mozilla') == false || stripos($userAgent, 'Chrome') == false) {
			exit; // Assume embedded access
		}
	
		return false; // Assume embedded access
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
