<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

header('Content-Type: application/json');

$jsonUrl = "https://raw.githubusercontent.com/Meliodaspro/songs-music/refs/heads/main/songs.json";

// Sử dụng cURL thay thế file_get_contents
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $jsonUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$jsonData = curl_exec($ch);
if (curl_errno($ch)) {
    echo json_encode(["error" => "cURL Error: " . curl_error($ch)]);
    exit;
}
curl_close($ch);

// Kiểm tra JSON
if ($jsonData === FALSE) {
    echo json_encode(["error" => "Failed to fetch JSON data"]);
    exit;
}
$musicData = json_decode($jsonData, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["error" => "JSON Decode Error: " . json_last_error_msg()]);
    exit;
}

// Đảm bảo dữ liệu không rỗng
if (empty($musicData)) {
    echo json_encode(["error" => "No songs available"]);
    exit;
}

// Chọn bài hát ngẫu nhiên
$randomSong = $musicData[array_rand($musicData)];
echo json_encode($randomSong);
?>
