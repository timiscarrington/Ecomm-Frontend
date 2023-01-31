import React from 'react';

const Contact = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center">Contact Us</h1>
      <p className="text-center">Get in touch with us for any questions or concerns</p>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea className="form-control" id="message" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <hr />
      <h4 className="text-center">Or Contact Us Directly</h4>
      <p className="text-center">
        <strong>Email:</strong> contact@gumbycelebs.com
      </p>
      <p className="text-center">
        <strong>Phone:</strong> (555) 555-5555
      </p>
      <p className="text-center">
        <strong>Address:</strong> 123 Main St, Anytown USA 12345
      </p>
    </div>
  );
};

export default Contact;