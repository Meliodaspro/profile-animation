<?php
// Hiển thị lỗi (debug)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Lấy ID file từ query string
if (!isset($_GET['id'])) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'Missing file ID']);
    exit;
}

$fileId = $_GET['id'];

// URL tải file từ Google Drive
$googleDriveUrl = "https://drive.google.com/uc?export=download&id=" . $fileId;

// Cấu hình headers
header('Content-Type: audio/mpeg');
header('Content-Disposition: inline; filename="audio.mp3"');

// Tải file từ Google Drive và chuyển tiếp nội dung
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $googleDriveUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$output = curl_exec($ch);
if (curl_errno($ch)) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Curl Error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);
echo $output;
