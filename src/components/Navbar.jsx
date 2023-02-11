import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { FaUserAstronaut } from 'react-icons/fa'

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const state = useSelector((state) => state.handleCart)
  const [auth, setAuth] = useState(isLoggedIn);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // handleLogout is a function that makes a POST request to the logout endpoint 
  //  with a `Authorization` header containing the user's token.
  const handleLogout = () => {

    // The function makes a POST request to the logout endpoint with the token in the request header
    fetch(`https://a-listed-chew.herokuapp.com/logout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Remove the token from local storage
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT_SUCCESS" });
        dispatch({ type: "RESET_HANDLECART" })
        navigate('/login');
      })
      .catch((error) => {
      });
  };

  // The useEffect hook updates the `auth` state whenever the `isLoggedIn` state changes
  useEffect(() => {

    setAuth(isLoggedIn);
  }, [isLoggedIn]);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm ">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-3 float-left" to="/">A-Listed Chew</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link fw fs-4" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item fw fs-4">
                <NavLink className="nav-link" to="/products">Products</NavLink>
              </li>
              <li className="nav-item fw fs-4">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item fw fs-4">
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>
            </ul>
            <div className="buttons float-right">
              {auth ? (
                <div>

                  <button className="btn btn-outline-dark me-1 ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                  <NavLink to="/cart" className="btn btn-danger ms-2 me-2">
                    <i className="fa fa-shopping-cart me-1  mr-2"></i> Cart ({state.length})
                  </NavLink>
                  <FaUserAstronaut size={35} />
                </div>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-outline-dark">
                    <i className="fa fa-sign-in me-1"></i> Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-outline-dark ms-2">
                    <i className="fa fa-user-plus me-1"></i> Register
                  </NavLink>
                  <NavLink to="/cart" className="btn btn-danger ms-2">
                    <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar