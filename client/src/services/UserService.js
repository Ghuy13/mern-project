import axios from 'axios';

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(`/api/user/sign-in`, data);
    return res.data;
};

export const signupUser = async (data) => {
    const res = await axios.post(`/api/user/sign-up`, data);
    return res.data;
};

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`/api/user/get-details/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    return res.data;
};

export const deleteUser = async (id, access_token, data) => {
    const res = await axiosJWT.delete(`/api/user/delete-user/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        },
        data: data
    });
    return res.data;
};

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`/api/user/getAll`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post(`/api/user/refresh-token`, {}, {
        withCredentials: true,
    });
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(`/api/user/log-out`, {}, {
        withCredentials: true,
    });
    return res.data;
};

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`/api/user/update-user/${id}`, data, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    return res.data;
};

export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(`/api/user/delete-many`, data, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    return res.data;
};

