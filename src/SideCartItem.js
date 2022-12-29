import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "./features/products/productsSlice";

export default function SideCartItem({ product, qty }) {
  const data = useSelector((state) => state.products);
  const { productData } = data;

  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(removeCartItem(product.id));
  };

  const mainProduct = productData.find((prod) => prod.id === product.id);
  let discount = 0;

  if (qty >= Math.floor((Number(mainProduct.stock) * 90) / 100)) {
    discount = (mainProduct.price * 20) / 100;
  } else if (qty >= Math.floor((Number(mainProduct.stock) * 50) / 100)) {
    discount = (mainProduct.price * 10) / 100;
  } else if (qty >= Math.floor((Number(mainProduct.stock) * 10) / 100)) {
    discount = (mainProduct.price * 5) / 100;
  }

  let finalPrice = product.price - discount;

  console.log("discount", discount, qty);
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.thumbnail}
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between font-medium text-base text-gray-900">
            <h3>
              <span>{product.title}</span>
            </h3>
            <p className="ml-4 whitespace-nowrap">
              {discount ? (
                <>
                  <s className="text-red-500">Rs.{product.price}</s> Rs.
                  {finalPrice}
                </>
              ) : (
                <>Rs.{product.price}</>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {qty}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={removeFromCart}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
