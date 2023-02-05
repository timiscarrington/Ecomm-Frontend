import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import  store  from '../redux/store'
import { storeCustomerInformation } from "../redux/action";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

// Function for submitting login form
const handleSubmit = (e) => {
    e.preventDefault();

    // Converts email and password to a JSON string
    const data = JSON.stringify({ email, password });

    // Calls the loginRequest function with the data and waits for its response
    loginRequest(data)
      .then((data) => {
        // If the data contains non_field_errors, set error message
        if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        } else {
          // Store the token received in the local storage
          console.log(data.token);
          localStorage.setItem("token", data.token);

          // Dispatch the login success action
          dispatch({ type: "LOGIN_SUCCESS" });

          // Call the getCustomerInformation function with email and token and wait for its response
          getCustomerInformation(email, data.token)
            .then((customer) => {
              console.log(customer);
            })
            .catch((error) => {
              console.error("Error in getCustomerInformation:", error);
              setError("An error occurred");
            });
        }
      })
      .catch((error) => {
        console.error("Error in loginRequest:", error);
        setError("An error occurred");
      });
  };

// Function to make a POST request to the "/login" endpoint
const loginRequest = (data) => {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => {
      // If the response is not okay, throw an error
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Return the response as JSON
      return response.json();
    });
};

// Function to make a GET request to the "/customers/email" endpoint
const getCustomerInformation = (email, token) => {
  return fetch(`/customers/email?email=${email}`, {
      method: "GET",
      headers: {
          "Authorization": `Token ${token}`,
      },
  })
      .then((response) => {
          // If the response is not okay, throw an error
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          // Return the response as JSON
          return response.json();
      })
      .then((customer) => {
          console.log(customer)
          // Dispatch the storeCustomerInformation action with the customer information
          dispatch(storeCustomerInformation({
          _id: customer._id,    
          email: customer.email,
          first_name: customer.first_name,
          last_name: customer.last_name
          }));
          // Log the customer information in the state
          console.log(store.getState().authReducer.customer);
          // Redirect the user to the home page
          navigate("/");
          })
            .catch((error) => {
                console.error("There was a problem with your fetch operation:", error);
                throw error;
            });
    };

      
    
      


    return (

        <div className="container">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="indian@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}
export default Login;
