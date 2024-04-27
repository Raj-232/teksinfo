// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
});




export const userLoginApi = async (data) => {
    try {
        const response = await api.post('/user/signin', data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error };
    }
};

export const userCreateApi = async (data) => {
    try {
        const response = await api.post('/user/signup', data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error };
    }
};

export const verifyMobileApi = async (data) => {
    try {
        const response = await api.post('/user/verifyotpnumber', data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error };
    }
};
export const sendOtpMobileApi = async (data) => {
    try {
        const response = await api.post('/user/sendotpnumber', data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error };
    }
};
export const verifyEmailApi = async (data) => {
    try {
        const response = await api.post('/user/verifyotpemail', data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error };
    }
};
export const sendOtpEmailApi = async (data) => {
    try {
        const response = await api.post('/user/sendotpemail', data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error };
    }
};
// Add other API functions as needed
