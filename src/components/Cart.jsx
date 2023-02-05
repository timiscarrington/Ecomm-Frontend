import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addCart, deleteCart } from "../redux/action";

const Cart = () => {
    const state = useSelector((state) => state.handleCart);
    const customer = useSelector(state => state.authReducer.customer);
    const dispatch = useDispatch();
    const [newCart, setNewCart] = useState(null);


    const handleAdd = (item) => {
        dispatch(addCart(item));
    };
    const handleDel = (item) => {
        dispatch(deleteCart(item));
    };

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
                    </div>
                </div>
            </div>
        );
    };
    const cartItems = (product) => {
        return (
            <>
                <div className="px-4 my-5 bg-light rounded-3 py-5">
                    <div className="container py-4">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    height="200px"
                                    width="auto"
                                />
                            </div>
                            <div className="col-md-4">
                                <h3>{product.title}</h3>
                                <p className="lead fw-bold">
                                    {product.qty} X ${product.price} = $
                                    {product.qty * product.price}
                                </p>
                                <button
                                    className="btn btn-outline-dark me-4"
                                    onClick={() => handleDel(product)}
                                >
                                    <i className="fa fa-minus"></i>
                                </button>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => handleAdd(product)}
                                >
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    const buttons = () => {
       
        const handleSaveCart = () => {
            const cartItems = state.map(item => ({
              product: item._id,
              qty: 1,
              title: item.title,
              image: item.image
            }));
          
            const postCart = async () => {
                try {
                  const payload = {
                    customer: customer._id._id,
                    first_name: customer._id.first_name,
                    last_name: customer._id.last_name,
                    email: customer._id.email,
                    items: cartItems
                  };
                  const res = await fetch("/cart", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                  });
                  const responseData = await res.json();
                  setNewCart(responseData._id);
                } catch (error) {
                  console.error(error);
                }
              };
          
            postCart();
           
          };
         
        return (
            <>
                <div className="container">
                    <div className="row">
                        <button
                            className="btn btn-outline-primary mb-5 w-25 mx-auto"
                            onClick={handleSaveCart}
                        >
                            Save Cart
                        </button>
                        <NavLink
                            to="/checkout"
                            className="btn btn-outline-dark mb-5 w-25 mx-auto"
                        >
                            Proceed to Checkout
                        </NavLink>
                        <NavLink
                            to={`/saved-carts/${newCart}`}
                            className="btn btn-outline-info mb-5 w-25 mx-auto"
                        >
                            View Saved Carts
                        </NavLink>
                    </div>
                </div>
            </>
        );
    };


    return (
        <div>
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems)}
            {state.length !== 0 && buttons()}
        </div>
    );
};

export default Cart;
