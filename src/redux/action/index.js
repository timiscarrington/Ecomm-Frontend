// AddItem Action:
// This function creates and returns an action with type "ADDITEM" and payload as the provided product. This action is used to add an item to the cart.

export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
}

// DeleteItem Action:
// This function creates and returns an action with type "DELETEITEM" and payload as the provided product. This action is used to delete an item from the cart.

export const deleteCart = (product) => {
    return {
        type: "DELETEITEM",
        payload: product
    }
}

export const resetHandleCart = () => {
    return {
        type: "RESET_HANDLECART"
    };
};

// LoginSuccess Action:
// This function creates and returns an action with type "LOGIN_SUCCESS". This action is used to indicate a successful login.

export const loginSuccess = () => {
    return {
        type: "LOGIN_SUCCESS"
    };
};

// LogoutSuccess Action:
// This function creates and returns an action with type "LOGOUT_SUCCESS". This action is used to indicate a successful logout.

export const logoutSuccess = () => {
    return {
        type: "LOGOUT_SUCCESS"
    };
};

// StoreCustomerInformation Action:
// This function creates and returns an action with type "STORE_CUSTOMER_INFORMATION" and payload as an object containing the provided customer information (_id, email, first_name, last_name). This action is used to store customer information.

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