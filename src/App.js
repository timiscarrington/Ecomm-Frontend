import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import { Routes, Route } from 'react-router-dom'
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:id' element={<ProductDetail/>} />
      </Routes>
    </>
  );
}

export default App;
