<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['videoChunk'])) {
    $targetDir = 'uploads/';
    
    // Make sure the upload directory exists
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    
    // Save the uploaded chunk
    $chunkName = $targetDir . uniqid() . '.webm';
    move_uploaded_file($_FILES['videoChunk']['tmp_name'], $chunkName);
    
    // You can now process or stream the video chunks
    echo "Chunk received and saved.";
}