import axios from "axios";
import Cookies from "js-cookie";

const api = () => {

    const headers = {
        "Content-Type": "application/json",
        'Accept': 'application/json',
    };

    let api = axios.create({
        // baseURL: 'https://react-stack.dev',
        baseURL: 'https://react-stack-secure.herokuapp.com',
        headers: headers,
        withCredentials: true,
    });

    api.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            window.location.replace('/login');
            Cookies.remove('_authenticate');
            return Promise.reject();
        }

        return Promise.reject(error);
    });

    return api;
}

export default api();
