import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, toggleCart } from "./features/products/productsSlice";
import ProductList from "./ProductList";
import SideCart from "./SideCart";

function App() {
  const cartStatus = useSelector((state) => state.products.isCartOpen);
  const openCart = () => {
    dispatch(toggleCart());
  };

  const [data, setdata] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "InheritX Test";
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((res) => {
        res.cart = [];
        res.isCartOpen = false;
        setdata(res);
      });
  }, []);

  useEffect(() => {
    if (data) dispatch(fetchProducts(data));
  }, [data, dispatch]);

  return (
    <div className="app">
      <header className="flex justify-between items-center p-4 border-b shadow">
        <h1 className="text-lg font-bold">Product page demo</h1>
        <button
          type="button"
          onClick={openCart}
          className=" px-6 py-3 bg-blue-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500"
        >
          Open cart
        </button>
      </header>
      {data && (
        <>
          <ProductList />
          {cartStatus && <SideCart />}
        </>
      )}
    </div>
  );
}

export default App;
