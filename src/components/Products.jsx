import { useState, useEffect } from 'react';
import Skeleton from "react-loading-skeleton"
import { NavLink } from 'react-router-dom';

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        
        setLoading(true)
        console.log('Fetching...');
        fetch('http://localhost:8000/api/products/')
          
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data)
                setFilter(data)
                setLoading(false)
            
        })
    }, [])

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
            </>
        )
    }
   
    //Filters products by using the filter method on the category
    const filterProduct = (category) => {
        const updatedList = data.filter((x)=>x.category === category);
        setFilter(updatedList);

    }

    return (
        <div>
          <div className="container my-5 py-5">
            <div className="row">
              <div className="col-12 mb-5">
                <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                <hr />
              </div>
              <div className="row justify-content-center">
                {loading ? (
                  <Loading />
                ) : (
                    
                  <>
                  <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=> filterProduct("Actors")}>Actors Collection</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=> filterProduct("Actress")}>Actress Collection</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=> filterProduct("Artists")}>Artists Collection</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=> filterProduct("Athletes")}>Atheletes Collection</button>
                </div>
                    {filter.map((product, index) => {
                      return (
                        <div className="col-md-3 mb-4">
                          <div class="card h-100 text-center p-4" key={product.id}>
                            <img
                              src={product.image}
                              class="card-img-top"
                              alt={product.title}
                              height="250px"
                              width='100%'
                              
                            />
                            <div class="card-body">
                              <h5 class="card-title mb-0">{product.title}</h5>
                              <p class="card-text lead fw-bold">${product.price}</p>
                              <NavLink to={`/products/${product.id}`} class="btn btn-outline-dark">
                                Buy Now
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Products;