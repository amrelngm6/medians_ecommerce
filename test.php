<?php

require 'vendor/autoload.php';

// Path to the video file
$file = $_SERVER['DOCUMENT_ROOT'].'/uploads/videos/87937-66fc71a2b4bf0.mp4';


$startTime = isset($_GET['start']) ? floatval($_GET['start']) : 10.05; // Get start time from query parameter

// Use FFmpeg to get the byte position for the start time
$ffprobeCommand = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 \"$file\"";
$duration = floatval(shell_exec($ffprobeCommand));

$seekCommand = "ffmpeg -v error -i \"$file\" -c copy -f rawvideo -seek_timestamp 1 -ss $startTime -to " . ($startTime + 0.1) . " -f null - 2>&1 | grep 'pos=' | cut -d '=' -f 2";
$bytePosition = intval(shell_exec($seekCommand));
echo $seekCommand;

echo $bytePosition;
return;
$fileSize = filesize($file);

$start = $bytePosition;
$end = $fileSize - 1;

// Handle range requests
if (isset($_SERVER['HTTP_RANGE'])) {
    $ranges = explode('=', $_SERVER['HTTP_RANGE']);
    $start = max($start, intval(explode('-', $ranges[1])[0]));
    $end = (isset(explode('-', $ranges[1])[1]) && is_numeric(explode('-', $ranges[1])[1])) 
        ? intval(explode('-', $ranges[1])[1]) 
        : $fileSize - 1;
}

// Set headers
header("Content-Type: video/mp4");
header("Accept-Ranges: bytes");
header("Content-Length: " . ($end - $start + 1));
header("Content-Range: bytes $start-$end/$fileSize");
header("Content-Disposition: inline; filename=\"" . basename($file) . "\"");

// Open the file
$fp = fopen($file, 'rb');

// Seek to the requested start position
fseek($fp, $start);

// Output the file data
$bufferSize = 1024 * 16;
while (!feof($fp) && ($p = ftell($fp)) <= $end) {
    if ($p + $bufferSize > $end) {
        $bufferSize = $end - $p + 1;
    }
    echo fread($fp, $bufferSize);
    flush();
}

fclose($fp);
