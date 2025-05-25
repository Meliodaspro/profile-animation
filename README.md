# Profile Animation

Dự án này là một trang web cá nhân với hiệu ứng animation, hỗ trợ dark/light mode, toast notification, và nhiều tính năng cá nhân hóa.

## 🚀 Tính năng chính
- Hiệu ứng animation đẹp mắt
- Chuyển đổi dark/light mode
- Toast notification
- Cá nhân hóa thông tin cá nhân
- Đếm lượt truy cập (visitor badge)

## 📁 Cấu trúc thư mục
```
assets/
  js/           # JavaScript chính
  css/          # CSS giao diện
  img/          # Hình ảnh
  video/        # Video hiệu ứng
api/            # API backend (nếu có)
song-music-json/# Dữ liệu nhạc, file cấu hình
res/            # Tài nguyên bổ sung
index.html      # Trang chủ
```

## ⚡ Hướng dẫn chạy local
1. Clone repo về máy:
   ```sh
   git clone https://github.com/Meliodaspro/profile-animation.git
   cd profile-animation
   ```
2. Mở file `index.html` bằng trình duyệt (khuyên dùng Live Server hoặc http-server để tránh lỗi import module).

## 🔒 Lưu ý bảo mật
- **Không commit file chứa secret (như `client_secret.json`) lên repo.**
- Thêm các file nhạy cảm vào `.gitignore`.

## 📜 Giấy phép
MIT License 