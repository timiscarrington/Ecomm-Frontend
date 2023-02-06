import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addCart, deleteCart } from "../redux/action";

const Cart = () => {
    // Use useSelector hook to get data from the Redux store
    const state = useSelector((state) => state.handleCart);
    const customer = useSelector(state => state.authReducer.customer);
    // Use useDispatch hook to dispatch actions to the Redux store
    const dispatch = useDispatch();

    const [newCart, setNewCart] = useState(null);

    // Dispatch addCart action when handleAdd is called
    const handleAdd = (item) => {
        dispatch(addCart(item));
    };
    // Dispatch deleteCart action when handleDel is called
    const handleDel = (item) => {
        dispatch(deleteCart(item));
    };

    // Return JSX to render when cart is empty
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

    // Return JSX to render individual cart items
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

    // Return JSX to render buttons for saving cart, proceeding to checkout and viewing saved carts
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
                    const res = await fetch('https://a-listed-chew.herokuapp.com/cart/', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });
                    const responseData = await res.json();
                    console.log(responseData._id)
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
                        {customer._id && (
                            <button
                                className="btn btn-outline-primary mb-5 w-25 mx-auto"
                                onClick={handleSaveCart}
                            >
                                Save Cart
                            </button>
                        )}
                        <NavLink
                            to="/checkout"
                            className="btn btn-outline-danger mb-5 w-25 mx-auto"
                        >
                            Proceed to Checkout
                        </NavLink>
                        {newCart && (
                            <NavLink
                                to={`/saved-carts/${newCart}`}
                                className="btn btn-outline-info mb-5 w-25 mx-auto"
                            >
                                View Saved Carts
                            </NavLink>
                        )}
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
