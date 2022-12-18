import logo from './logo.svg';
import './App.css';
import ProductAdd from './components/ProductAdd';
import Products from './components/Products';
import { useState } from 'react'

function App() {
  const [product, setProduct] = useState(null);

  return (
    <div>
      <ProductAdd onNewProduct={setProduct}/>
      <Products product={product} />
    </div>
  );
}

export default App;
