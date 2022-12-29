import React, { useState } from "react";
import { toggleCart, updateProduct } from "./features/products/productsSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const updateQty = (e) => {
    let value = e.target.value;
    value = value <= 0 ? 0 : value;
    value = value >= product.stock ? product.stock : value;
    setQty(Number(value));
  };

  const dispatch = useDispatch();
  const productAdd = (id, qty = 1) => {
    if (qty > 0) {
      dispatch(updateProduct({ id, qty }));
      dispatch(toggleCart());
      setQty(1);
    }
  };

  return (
    <div className="group relative">
      <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 border">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.title}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Stock available: {product.stock}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
          Rs. {product.price}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-x-2 justify-between">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          value={qty}
          min="0"
          max={product.stock}
          className="w-16 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
          onChange={(e) => updateQty(e)}
        />
        <button
          type="button"
          className="w-full px-6 py-3 bg-blue-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500"
          onClick={() => productAdd(product.id, qty)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
