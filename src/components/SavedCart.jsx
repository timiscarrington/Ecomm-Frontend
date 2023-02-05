import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

const SavedCart = ({apiUrl}) => {
    const [carts, setCarts] = useState([]);
    const {id} = useParams();
    const [updatedQty, setUpdatedQty] = useState(1);

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(`${apiUrl}/cart/${id}`);
        const carts = await result.json();
        setCarts([carts]);
      };
  
      fetchData();
    }, [id]);

    const handleDelete = async (itemId) => {
      await fetch(`${apiUrl}/cart/${id}/items/${itemId}`, {
        method: 'DELETE'
      });
      const updatedCarts = carts.map(cart => {
        const updatedCart = {...cart};
        updatedCart.items = updatedCart.items.filter(item => item._id !== itemId);
        return updatedCart;
      });
      setCarts(updatedCarts);
    };

    const handleUpdateItem = async (itemId, updatedQty, item) => {
      try {
        const result = await fetch(`${apiUrl}/cart/${id}/item/${itemId}`, {
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {carts.map((carts) => (
      <Card key={carts._id} style={{ width: '300px', height: '400px' }}>
        <Card.Header>
          Customer Information
        </Card.Header>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            Name: {carts.first_name} {carts.last_name}
            <br />
            Email: {carts.email}
          </ListGroupItem>
        </ListGroup>
        <Card.Header>
          Cart Information
        </Card.Header>
        <ListGroup className="list-group-flush">
          {carts.items.map((item) => (
            <ListGroupItem key={item._id}>
              <Image src={item.image} alt={item.title} thumbnail style={{ height:'100px', width: '100px' }} />
              <br />
Title: {item.title}
<br />
Quantity: {item.qty}
<br />
<form onSubmit={(e) => {
e.preventDefault();
handleUpdateItem(item._id, updatedQty, item);
}}>
<input type="number" value={updatedQty} onChange={(e) => setUpdatedQty(e.target.value)} />
<button type="submit">Update</button>
</form>
<Button variant="danger" style={{ marginRight: '1rem' }} onClick={() => handleDelete(item._id)}>
Delete Item
</Button></ListGroupItem>))}
</ListGroup>
</Card>
  ))}
  </div>
  </>
);
}

export default SavedCart;