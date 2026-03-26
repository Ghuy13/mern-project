<img width="691" height="342" alt="image" src="https://github.com/user-attachments/assets/d7e0411c-49ce-4558-89ac-9c8aa51405ef" /># MERN E-commerce Project

Dự án web thương mại điện tử xây dựng theo mô hình **MERN stack**:
- **MongoDB**: lưu trữ dữ liệu người dùng, sản phẩm, đơn hàng.
- **Express.js + Node.js**: cung cấp REST API cho nghiệp vụ.
- **React.js**: giao diện người dùng (client).
- 
## Demo giao diện

### Đăng ký / Đăng nhập
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/87740b69-6530-4c3b-a3b9-9c537530a3e7" />
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/f320c412-2b8b-4824-9dff-026623bf881d" />

### Trang chủ
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/4c2bc817-404f-4657-8a9e-a34a326dbaa2" />

### Thông tin người dùng
<img width="642" height="389" alt="image" src="https://github.com/user-attachments/assets/611488bf-57c2-4b8e-9727-6e794da35e52" />

### Tìm kiếm sản phẩm
<img width="720" height="343" alt="image" src="https://github.com/user-attachments/assets/991eaca9-454d-4aac-8c7c-77934b83056d" />
<img width="716" height="344" alt="image" src="https://github.com/user-attachments/assets/29c95548-913a-4139-ba8e-d895fe2c4119" />

### Chi tiết sản phẩm
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/adcaaa4e-6d4c-4fc0-9ee7-fde056cf1f00" />

### Giỏ hàng
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/b7936651-a22d-4505-9f6b-8171d2f0896f" />

### Thanh toán
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/32d3e536-8c83-43dd-b9d1-2661bdc3cd49" />
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/b9c4c347-43d3-44cf-9fdb-302db714d36c" />

### Đơn hàng của bạn
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/9c1b7e9d-2337-4ad0-ad7f-83ccad13e6bb" />

### Admin - Quản lý
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/04f13890-2795-46e0-afa3-d6f21ecb4f11" />
<img width="700" height="300" alt="image" src="https://github.com/user-attachments/assets/c50364aa-5d29-4ff5-bd8f-c31d57ea38c0" />
![Uploading image.png…]()
![Uploading image.png…]()


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
