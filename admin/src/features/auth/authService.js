import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getTokenLS = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;


const configLS = {
    headers: {
        Authorization: `Bearer ${getTokenLS.token}`,
        Accept: "application/json"
    }
}
const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login-admin`, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}
const getOrder = async () => {
    const response = await axios.get(`${base_url}user/getAllOrders`, configLS);

    return response.data;
}
const deleteUser = async (id) => {
    const response = await axios.delete(`${base_url}user/${id}`, configLS);

    return response.data;
}

const authService = {
    login,
    getOrder,
    deleteUser
}

export default authService;