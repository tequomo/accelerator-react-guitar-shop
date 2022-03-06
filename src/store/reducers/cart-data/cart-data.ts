import { createReducer } from '@reduxjs/toolkit';
import { CartItemType } from '../../../types/cart-type';
import { CartData } from '../../../types/state';
import { addItemToCart } from '../../action';

const initialState: CartData = {
  cartItems: [],
  coupon: null,
  discount: 0,
};


const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(addItemToCart, (state, action) => {
      const itemInCart = state.cartItems.find((cartItem) => cartItem.item.id === action.payload.id);
      if(itemInCart === undefined) {
        const addedItem: CartItemType = {
          item: action.payload,
          itemCount: 1,
        };
        state.cartItems.push(addedItem);
      }
      else {
        itemInCart.itemCount += 1;
        state.cartItems.map((cartItem) => cartItem.item.id === itemInCart.item.id ? itemInCart : cartItem);
      }
    });
  //   .addCase(setCurrentGuitarLoadingStatus, (state, action) => {
  //     state.currentGuitarLoadingStatus = action.payload;
  //   });
});

export { cartData };
