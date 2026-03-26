# MERN E-commerce Project

Dự án web thương mại điện tử xây dựng theo mô hình **MERN stack**:
- **MongoDB**: lưu trữ dữ liệu người dùng, sản phẩm, đơn hàng.
- **Express.js + Node.js**: cung cấp REST API cho nghiệp vụ.
- **React.js**: giao diện người dùng (client).

## Demo hình ảnh

### Banner trang chủ
![Demo banner](./client/src/assets/images/banner1.png)
<img width="720" height="344" alt="image" src="https://github.com/user-attachments/assets/14a20ca5-7431-42de-a8b4-d2a91728025e" />




### Logo dự án
![Demo logo](./client/src/assets/images/logo.png)

## 1) Cấu trúc thư mục

```bash
mern-project/
├── client/              # Frontend React (Create React App)
├── server/              # Backend Express + Mongoose
├── vercel.json          # Cấu hình deploy frontend + serverless API trên Vercel
```

## 2) Công nghệ chính

### Frontend (`client`)
- React 18
- Redux Toolkit + React Redux
- React Router DOM
- TanStack React Query
- Ant Design + styled-components
- Axios

### Backend (`server`)
- Express 5
- Mongoose 8
- JSON Web Token (`jsonwebtoken`)
- bcrypt
- cookie-parser, body-parser, cors

## 3) Tính năng chính

- Đăng ký / đăng nhập / đăng xuất.
- Quản lý xác thực bằng JWT (access token + refresh token).
- Xem danh sách sản phẩm, lọc theo loại, xem chi tiết.
- Giỏ hàng và tạo đơn hàng.
- Người dùng xem đơn hàng của chính mình.
- Admin quản lý user / product / order.

## 4) API base path

Tất cả API được mount với prefix:

- ` /api/user`
- ` /api/product`
- ` /api/order`

Ví dụ endpoint:
- `POST /api/user/sign-in`
- `POST /api/product/create`
- `GET /api/order/my-orders`

## 5) Yêu cầu môi trường

- Node.js >= 18
- npm >= 9
- MongoDB (local hoặc cloud MongoDB Atlas)

## 6) Biến môi trường

Tạo file `.env` trong thư mục `server/`:

```env
PORT=3001
MONGO_DB=mongodb+srv://<username>:<password>@<cluster>/<db_name>
ACCESS_TOKEN=<your_access_secret>
REFRESH_TOKEN=<your_refresh_secret>
```

> Lưu ý: `client` đang gọi API thông qua đường dẫn `/api/...` và có cấu hình proxy về `http://localhost:3001` khi chạy local.

## 7) Cài đặt và chạy local

### Bước 1: Cài dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### Bước 2: Chạy backend

```bash
cd server
npm run dev
```

Server mặc định chạy tại `http://localhost:3001`.

### Bước 3: Chạy frontend

```bash
cd client
npm start
```

Frontend mặc định chạy tại `http://localhost:3000`.

## 8) Scripts hữu ích

### Backend (`server/package.json`)
- `npm start`: chạy server bằng Node.
- `npm run dev`: chạy server bằng nodemon.
- `npm run build`: placeholder cho môi trường serverless.

### Frontend (`client/package.json`)
- `npm start`: chạy app ở chế độ development.
- `npm run build`: build production.
- `npm test`: chạy test với react-scripts.

## 9) Deploy (Vercel)

Project đã có `vercel.json` để:
- Build frontend từ `client/`.
- Deploy server API từ `server/api/index.js` bằng `@vercel/node`.
- Rewrite `/api/*` về serverless API.

Khi deploy cần set biến môi trường trên Vercel:
- `MONGO_DB`
- `ACCESS_TOKEN`
- `REFRESH_TOKEN`

## 10) Ghi chú phát triển

- Middleware auth đang kiểm tra token cho các route bảo vệ.
- Nên thêm validation input và chuẩn hóa response/error để dễ bảo trì.
- Nên bổ sung test cho các service/controller quan trọng trước khi mở rộng tính năng.
