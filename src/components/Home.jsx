import React from 'react'
import { NavLink } from 'react-router-dom'
import Products from './Products'
// import store from '../redux/store'



const Home = () => {
//  const state = store.getState();
//  console.log(state)
    return (
        <div className='hero'>
            <div className="card w-100 text-bg-dark text-white border-0">
                <img src="/assets/gb.jpg" class="card-img-top" alt="Background" style={{ width: 'auto', height: '815px' }} />
                    <div className="card-img-overlay d-flex flex-column justify-content-center">
                        <div className="container">
                        <h5 className="card-title display-3 fw-bolder mb-0">STAR CHEW JUST GOT CHEWIER</h5>
                        <p className="card-text lead fs-2">CHECK OUT ALL OUR <NavLink to="/products" className="text-white">COLLECTIONS</NavLink>.</p>
                        </div>
                    </div>
            </div>
            {/* <Products/> */}
        </div>
    )
}

export default Home