import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Card, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa'

const SavedCart = () => {
  const [carts, setCarts] = useState([]);
  const { id } = useParams();
  const [updatedQty, setUpdatedQty] = useState(1);

  // Fetch the cart data based on the id from URL parameters
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`https://a-listed-chew.herokuapp.com/cart/${id}`);
      const carts = await result.json();
      setCarts([carts]);
    };

    fetchData();
  }, [id]);

  // Delete the item from the cart based on the item id
  const handleDelete = async (itemId) => {
    await fetch(`https://a-listed-chew.herokuapp.com/cart/${id}/items/${itemId}`, {
      method: 'DELETE'
    });
    // Filter the deleted item from the cart
    const updatedCarts = carts.map(cart => {
      const updatedCart = { ...cart };
      updatedCart.items = updatedCart.items.filter(item => item._id !== itemId);
      return updatedCart;
    });

    // Update the state with the updated cart
    setCarts(updatedCarts);
  };

  // Update the item quantity in the cart based on the item id
  const handleUpdateItem = async (itemId, updatedQty, item) => {
    try {
      const result = await fetch(`https://a-listed-chew.herokuapp.com/cart/${id}/item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ qty: updatedQty, title: item.title, image: item.image })
      });

      if (result.ok) {
        const updatedCart = await result.json();
        const index = carts.findIndex(cart => cart._id === updatedCart._id);
        const newCarts = [...carts];
        newCarts[index].items = updatedCart.items;
        setCarts(newCarts);
      } else {
        throw new Error('Failed to update item');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center h-100">
        {carts.map((carts) => (
          <Card key={carts._id} className="d-flex flex-column w-400 mb-3">
            <Card.Header>
              Customer Information
            </Card.Header>
            <ListGroup className="list-group-flush flex-grow-1">
              <ListGroupItem>
                Name: {carts.first_name} {carts.last_name}
                <br />
                Email: {carts.email}
              </ListGroupItem>
            </ListGroup>
            <Card.Header>
              Cart Information
            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>
              <ListGroup className="list-group-flush">
                {carts.items.map((item) => (
                  <ListGroupItem key={item._id} className="d-flex align-items-center">
                    <Image src={item.image} alt={item.title} thumbnail style={{ height: '100px', width: '100px' }} />
                    <div className="ml-3">
                      Title: {item.title}
                      <br />
                      Quantity: {item.qty}
                      <br />
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateItem(item._id, updatedQty, item);
                      }} className="d-flex align-items-center">
                        <input type="number" value={updatedQty} onChange={(e) => setUpdatedQty(e.target.value)} className="form-control form-control-sm mr-1" />
                        <button type="submit" className="btn btn-primary btn-sm">Update</button>

                        <Button variant="danger" className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(item._id)}>
                          <FaTrashAlt />
                        </Button>
                      </form>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        <NavLink
          to="/checkout"
          className="btn btn-outline-danger mb-5 w-25 mx-2"
        >
          Proceed to Checkout
        </NavLink>
        <NavLink
          to="/"
          className="btn btn-outline-primary mb-5 w-25 mx-2"
        >
          Home
        </NavLink>
      </div>
    </>
  );

}

export default SavedCart;