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
		$this->app = new \config\APP;
		$filepath = '/uploads/audio/' . $this->app->request()->get('audio');

		$item = $this->mediaRepo->findByFile($filepath);

		$addView = $item->addView();

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


	function streamAudioFromTime($filePath, $startTimeInSeconds = 0) {
		if (!file_exists($filePath)) {
			header("HTTP/1.0 404 Not Found");
			return;
		}
	
		$getID3 = new \getID3;
		$fileInfo = $getID3->analyze($filePath);
	
		if (!isset($fileInfo['playtime_seconds'])) {
			header("HTTP/1.0 500 Internal Server Error");
			return;
		}
	
		$totalDuration = $fileInfo['playtime_seconds'];
		$bitRate = $fileInfo['bitrate'];
	
		// Calculate byte offset
		$byteOffset = (int)(($startTimeInSeconds / $totalDuration) * $fileInfo['filesize']);
	
		// Ensure the byte offset is at a valid MP3 frame
		$byteOffset = $this->findValidMP3Frame($filePath, $byteOffset);
	
		$fm = @fopen($filePath, 'rb');
		if (!$fm) {
			header("HTTP/1.0 505 Internal server error");
			return;
		}
	
		fseek($fm, $byteOffset);
		$size = filesize($filePath) - $byteOffset;
	
		header("Content-Type: audio/mpeg");
		header("Cache-Control: public, must-revalidate");
		header("Pragma: no-cache");
		header("Accept-Ranges: bytes");
		// header("Content-Length: " . $size);
		header("X-Pad: avoid browser bug");
		header("Content-Duration: " . ($totalDuration - $startTimeInSeconds));
		header("Content-Length: " . ($fileInfo['filesize'] - $byteOffset));  // Set content length from the byte offset

	
		// Output file from the calculated position
		$buffer = 8192;
		while(!feof($fm) && ($p = ftell($fm)) <= filesize($filePath)) {
			if ($p + $buffer > filesize($filePath)) {
				$buffer = filesize($filePath) - $p;
			}
			echo fread($fm, $buffer);
			flush();
		}
	
		fclose($fm);
		exit;
	}
	
	function findValidMP3Frame($filePath, $startByte) {
		$fm = fopen($filePath, 'rb');
		fseek($fm, $startByte);	
		// Look for the next valid MP3 frame header

		while (!feof($fm)) {
			$headerBytes = fread($fm, 4);
			if (strlen($headerBytes) < 4) break;
	
			$headerData = unpack('N', $headerBytes)[1];
			
			// Check for a valid MP3 frame header
			if (($headerData & 0xFFE00000) == 0xFFE00000) {
				return ftell($fm) - 4;  // Return the position of the frame start
			}
	
			fseek($fm, -3, SEEK_CUR);  // Move back 3 bytes and try again
		}
	
		fclose($fm);
		return $startByte;  // If no valid frame found, return original position
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

				//code...
			$interval = $targetTime->diff($currentTime);
			$startTime = ($interval->h * 3600) + ($interval->i * 60) + $interval->s;
				
			$filePath =  isset($stationMedia->media->main_file->path) ? ($_SERVER['DOCUMENT_ROOT'].$stationMedia->media->main_file->path) : $stationMedia->media_path;

		} catch (\Throwable $th) {
		}

		if (isset($stationMedia->media) && file_exists($filePath))
		{
			return $this->streamAudioFromTimeRange($filePath, $startTime, $settings['station_media_chunk'] ?? 60);

			// return $this->streamAudioFromTime($filePath, $startTime);
		} elseif (strpos($filePath, 0 , 4) == 'http' &&  empty($stationMedia->media)) {
			return $this->stream_external($stationMedia->media_path, $startTime);
		} elseif (isset($stationMedia->media_path) && empty($stationMedia->media)) {
			
			return $this->streamAudioFromTimeRange($_SERVER['DOCUMENT_ROOT'].$filePath, $startTime, $settings['station_media_chunk'] ?? 60);
		} else {
			print_r($stationMedia);
			// sleep(5);
			
			// return $this->stream_station();
		}
	}

	public function streamAudioFromTimeRange($filePath, $startTimeInSeconds = 0, $streamDuration = 60) {
		if (!file_exists($filePath)) {
			header("HTTP/1.0 404 Not Found");
			return;
		}
	
		$getID3 = new \getID3;
		$fileInfo = $getID3->analyze($filePath);
	
		if (!isset($fileInfo['playtime_seconds'])) {
			header("HTTP/1.0 500 Internal Server Error");
			return;
		}
	
		$totalDuration = $fileInfo['playtime_seconds'];
		$bitRate = $fileInfo['bitrate']; // Bitrate in bits per second
	
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
	
	public function stream_external($fileUrl, $startTimeInSeconds = 0)
	{
		
		// $fileUrl = 'https://streaming.quatre-co.com/uploads/audio/260983-66dc0d2975759.mp3';

		if (!filter_var($fileUrl, FILTER_VALIDATE_URL)) {
			header("HTTP/1.0 404 Not Found");
			return;
		}
	
		$headers = get_headers($fileUrl, 1);
	
		// Check if the file is accessible
		if (!$headers || strpos($headers[0], '200') === false) {
			header("HTTP/1.0 404 Not Found");
			return;
		}
	
		// Get file size
		$fileSize = isset($headers['Content-Length']) ? (int)$headers['Content-Length'] : 0;
	
		
		$getID3 = new getID3;
		if (substr($params['media_path'], 0, 4) == 'http' ) {
			
			$tempFilePath = tempnam(sys_get_temp_dir(), 'audio');
			file_put_contents($tempFilePath, fopen($params['media_path'], 'r'));
			$filePath = $tempFilePath;
		}
		$fileInfo = $getID3->analyze($filePath);
		// Analyze file metadata (using getID3 or another library if needed)
		// Here we assume you know the total duration and bitrate
		$totalDuration = round($fileInfo['playtime_seconds'], 0); // Example duration in seconds (this can be extracted with getID3 for local files)
		$bitRate = 128 * 1000; // Example bitrate in bits per second
	
		// Calculate byte offset based on start time
		$byteOffset = (int)(($startTimeInSeconds / $totalDuration) * $fileSize);
	
		// Open remote file stream
		$stream = fopen($fileUrl, 'rb');
		if (!$stream) {
			header("HTTP/1.0 500 Internal Server Error");
			return;
		}
	
		// Set headers for streaming
		header("Content-Type: audio/mpeg");
		header("Cache-Control: public, must-revalidate");
		header("Pragma: no-cache");
		header("Accept-Ranges: bytes");
		header("Content-Length: " . ($fileSize - $byteOffset));
		header("X-Pad: avoid browser bug");
	
		// Move to the byte offset for starting the stream
		fseek($stream, $byteOffset);
	
		// Stream the audio from the offset
		$buffer = 8192;
		while (!feof($stream)) {
			echo fread($stream, $buffer);
			flush();
		}
	
		fclose($stream);
		exit;
		
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
