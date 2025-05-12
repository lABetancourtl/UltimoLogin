import axios from 'axios';

export const getAllMantenimientos = () => {
    return axios.get('https://backend-maintcheck-1.onrender.com/tasks/api/v1/mantenimiento/')
};