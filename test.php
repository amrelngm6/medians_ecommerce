<?php

require 'vendor/autoload.php';

// Path to the video file
$file = $_SERVER['DOCUMENT_ROOT'].'/uploads/videos/87937-66fc71a2b4bf0.mp4';

$startTime = isset($_GET['start']) ? floatval($_GET['start']) : 5;

if (!file_exists($file)) {
    die('File not found');
}

$fileSize = filesize($file);

// Use FFmpeg to get the byte position for the start time
$ffmpegCommand = "ffmpeg -v error -ss {$startTime} -i \"{$file}\" -c copy -f mp4 -y -bsf:a aac_adtstoasc -movflags faststart+frag_keyframe+empty_moov -f null - 2>&1 | grep -oP '(?<=muxing overhead: )[0-9.]+%'";
$muxingOverhead = floatval(str_replace('%', '', shell_exec($ffmpegCommand))) / 100;

$startByte = intval($fileSize * ($startTime / getDuration($file)) * (1 - $muxingOverhead));

$start = $startByte;
$end = $fileSize - 1;
$length = $end - $start + 1;

// Handle range requests
if (isset($_SERVER['HTTP_RANGE'])) {
    $ranges = explode('=', $_SERVER['HTTP_RANGE']);
    $start = max($start, intval(explode('-', $ranges[1])[0]));
    $end = (isset(explode('-', $ranges[1])[1]) && is_numeric(explode('-', $ranges[1])[1])) 
        ? intval(explode('-', $ranges[1])[1]) 
        : $fileSize - 1;
    $length = $end - $start + 1;
    header('HTTP/1.1 206 Partial Content');
} else {
    header('HTTP/1.1 200 OK');
}

// Set headers
header("Content-Type: video/mp4");
header("Accept-Ranges: bytes");
header("Content-Length: $length");
header("Content-Range: bytes $start-$end/$fileSize");
header("Content-Disposition: inline; filename=\"" . basename($file) . "\"");

// Open the file
$fp = fopen($file, 'rb');

// Seek to the start position
fseek($fp, $start);

// Output the file data
$buffer = 1024 * 8;
$totalRead = 0;
while (!feof($fp) && $totalRead < $length) {
    $readSize = min($buffer, $length - $totalRead);
    echo fread($fp, $readSize);
    $totalRead += $readSize;
    flush();
}

fclose($fp);

function getDuration($file) {
    $ffprobeCommand = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 \"{$file}\"";
    return floatval(shell_exec($ffprobeCommand));
}