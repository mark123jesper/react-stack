import { AUTH_LOGIN } from "./constants";
import { api } from "../../util/api";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

/**
 * @param {payload} payload - {email, password}
 * @returns {object} - {type, payload}
 * @description - Action creator for login
 * @memberof AuthActions
 * @requires - src\util\api.js
 * @requires - react-toastify
 * @requires - crypto-js
 * @requires - src\store\auth\constants.js
 * @requires - src\store\auth\actions.js
 * @requires - src\store\auth\reducers.js
 * @requires - src\store\index.js
 */
export const login = (payload, setLoading) => {
    setLoading(true);
    return async dispatch => {
        await api().get('/sanctum/csrf-cookie').then(async () => {
            await api().post('/login', payload,
            ).then(res => {
                toast.success('Login Successful')
                dispatch({
                    type: AUTH_LOGIN,
                    payload: {
                        isAuthenticated: true,
                        user: res.data.user,
                        token: CryptoJS.AES.encrypt(res.data.token, res.data.user.last_name).toString(),
                        has2FA: res.data.has2FA,
                    }
                });
            }).catch(() => {
                toast.error('Invalid Credentials')
            }).finally(() => {
                setLoading(false);
            })
        })
    }
}

/**
 * @param {payload} payload - {token, user}
 * @returns {object} - {type, payload}
 * @description - Action creator for logout
 * @memberof AuthActions
 * @requires - src\store\auth\constants.js
 * @requires - src\store\auth\actions.js
 * @requires - src\store\auth\reducers.js
 * @requires - src\store\index.js
 * @requires - src\util\api.js
 * @requires - react-toastify
 * @requires - crypto-js
 */
export const logout = (payload) => {
    return async dispatch => {
        await api().get('/sanctum/csrf-cookie').then(async () => {
            await api().post('/logout', payload, {
                headers: {
                    'Authorization': `Bearer ${CryptoJS.AES.decrypt(payload.token, payload.user.last_name).toString(CryptoJS.enc.Utf8)}`
                }
            }).then(() => {
                toast.success('Logout Successful')
                dispatch({
                    type: AUTH_LOGIN,
                    payload: {
                        isAuthenticated: false,
                        user: [],
                        token: null,
                        has2FA: null,
                    }
                });
            }).catch(() => {
                toast.error('Invalid Operation')
            })
        })
    }
}

