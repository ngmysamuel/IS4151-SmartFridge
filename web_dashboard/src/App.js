import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import NewProduct from './components/Products/NewProduct';
import ProductList from './components/Products/ProductList';
import './App.css';

function App() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/getData');
      const responseData = await response.json();
      let d = JSON.parse(responseData)
      console.log(d)
      setLoadedProducts(d);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const addProductHandler = async (productName, productPrice, id) => {
    console.log("addProductHandler() is called")
    try {
      const newProduct = {
        ACCOUNTNAME: productName,
        BALANCE: +productPrice, // "+" to convert string to number
        CHECKINGACCOUNTID: +id
      };
      let hasError = false;
      const response = await fetch('http://localhost:5000/api/postData', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        hasError = true;
      }
      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }

      setLoadedProducts(prevProducts => {
        console.log("setLoadedProducts(): ", prevProducts)
        return prevProducts.concat({
          ...newProduct
        });
      });
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <NewProduct onAddProduct={addProductHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <ProductList items={loadedProducts} />}
      </main>
    </React.Fragment>
  );
}

export default App;
