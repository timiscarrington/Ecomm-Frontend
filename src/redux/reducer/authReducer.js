import React from 'react';

const initialState = {
  isLoggedIn: false,
  customer: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
      };
    case "STORE_CUSTOMER_INFORMATION":
      return {
        ...state,
        customer: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

