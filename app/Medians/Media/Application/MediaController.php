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
		header("Content-Length: " . $size);
		header("X-Pad: avoid browser bug");
		header("Content-Duration: " . ($totalDuration - $startTimeInSeconds));
	
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
		$stationId = $this->app->request()->get('station_id');

		$stationRepo = new \Medians\Stations\Infrastructure\StationRepository; 
		$stationMedia = $stationRepo->findMediaByTime($stationId, date('H:i:s'));

		$targetTime = new \DateTime($stationMedia->start_at);
		$currentTime = new \DateTime();

		$interval = $targetTime->diff($currentTime);
		$startTime = ($interval->h * 3600) + ($interval->i * 60) + $interval->s;
			
		$filePath = $_SERVER['DOCUMENT_ROOT'].$stationMedia->media->main_file->path;

		echo $stationMedia->start_at;
		echo $filePath;
		echo $startTime;
		return;
		return $this->streamAudioFromTime($filePath, $startTime);

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
