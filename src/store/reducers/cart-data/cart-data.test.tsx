import { datatype } from 'faker';
import { LoadingStatus } from '../../../const';
import { CartData } from '../../../types/state';
import { getFakeGuitar } from '../../../utils/mock';
import { addItemToCart, changeCartItemCount, clearCart, loadCoupon, loadDiscount, removeGuitarFromCart, removeItemFromCart, setDiscountLoadingStatus, setOrderLoadingStatus } from '../../action';
import { cartData } from './cart-data';

export const state: CartData = {
  cartItems: [],
  coupon: null,
  discount: 0,
  discountLoadingStatus: LoadingStatus.Idle,
  orderLoadingStatus: LoadingStatus.Idle,
};

const fakeGuitar = getFakeGuitar();
const otherFakeGuitar = getFakeGuitar();
const fakeCartItem = {
  item: fakeGuitar,
  itemCount: 1,
};

describe('Reducer: cartData', () => {

  it('with omit parameters should return initial state', () => {
    expect(cartData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should add item to cart', () => {
    expect(cartData(state, addItemToCart(fakeGuitar)))
      .toEqual({
        ...state,
        cartItems: [fakeCartItem],
      });
  });

  it('should remove item from cart', () => {
    const startCartItems = {
      item: fakeGuitar,
      itemCount: 2,
    };
    const endCartItems = {
      item: fakeGuitar,
      itemCount: 1,
    };
    const newState = {
      ...state,
      cartItems: [startCartItems],
    };
    expect(cartData(newState, removeItemFromCart(fakeGuitar)))
      .toEqual({
        ...state,
        cartItems: [endCartItems],
      });
  });

  it('should remove guitar from cart', () => {
    const firstCartItem = {
      item: fakeGuitar,
      itemCount: 2,
    };
    const secondCartItem = {
      item: otherFakeGuitar,
      itemCount: 1,
    };
    const newState = {
      ...state,
      cartItems: [firstCartItem, secondCartItem],
    };
    expect(cartData(newState, removeGuitarFromCart(otherFakeGuitar)))
      .toEqual({
        ...state,
        cartItems: [firstCartItem],
      });
  });

  it('should change item count in cart', () => {
    const fakeItemCount = datatype.number(50);
    const startCartItem = {
      item: fakeGuitar,
      itemCount: 2,
    };
    const endCartItem = {
      item: fakeGuitar,
      itemCount: fakeItemCount,
    };
    const newState = {
      ...state,
      cartItems: [startCartItem],
    };
    expect(cartData(newState, changeCartItemCount(fakeGuitar.id, fakeItemCount)))
      .toEqual({
        ...state,
        cartItems: [endCartItem],
      });
  });

  it('should load discount to store', () => {
    const fakeDiscount = datatype.number(50);
    expect(cartData(state, loadDiscount(fakeDiscount)))
      .toEqual({
        ...state,
        discount: fakeDiscount,
      });
  });

  it('should load coupon to store', () => {
    const fakeCoupon = datatype.string(20);
    expect(cartData(state, loadCoupon(fakeCoupon)))
      .toEqual({
        ...state,
        coupon: fakeCoupon,
      });
  });

  it('should update loading status when coupon are loaded or not loaded', () => {
    expect(cartData(state, setDiscountLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        discountLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(cartData(state, setDiscountLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        discountLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should update loading status when send order are sent or not sent', () => {
    expect(cartData(state, setOrderLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        orderLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(cartData(state, setOrderLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        orderLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should clear cart, remove discount, coupon from store', () => {
    const firstCartItem = {
      item: fakeGuitar,
      itemCount: 2,
    };
    const secondCartItem = {
      item: otherFakeGuitar,
      itemCount: 1,
    };
    const fakeDiscount = datatype.number(50);
    const fakeCoupon = datatype.string(20);
    const newState = {
      ...state,
      cartItems: [firstCartItem, secondCartItem],
      coupon: fakeCoupon,
      discount: fakeDiscount,
      discountLoadingStatus: LoadingStatus.Succeeded,
      orderLoadingStatus: LoadingStatus.Succeeded,
    };

    expect(cartData(newState, clearCart()))
      .toEqual(state);
  });

});

