import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search, limit) => {
    let res = {};
    if (search?.length > 0) {
        res = await axios.get(`/api/product/get-all?filter=name&filter=${search}&limit=${limit}`);
    } else {
        res = await axios.get(`/api/product/get-all?limit=${limit}`);
    }
    return res.data;
}

export const getProductType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`/api/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`);
        return res.data;
    }
}

export const createProduct = async (data) => {
    const res = await axios.post(`/api/product/create`, data);
    return res.data;
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`/api/product/get-details/${id}`);
    return res.data;
}

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`/api/product/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`/api/product/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const deleteManyProduct = async (data, access_token) => {
    const res = await axiosJWT.post(`/api/product/delete-many`, data, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`/api/product/get-all-type`)
    return res.data;
}

