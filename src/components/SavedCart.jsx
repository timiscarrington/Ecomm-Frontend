import React, { useState, useEffect } from 'react';

const SavedCart = () => {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch('http://localhost:8000/api/carts/');
        const carts = await result.json();
        setCarts(carts);
      };
  
      fetchData();
    }, []);
  
    const updateCart = async (cartId, updatedQty) => {
      await fetch(`http://localhost:8000/api/carts/${cartId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ qty: updatedQty })
      });
  
      const updatedCarts = carts.map(cart => {
        if (cart.id === cartId) {
          return { ...cart, qty: updatedQty };
        }
        return cart;
      });
      setCarts(updatedCarts);
    };
  
    const deleteCart = async cartId => {
      await fetch(`http://localhost:8000/api/carts/${cartId}/`, {
        method: 'DELETE'
      });
  
      const updatedCarts = carts.filter(cart => cart.id !== cartId);
      setCarts(updatedCarts);
    };
  
    return (
      <ul>
        {carts.map(cart => (
          <li key={cart.id}>
            {cart.product} - {cart.qty}
            <button onClick={() => updateCart(cart.id, cart.qty + 1)}>
              Update
            </button>
            <button onClick={() => deleteCart(cart.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
export default SavedCart;
