# Ứng Dụng Quản Lý Học Sinh Lớp 10A1

Đây là một dự án giao diện trang web đơn giản (front-end) nhằm mục đích hiển thị các báo cáo và thống kê chi tiết về tình hình học tập và nề nếp của một lớp học. Giao diện được thiết kế hiện đại, trực quan và dễ sử dụng cho giáo viên chủ nhiệm.

![Ảnh chụp màn hình trang báo cáo](https://i.imgur.com/example.png)  ## ✨ Các Tính Năng Chính

* **Báo cáo Đa dạng**: Cung cấp nhiều loại báo cáo khác nhau như tổng quan, kết quả học tập, nề nếp, và báo cáo cá nhân chi tiết.
* **Trực quan hóa Dữ liệu**: Sử dụng biểu đồ (cột, đường, tròn) để trực quan hóa các số liệu thống kê như điểm trung bình môn, xu hướng điểm danh, phân bố điểm số.
* **Thống kê Toàn diện**: Hiển thị các chỉ số quan trọng như sĩ số, điểm trung bình lớp, tỷ lệ chuyên cần và điểm nề nếp.
* **Phân tích Chi tiết**:
    * Danh sách học sinh xuất sắc và học sinh cần hỗ trợ.
    * Bảng phân tích kết quả chi tiết theo từng môn học.
    * Bảng thống kê chuyên cần và liên lạc với phụ huynh.
* **Tùy chọn Lọc**: Cho phép lọc báo cáo theo loại và khoảng thời gian (tuần, tháng, học kỳ, tùy chọn).
* **Tương tác Người dùng**:
    * Thay đổi kiểu biểu đồ một cách linh hoạt.
    * Các nút bấm tiện ích để tạo báo cáo nhanh.
    * Chức năng xuất báo cáo ra PDF, Excel, In ấn và Chia sẻ (phiên bản demo).
* **Thiết kế Thân thiện (Responsive)**: Giao diện được xây dựng với TailwindCSS, tương thích tốt trên nhiều kích thước màn hình.

## 🛠️ Công Nghệ Sử Dụng

* **HTML5**: Cung cấp cấu trúc cơ bản cho trang web.
* **CSS3**: Định dạng và tạo kiểu cho các thành phần giao diện.
    * **TailwindCSS**: Framework CSS ưu tiên tiện ích để xây dựng giao diện nhanh chóng.
    * **Font Awesome**: Thư viện cung cấp các biểu tượng (icons).
* **JavaScript (ES6+)**: Xử lý logic, tương tác người dùng và cập nhật dữ liệu động.
    * **Chart.js**: Thư viện mạnh mẽ để vẽ các loại biểu đồ thống kê.

## 📂 Cấu Trúc Tệp Tin

Dự án được tổ chức thành các tệp riêng biệt để dễ dàng quản lý và bảo trì:

```
/
├── index.html      # Tệp chính chứa cấu trúc HTML của trang web.
├── style.css       # Chứa các quy tắc CSS tùy chỉnh cho giao diện.
└── script.js       # Chứa toàn bộ mã JavaScript để xử lý logic và dữ liệu.
```

1.  **`index.html`**: Là tệp "xương sống" của trang, chứa toàn bộ các thẻ HTML để hiển thị nội dung. Nó liên kết đến các tệp `style.css` và `script.js`.
2.  **`style.css`**: Chịu trách nhiệm về "ngoại hình" của trang web, bao gồm màu sắc, font chữ, bố cục và các hiệu ứng chuyển động.
3.  **`script.js`**: Là "bộ não" của ứng dụng, xử lý việc khởi tạo biểu đồ, tải dữ liệu mẫu, cập nhật các bảng biểu, và phản hồi lại các tương tác của người dùng (như nhấn nút, thay đổi bộ lọc).

## 🚀 Hướng Dẫn Cài Đặt và Chạy Dự Án

Bạn không cần cài đặt phức tạp để chạy dự án này. Chỉ cần làm theo các bước sau:

1.  **Tải về các tệp**:
    * Đảm bảo bạn có đủ 3 tệp: `index.html`, `style.css`, và `script.js`.
    * Đặt cả ba tệp này vào **cùng một thư mục**.

2.  **Mở trên Trình duyệt**:
    * Tìm đến tệp `index.html` trong thư mục của bạn.
    * Nhấp đúp chuột vào tệp đó, hoặc nhấp chuột phải và chọn "Mở bằng" (Open with) trình duyệt web yêu thích của bạn (ví dụ: Google Chrome, Firefox, Microsoft Edge).

Trang web sẽ được hiển thị ngay lập tức và bạn có thể bắt đầu tương tác với các chức năng.

**Lưu ý**: Vì đây là một dự án front-end thuần túy, dữ liệu học sinh được giả lập và lưu trữ trực tiếp trong tệp `script.js`. Mọi thay đổi sẽ không được lưu lại sau khi bạn tải lại trang.