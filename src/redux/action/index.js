// For Adding Item to Cart

export const addCart = (product) => {
    return{
        type : "ADDITEM",
        payload: product
    }
}
// For Deleting Item from Cart

export const deleteCart = (product) => {
    return{
        type : "DELETEITEM",
        payload: product
    }
}

export const loginSuccess = () => {
    return {
        type: "LOGIN_SUCCESS"
    };
};

export const logoutSuccess = () => {
    return {
        type: "LOGOUT_SUCCESS"
    };
};

export const storeCustomerInformation = (_id, email, first_name, last_name) => {
    return {
        type: "STORE_CUSTOMER_INFORMATION",
        payload: {
            _id,
            email,
            first_name,
            last_name
        }
    };
};