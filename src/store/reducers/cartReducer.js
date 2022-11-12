import { createSlice } from "@reduxjs/toolkit";

import { discount } from "../../utils/Discount";

const cartData = localStorage.getItem("cart");
const cartArray = cartData ? JSON.parse(cartData) : [];

const allItems = (data) => {
  let items = 0;
  for (let i = 0; i < data.length; i++) {
    items += data[i].quantity;
  }

  return items;
};

const calculateTotal = (data) => {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += discount(data[i].price, data[i].discount) * data[i].quantity;
  }

  return total;
};

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: cartArray.length > 0 ? cartArray : [],
    items: cartArray.length > 0 ? allItems(cartArray) : 0,
    total: cartArray.length > 0 ? calculateTotal(cartArray) : 0,
  },
  reducers: {
    addCart: (state, { payload }) => {
      state.cart.push(payload);
      state.items += payload.quantity;
      state.total +=
        discount(payload.price, payload.discount) * payload.quantity;
    },

    incQuantity: (state, { payload }) => {
      const findItem = state.cart.find((item) => item._id === payload);

      if (findItem) {
        findItem.quantity += 1;
        state.items += 1;
        state.total += discount(findItem.price, findItem.quantity);
        const index = state.cart.indexOf(findItem);
        state.cart[index] = findItem;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    decQuantity: (state, { payload }) => {
      const findItem = state.cart.find((item) => item._id === payload);

      if (findItem && findItem.quantity > 1) {
        findItem.quantity -= 1;
        state.items -= 1;
        state.total -= discount(findItem.price, findItem.quantity);
        const index = state.cart.indexOf(findItem);
        state.cart[index] = findItem;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    removeItem: (state, { payload }) => {
      const findItem = state.cart.find((item) => item._id === payload);

      if (findItem) {
        const index = state.cart.indexOf(findItem);
        state.items -= findItem.quantity;
        state.total -=
          discount(findItem.price, findItem.discount) * findItem.quantity;
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { addCart, incQuantity, decQuantity, removeItem } =
  cartReducer.actions;
export default cartReducer.reducer;
