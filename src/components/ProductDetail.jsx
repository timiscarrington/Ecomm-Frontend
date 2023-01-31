import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


const ProductDetail = () => {


const {id} = useParams();
const [product, setProduct] = useState ([]);
const [loading, setLoading] = useState(false);

useEffect(()=> {
    const getProduct = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        setProduct(await response.json());
        setLoading(false);
    }
    getProduct();
},[])

const Loading = () => {
    return(
        <>
            Loading...
        </>
    )
}

const ShowProduct = () => {
    return(
        <>
            <div className="col-md-6">
                <img src={product.image} alt={product.title} height='400px' width='400px' />
            </div>
            <div className="col-md-6">
                <h4 className='text-uppercase text-black-50'>
                    {product.category}
                </h4>
                <h1 className='display-5'>{product.title}'s Gum</h1>
                <p className="lead">
                    Rating {product.rating && product.rate}
                </p>
            </div>
        </>
    )
}

  return (
    <div>
      <div className="container">
        <div className="row">
            {loading ? <Loading/> : <ShowProduct/>}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
