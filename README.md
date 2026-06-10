# G-Scores

Ứng dụng tra cứu kết quả kỳ thi THPT Quốc gia 2024.

## Tech Stack

| Layer    | Công nghệ                              |
| -------- | -------------------------------------- |
| Frontend | React 19, TypeScript, Vite, Tailwind v4, Recharts |
| Backend  | NestJS, TypeORM, PostgreSQL            |

---

## Chạy với Docker (khuyến nghị)

Cách nhanh nhất — chỉ cần cài [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
docker compose up --build
```

Lần đầu chạy sẽ mất 5–15 phút (build image + import ~1 triệu dòng dữ liệu).  
Khi thấy log `Starting server...` thì truy cập **http://localhost**.

> Để dừng: `docker compose down`  
> Để xóa cả dữ liệu: `docker compose down -v`

---

## Chạy local (không dùng Docker)

### Yêu cầu môi trường

- **Node.js** >= 18
- **PostgreSQL** >= 14 (đang chạy trên cổng 5432)

---

## Cài đặt & Chạy local

### 1. Tạo database

Đăng nhập PostgreSQL và tạo database:

```sql
CREATE DATABASE gscores;
```

### 2. Cấu hình môi trường Backend

```bash
cd src/BE
cp .env.example .env
```

Chỉnh sửa file `.env` nếu thông tin kết nối của bạn khác với mặc định:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=gscores
PORT=3000
```

### 3. Cài đặt dependencies & khởi động Backend

```bash
cd src/BE
npm install
npm run start:dev
```

> Migration sẽ tự chạy khi ứng dụng khởi động. Backend lắng nghe tại **http://localhost:3000**.

### 4. Import dữ liệu (chạy một lần)

Mở terminal mới, vẫn trong thư mục `src/BE`:

```bash
npm run seed
```

> Lệnh này đọc file `dataset/diem_thi_thpt_2024.csv` và nhập toàn bộ dữ liệu vào database. Quá trình có thể mất vài phút.

### 5. Cài đặt dependencies & khởi động Frontend

```bash
cd src/FE
npm install
npm run dev
```

> Frontend lắng nghe tại **http://localhost:5173** và proxy các request `/api` về Backend.

---

## Truy cập ứng dụng

| Cách chạy | Giao diện              | API                        |
| --------- | ---------------------- | -------------------------- |
| Docker    | http://localhost       | http://localhost/api       |
| Local     | http://localhost:5173  | http://localhost:3000/api  |

---

## Deploy lên Render (free)

### Bước 1 — Push lên GitHub

```bash
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/<your-username>/gscores.git
git push -u origin main
```

### Bước 2 — Kết nối với Render

1. Vào [render.com](https://render.com) → **New** → **Blueprint**
2. Chọn repo GitHub vừa push
3. Render tự đọc `render.yaml` và tạo 3 dịch vụ: **database**, **backend**, **frontend**
4. Nhấn **Apply**

> Backend sẽ mất ~3-5 phút khởi động lần đầu (import ~1 triệu dòng dữ liệu).

### Bước 3 — Gán URL backend cho frontend

Sau khi backend deploy xong:

1. Vào service **gscores-backend** → copy URL, dạng `https://gscores-backend.onrender.com`
2. Vào service **gscores-frontend** → **Environment** → thêm biến:
   ```
   VITE_API_URL = https://gscores-backend.onrender.com/api
   ```
3. Nhấn **Save** → **Manual Deploy** → Render sẽ build lại frontend

> Bước này chỉ làm một lần. Từ lần sau Render tự redeploy khi push code mới.

---

## Tính năng

- **Tra cứu điểm** — Nhập số báo danh 8 chữ số để xem kết quả tất cả các môn
- **Thống kê phân bố điểm** — Biểu đồ số thí sinh theo 4 mức (Giỏi / Khá / Trung bình / Yếu) cho từng môn
- **Top 10 Khối A** — Danh sách 10 thí sinh có tổng điểm Toán + Lý + Hóa cao nhất
