// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
});
// Set the default Authorization header with the token
api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` ;
export const userAllGetApi = async () => {
    try {
        const response = await api.get('/user' );
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error };
    }
};
export const userGetApi = async (id) => {
    try {
        const response = await api.get(`/user/${id}` );
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error };
    }
};