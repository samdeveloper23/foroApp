import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://giliforo2.fly.dev', // Reemplaza con la URL de tu servidor backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (username, password, token) => {
    try {
        const response = await apiClient.post('/users/login', { username, password }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error en el servidor');
    }
};

export const registerUser = async (username, password, token) => {
    try {
        const response = await apiClient.post('/users/register', { username, password }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error en el servidor');
    }
};
