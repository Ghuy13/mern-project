import axios from "axios";

export const createOrder = async (data) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/order/create`, data);
};

export const getAllOrder = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all`);
};

export const deleteOrder = async (id) => {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/order/delete/${id}`);
};