<?php
// Hiển thị lỗi (debug)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/vendor/autoload.php';

use Google\Client;
use Google\Service\Drive;

function initializeGoogleDriveClient() {
    try {
        $client = new Google\Client();
        $client->setDeveloperKey('AIzaSyAJHkLgYULM7Dx3zpX46NIGVSFj8_TcmsM'); // Thay API Key của bạn
        return $client;
    } catch (Exception $e) {
        die(json_encode(['error' => 'Lỗi khởi tạo Google Drive Client: ' . $e->getMessage()]));
    }
}

function getFilesFromFolder($folderId) {
    try {
        $client = initializeGoogleDriveClient();
        $service = new Google\Service\Drive($client);

        // Truy vấn các file trong thư mục với định dạng mp3
        $query = "'$folderId' in parents and mimeType='audio/mpeg' and trashed=false";
        $files = $service->files->listFiles([
            'q' => $query,
            'fields' => 'files(id, name)',
        ]);

        $fileList = [];
        foreach ($files as $file) {
            $fileList[] = [
                'name' => $file->name,
                'file' => "/proxy.php?id=" . $file->id,
            ];
        }

        return $fileList;
    } catch (Exception $e) {
        die(json_encode(['error' => 'Lỗi khi lấy danh sách file: ' . $e->getMessage()]));
    }
}

function getRandomFileWithCount($folderId) {
    // Lấy danh sách tất cả các bài hát
    $files = getFilesFromFolder($folderId);

    if (empty($files)) {
        return ['error' => 'Không có file nào trong thư mục.'];
    }

    // Chọn ngẫu nhiên một bài hát từ danh sách
    $randomFile = $files[array_rand($files)];

    // Trả về bài hát ngẫu nhiên và tổng số bài hát
    return [
        'randomSong' => $randomFile,
        'totalSongs' => count($files),
    ];
}

// ID của thư mục Google Drive
$folderId = '1fJ4RU-Mkjmy4aT4cdsYNl64KNIHR1cOI';

// Trả về bài hát ngẫu nhiên và tổng số bài hát dưới dạng JSON
header('Content-Type: application/json');
try {
    $response = getRandomFileWithCount($folderId);
    echo json_encode($response); // Trả về kết quả
} catch (Exception $e) {
    echo json_encode(['error' => 'Lỗi: ' . $e->getMessage()]);
}
?>
