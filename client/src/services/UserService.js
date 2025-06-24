import axios from 'axios';

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
    return res.data;
}

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
    return res.data;
}

export const getDetaisUser = async (id, access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        Headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}