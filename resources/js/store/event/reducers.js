/**
 * Auth Reducers
 **/
// import {  } from "./constants";

const initialState = {
    isConfirming: false,
    is2FAEnabled: false,
    qrCode: '',
    recoveryCodes: [],
};

export default function reducer(state = initialState, {type, payload})
{
    switch (type) {
        default:
            return state;
    }
}