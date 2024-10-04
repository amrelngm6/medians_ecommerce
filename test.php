<?php

require 'vendor/autoload.php';

// Path to the video file
$file = $_SERVER['DOCUMENT_ROOT']."/uploads/videos/{$_GET['v']}";

servePartialContent($file);

function servePartialContent($filePath) {
    $size = filesize($filePath);
    $time = date('r');

    $fm = @fopen($filePath, 'rb');
    if (!$fm) {
        header("HTTP/1.1 505 Internal server error");
        return;
    }

    $begin = 0;
    $end = $size - 1;

    if (isset($_SERVER['HTTP_RANGE'])) {
        if (preg_match('/bytes=\h*(\d+)-(\d*)[\D.*]?/i', $_SERVER['HTTP_RANGE'], $matches)) {
            $begin = intval($matches[1]);
            if (!empty($matches[2])) {
                $end = intval($matches[2]);
            }
        }
    }

    if ($begin > 0 || $end < ($size - 1)) {
        header('HTTP/1.1 206 Partial Content');
    } else {
        header('HTTP/1.1 200 OK');
    }

    header("Content-Type: video/mp4");
    header('Accept-Ranges: bytes');
    header('Content-Length:' . ($end - $begin + 1));
    header("Content-Range: bytes $begin-$end/$size");
    header("Content-Disposition: inline;");
    header("Content-Transfer-Encoding: binary\n");
    header("Last-Modified: $time");

    $cur = $begin;
    fseek($fm, $begin, 0);

    while(!feof($fm) && $cur <= $end && (connection_status() == 0)) {
        print fread($fm, min(1024 * 16, ($end - $cur + 1)));
        $cur += 1024 * 16;
    }
}

// Usage
$videoId = $_GET['id'] ?? null;
if ($videoId) {
    $filePath = "/path/to/videos/{$videoId}.mp4";
    if (file_exists($filePath)) {
        servePartialContent($filePath);
    } else {
        header("HTTP/1.1 404 Not Found");
    }
}