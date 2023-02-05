// This code defines a reducer for authentication. The purpose of a reducer is to handle changes to the state of the application based on actions.

// Initial State:
// The initial state of the authentication reducer is an object containing two properties:
// - isLoggedIn: a boolean value indicating whether the user is logged in or not
// - customer: an object containing customer information

const initialState = {
  isLoggedIn: false,
  customer: {},
  };
  
  // Reducer Function:
  // The authReducer function is a reducer that handles changes to the state based on actions. It takes two arguments:
  // - state: the current state of the authentication reducer
  // - action: the action being performed
  // The function uses a switch statement to determine what changes should be made to the state based on the type of the action.
  
  const authReducer = (state = initialState, action) => {
  switch (action.type) {
  // If the action type is "LOGIN_SUCCESS", the state is updated to set isLoggedIn to true.
  case "LOGIN_SUCCESS":
  return {
  ...state,
  isLoggedIn: true,
  };
  // If the action type is "LOGOUT_SUCCESS", the state is updated to set isLoggedIn to false.
  case "LOGOUT_SUCCESS":
  return {
  ...state,
  isLoggedIn: false,
  };
  // If the action type is "STORE_CUSTOMER_INFORMATION", the state is updated to store the customer information in the payload of the action.
  case "STORE_CUSTOMER_INFORMATION":
  return {
  ...state,
  customer: action.payload,
  };
  // If the action type does not match any of the cases, the state is returned as is.
  default:
  return state;
  }
  };
  
  // The authReducer is exported as the default export so that it can be used in other parts of the application.
  
  export default authReducer;