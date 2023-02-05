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
                        <h5 className="card-title display-3 fw-bolder mb-0">TASTE THE FLAVOR OF FAME</h5>
                        <p className="card-text lead fs-2">CHECK OUT THE NEW GUM WE JUST <NavLink to="/products" className="text-white">DROPPED</NavLink>.</p>
                        </div>
                    </div>
            </div>
         
        </div>
    )
}

export default Home