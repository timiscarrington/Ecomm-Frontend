import handleCart from "./handleCart";
import authReducer from "./authReducer";
import {combineReducers} from "redux";

const rootReducers = combineReducers({
    handleCart,
    authReducer,
})

export default rootReducers;