// Tải CSS từ Google Drive hoặc nguồn lưu trữ khác
fetch('https://raw.githubusercontent.com/Meliodaspro/songs-music/refs/heads/main/style.css?v=' + Date.now())
    .then(response => response.text())
    .then(css => {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    })
    .catch(error => {
        console.error('Không thể tải CSS:', error);
    });

// Tạo giao diện phát nhạc
const musicPlayer = document.createElement('div');
musicPlayer.id = 'music-player';
musicPlayer.style.transition = 'opacity 1s ease'; // Thêm hiệu ứng mờ dần
musicPlayer.style.opacity = '1';

const title = document.createElement('h1');
title.innerText = 'Music ♫';
musicPlayer.appendChild(title);

const songInfo = document.createElement('div');
songInfo.id = 'song-info';
musicPlayer.appendChild(songInfo);

const audioPlayer = document.createElement('audio');
audioPlayer.id = 'audio-player';
audioPlayer.autoplay = true;

const audioSource = document.createElement('source');
audioSource.id = 'audio-source';
audioSource.type = 'audio/mp3';
audioPlayer.appendChild(audioSource);

audioPlayer.addEventListener('canplay', () => {
    audioPlayer.play().catch(error => {
        console.warn('Autoplay bị chặn, cần tương tác của người dùng:', error);
    });
});

musicPlayer.appendChild(audioPlayer);
document.body.appendChild(musicPlayer);

const totalSongs = document.createElement('div');
totalSongs.id = 'total-songs';
totalSongs.style.transition = 'opacity 1s ease'; // Thêm hiệu ứng mờ dần
totalSongs.style.opacity = '1';
document.body.appendChild(totalSongs);

const errorMessage = document.createElement('div');
errorMessage.style.position = 'fixed';
errorMessage.style.bottom = '20px';
errorMessage.style.left = '50%';
errorMessage.style.transform = 'translateX(-50%)';
errorMessage.style.padding = '10px 20px';
errorMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
errorMessage.style.color = '#fff';
errorMessage.style.borderRadius = '5px';
errorMessage.style.fontSize = '14px';
errorMessage.style.display = 'none';
document.body.appendChild(errorMessage);

let songs = []; // Danh sách bài hát
let totalSongsCount = 0; // Tổng số bài hát

// Hàm gọi API để lấy bài hát ngẫu nhiên từ Google Drive
function HongSon_loadRandomSong() {
    fetch('https://api.meliodas.info.vn/auto-play-music') // URL API PHP
        .then(response => response.json())
        .then(data => {
            if (data && data.randomSong && data.randomSong.name && data.randomSong.file) {
                // Hiển thị bài hát ngẫu nhiên
                playSong(data.randomSong.name, data.randomSong.file);

                // Cập nhật tổng số bài hát nếu có
                if (data.totalSongs) {
                    totalSongsCount = data.totalSongs;
                    HongSon_updateTotalSongs();
                }
            } else {
                console.error('Dữ liệu bài hát không hợp lệ:', data);
                showErrorMessage('Không có bài hát nào để phát.');
            }
        })
        .catch(error => {
            console.error('Lỗi kết nối tới hệ thống:', error);
            showErrorMessage(`Lỗi: ${error.message}`);
        });
}

// Hàm định dạng tên bài hát
function formatSongName(name) {
    return name.replace(/\.[^/.]+$/, ''); // Loại bỏ đuôi file
}

// Hàm phát bài hát
function playSong(name, file) {
    const formattedName = formatSongName(name); // Gọi hàm xử lý tên bài hát
    songInfo.innerHTML = `♫ ${formattedName}`;
    audioSource.src = file;
    audioPlayer.load();
    audioPlayer.play().then(() => {
        console.log('Đang phát bài hát:', formattedName);
    }).catch(error => {
        console.error('Không thể phát bài hát:', error);
        showErrorMessage('Không thể phát bài hát.');
    });

    // Hiển thị music player và tự động ẩn sau 5 giây
    showElement(musicPlayer, 5000);
}

// Hiển thị tổng số bài hát trong hệ thống
function HongSon_updateTotalSongs() {
    totalSongs.innerHTML = `Có ${totalSongsCount} bài hát trong hệ thống`;
    showElement(totalSongs, 5000); // Hiển thị và tự động ẩn sau 5 giây
}

// Hiển thị thông báo lỗi và tự động ẩn
function showErrorMessage(message) {
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none'; // Ẩn thông báo sau 5 giây
    }, 5000);
}

// Hàm hiển thị một phần tử và tự động ẩn
function showElement(element, timeout) {
    // Reset animation và hiển thị phần tử
    element.style.opacity = '1';
    element.style.animation = 'fadeIn 1s forwards';

    // Sau khoảng thời gian timeout, ẩn phần tử với animation fadeOut
    setTimeout(() => {
        element.style.animation = 'fadeOut 1s forwards';
        element.style.opacity = '0';
    }, timeout);
}


// Khi bài hát kết thúc, gọi API để phát bài hát mới
audioPlayer.addEventListener('ended', () => {
    HongSon_loadRandomSong();
});

// Khi tải trang, gọi API lần đầu để phát bài hát
window.onload = function () {
    HongSon_loadRandomSong();
};
