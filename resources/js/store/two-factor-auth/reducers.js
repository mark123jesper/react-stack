/**
 * Auth Reducers
 **/
import { AUTH_LOGIN, AUTH_LOGOUT } from "./constants";

const initialState = {
    auth: false
};

export default function reducer(state = initialState, {type, payload})
{
    switch (type) {
        case AUTH_LOGIN: {
            return {
                ...state,
                auth: payload.auth
            }
        }
        case AUTH_LOGOUT: {
            return {
                ...state,
                auth: payload.auth
            }
        }
        default:
            return state;
    }
}
