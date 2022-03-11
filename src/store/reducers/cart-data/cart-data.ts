import { createReducer } from '@reduxjs/toolkit';
import { CouponValue, LoadingStatus } from '../../../const';
import { CartItemType } from '../../../types/cart-type';
import { CartData } from '../../../types/state';
import {
  loadCoupon,
  loadDiscount,
  addItemToCart,
  removeItemFromCart,
  changeCartItemCount,
  setDiscountLoadingStatus,
  setOrderLoadingStatus,
  clearCart,
  removeGuitarFromCart
} from '../../action';

export const initialState: CartData = {
  cartItems: [],
  coupon: null,
  discount: 0,
  discountLoadingStatus: LoadingStatus.Idle,
  orderLoadingStatus: LoadingStatus.Idle,
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
    })
    .addCase(removeItemFromCart, (state, action) => {
      const itemInCart = state.cartItems.find((cartItem) => cartItem.item.id === action.payload.id);
      if(itemInCart !== undefined) {
        if(itemInCart.itemCount > 1) {
          itemInCart.itemCount -= 1;
          state.cartItems.map((cartItem) => cartItem.item.id === itemInCart.item.id ? itemInCart : cartItem);
        }
        else {
          const itemIndex = state.cartItems.indexOf(itemInCart);
          if (itemIndex !== -1) {
            state.cartItems.splice(itemIndex, 1);
          }
        }
      }
    })
    .addCase(removeGuitarFromCart, (state, action) => {
      const guitarInCart = state.cartItems.find((cartItem) => cartItem.item.id === action.payload.id);
      if(guitarInCart !== undefined) {
        const guitarIndex = state.cartItems.indexOf(guitarInCart);
        if (guitarIndex !== -1) {
          state.cartItems.splice(guitarIndex, 1);
        }
      }
    })
    .addCase(changeCartItemCount, (state, action) => {
      const itemInCart = state.cartItems.find((cartItem) => cartItem.item.id === action.payload.id);
      if(itemInCart !== undefined) {
        itemInCart.itemCount = action.payload.count;
        state.cartItems.map((cartItem) => cartItem.item.id === itemInCart.item.id ? itemInCart : cartItem);
      }
    })
    .addCase(loadDiscount, (state, action) => {
      state.discount = action.payload;
    })
    .addCase(loadCoupon, (state, action) => {
      state.coupon = action.payload;
    })
    .addCase(setDiscountLoadingStatus, (state, action) => {
      state.discountLoadingStatus = action.payload;
    })
    .addCase(setOrderLoadingStatus, (state, action) => {
      state.orderLoadingStatus = action.payload;
    })
    .addCase(clearCart, (state) => {
      state.cartItems.length = 0;
      state.coupon = CouponValue.Default;
      state.discount = 0;
      state.discountLoadingStatus = LoadingStatus.Idle;
      state.orderLoadingStatus = LoadingStatus.Idle;
    });
});

export { cartData };
