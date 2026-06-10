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

## Deploy lên Railway (free)

Railway cho $5 credit miễn phí/tháng, đủ để chạy project này.

### Bước 1 — Tạo project

1. Vào [railway.app](https://railway.app) → **Login with GitHub**
2. **New Project** → **Empty Project**

### Bước 2 — Thêm PostgreSQL

**+ New** → **Database** → **Add PostgreSQL**

### Bước 3 — Deploy Backend

1. **+ New** → **GitHub Repo** → chọn repo `gscores`
2. Vào **Settings** của service vừa tạo:
   - **Source** → Dockerfile Path: `Dockerfile.backend`
   - **Networking** → **Generate Domain** (lấy URL backend)
3. Vào tab **Variables** → thêm các biến sau:
   ```
   DB_HOST     = ${{Postgres.PGHOST}}
   DB_PORT     = ${{Postgres.PGPORT}}
   DB_USERNAME = ${{Postgres.PGUSER}}
   DB_PASSWORD = ${{Postgres.PGPASSWORD}}
   DB_DATABASE = ${{Postgres.PGDATABASE}}
   PORT        = 3000
   ```
4. Đặt tên service thành `gscores-backend`

> Lần đầu deploy mất 5–15 phút do import ~1 triệu dòng dữ liệu.

### Bước 4 — Deploy Frontend

1. **+ New** → **GitHub Repo** → chọn repo `gscores` → **Root Directory**: `src/FE`
2. Vào **Settings** → **Source** → Dockerfile Path: `Dockerfile`
3. Vào tab **Variables** → thêm:
   ```
   VITE_API_URL = https://${{gscores-backend.RAILWAY_PUBLIC_DOMAIN}}/api
   ```
4. **Networking** → **Generate Domain**

> `${{gscores-backend.RAILWAY_PUBLIC_DOMAIN}}` là cú pháp Railway tự điền URL backend vào.

---

## Tính năng

- **Tra cứu điểm** — Nhập số báo danh 8 chữ số để xem kết quả tất cả các môn
- **Thống kê phân bố điểm** — Biểu đồ số thí sinh theo 4 mức (Giỏi / Khá / Trung bình / Yếu) cho từng môn
- **Top 10 Khối A** — Danh sách 10 thí sinh có tổng điểm Toán + Lý + Hóa cao nhất
