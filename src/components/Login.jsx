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

    const handleSubmit = (e) => {
        e.preventDefault();
      
        const data = JSON.stringify({ email, password });
      
        loginRequest(data)
          .then((data) => {
            if (data.non_field_errors) {
              setError(data.non_field_errors[0]);
            } else {
              console.log(data.token);
              localStorage.setItem("token", data.token);
              dispatch({ type: "LOGIN_SUCCESS" });
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
      
      const loginRequest = (data) => {
        return fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          });
      };
      
      const getCustomerInformation = (email, token) => {
        return fetch(`http://localhost:4000/customers/email?email=${email}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((customer) => {
                console.log(customer)
                dispatch(storeCustomerInformation({
                _id: customer._id,    
                email: customer.email,
                first_name: customer.first_name,
                last_name: customer.last_name
                }));
                // Redirect the user to the home page
                console.log(store.getState().authReducer.customer);
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
