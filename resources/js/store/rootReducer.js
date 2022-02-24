import { combineReducers } from "redux";
import authReducer from "./auth/reducers";
import eventReducer from "./event/reducers";

const rootReducer = (state, action) => {
    const allReducers = combineReducers({
        auth: authReducer,
        event: eventReducer,
    });
    return allReducers(state, action);
};

export default rootReducer;