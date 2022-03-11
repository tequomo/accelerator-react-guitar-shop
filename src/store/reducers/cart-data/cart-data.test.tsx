import { LoadingStatus } from '../../../const';
import { CartData } from '../../../types/state';
import { getFakeGuitar } from '../../../utils/mock';
import { addItemToCart, removeItemFromCart, setDiscountLoadingStatus, setOrderLoadingStatus } from '../../action';
import { cartData } from './cart-data';

export const state: CartData = {
  cartItems: [],
  coupon: null,
  discount: 0,
  discountLoadingStatus: LoadingStatus.Idle,
  orderLoadingStatus: LoadingStatus.Idle,
};

const fakeGuitar = getFakeGuitar();
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

});

