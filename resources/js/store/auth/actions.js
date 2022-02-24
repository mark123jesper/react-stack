import Cookies from "js-cookie";
import api from "../../util/api";
import {toast} from "react-toastify";

/**
 * @param {payload} payload - {email, password}
 * @param setLoading
 * @param navigate
 * @description - Action creator for login
 */
export const login = (payload, setLoading, navigate) => {
    return async () => {
        await api.post("/api/login", payload)
            .then(() => {
                Cookies.set("_authenticate", true);
                toast("Login Successful", {type: "success"});
                navigate('/dashboard');
            })
            .catch(err => {
                if (err.response.status === 422 || err.response.status === 403) {
                    toast.error("Invalid email or password");
                } else {
                    toast.error("Something went wrong");
                }
                setLoading(false);
            });
    }

}

/**
 * @description - Action creator for logout
 */
export const logout = (navigate, setLoading) => {
    return async () => {
        await api.post('/api/logout')
            .then(() => {
                Cookies.remove("_authenticate");
                toast("Logout Successful", {type: "success"});
                navigate('/');
            })
            .catch(() => {
                toast.error("Something went wrong");
                setLoading(false);
            })
    }
}

