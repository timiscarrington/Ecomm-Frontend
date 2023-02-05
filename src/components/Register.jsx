import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
  
    try {
      const response = await fetch('/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        setMessage('Registration failed. Please try again.');
        throw new Error('Failed to register');
      }
  
      const data = await response.json();
      console.log(data);
      setMessage('Registration successful!');
  
      setTimeout(() => {
        if (response.ok) {
          navigate('/login');
        }
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">First Name</label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
      {message && (
        <div className="alert alert-info">
            {message}
        </div>
        )}
        </form>
);
};

export default Register;

