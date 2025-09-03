// import axios from "axios";

// export const createOrder = async (data) => {
//     return await axios.post(`${process.env.REACT_APP_API_URL}/order/create`, data);
// };

// export const getAllOrder = async () => {
//     return await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all`);
// };

// export const deleteOrder = async (id) => {
//     return await axios.delete(`${process.env.REACT_APP_API_URL}/order/delete/${id}`);
// };

// // Lấy đơn hàng của user hiện tại
// export const getMyOrders = async (token) => {
//     return await axios.get(`${process.env.REACT_APP_API_URL}/order/my-orders`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

import axios from "axios";

// Tạo axios instance với interceptor để tự động thêm token
export const axiosJWT = axios.create();

// Interceptor để tự động thêm token vào header
axiosJWT.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); // hoặc lấy từ Redux store
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const createOrder = async (data) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data);
    return res;
};

// Lấy đơn hàng của user hiện tại
export const getMyOrders = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/my-orders`);
    return res;
};

// Lấy tất cả đơn hàng (chỉ admin)
export const getAllOrder = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all`);
    return res;
};

export const deleteOrder = async (id) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/delete/${id}`);
    return res;
};

// Phương pháp khác: Truyền token trực tiếp
export const getMyOrdersWithToken = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/my-orders`, config);
    return res;
};