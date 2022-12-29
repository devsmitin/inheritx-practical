import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "./features/products/productsSlice";
import SideCartItem from "./SideCartItem";

export default function SideCart(props) {
  const cart = useSelector((state) => state.products.cart);
  const data = useSelector((state) => state.products);
  const { products, productData } = data;

  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(toggleCart());
  };

  let subTotal = 0;
  let subTotalDiscount = 0;
  let finalPrice = 0;
  cart.forEach((item) => {
    const { id, qty } = item;
    const product = products.find((product) => product.id === id);
    const mainProduct = productData.find((product) => product.id === id);
    let itemTotal = product.price * qty;

    let discount = 0;

    if (qty >= Math.floor((Number(mainProduct.stock) * 90) / 100)) {
      discount = ((mainProduct.price * 20) / 100) * qty;
    } else if (qty >= Math.floor((Number(mainProduct.stock) * 50) / 100)) {
      discount = ((mainProduct.price * 10) / 100) * qty;
    } else if (qty >= Math.floor((Number(mainProduct.stock) * 10) / 100)) {
      discount = ((mainProduct.price * 5) / 100) * qty;
    }

    subTotal += itemTotal;
    subTotalDiscount += discount;
  });
  finalPrice = subTotal - subTotalDiscount;

  return (
    <div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                {cart.length ? (
                  <>
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={closeCart}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {cart.map((item) => {
                              const product = products.find(
                                (product) => product.id === item.id
                              );
                              return (
                                <SideCartItem
                                  key={item.id}
                                  product={product}
                                  qty={item.qty}
                                />
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs. {subTotal}</p>
                      </div>
                      {subTotalDiscount !== 0 && (
                        <>
                          <div className="mt-2 flex justify-between text-base font-medium text-gray-900">
                            <p>Discount</p>
                            <p>Rs. {subTotalDiscount.toFixed(2)}</p>
                          </div>

                          <div className="mt-2 flex justify-between text-base font-medium text-gray-900">
                            <p>Final Price</p>
                            <p>Rs. {finalPrice.toFixed(2)}</p>
                          </div>
                        </>
                      )}

                      <p className="mt-2 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          type="button"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={closeCart}
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="text-center py-14">
                      <span className="text-lg font-bold">Cart is empty</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
