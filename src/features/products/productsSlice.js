import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts(state, action) {
      const rawData = action.payload;
      rawData.productData = rawData.products
      return rawData;
    },
    updateProduct(state, action) {
      const { id, qty } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      const existingCartItem = state.cart.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.stock = Number(existingProduct.stock) - Number(qty);
        if (existingCartItem) {
          existingCartItem.qty = Number(existingCartItem.qty) + Number(qty);
        } else {
          state.cart.push(action.payload);
        }
      }
    },
    removeCartItem(state, action) {
      const id = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      const existingCartItem = state.cart.find((item) => item.id === id);
      existingProduct.stock =
        Number(existingProduct.stock) + Number(existingCartItem.qty);
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { fetchProducts, updateProduct, removeCartItem, toggleCart } =
  productsSlice.actions;

export default productsSlice.reducer;
