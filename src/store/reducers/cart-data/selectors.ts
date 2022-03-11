import { LoadingStatus } from '../../../const';
import { CartItemType, CouponType } from '../../../types/cart-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getItemsInCart = (state: State): CartItemType[] => state[NameSpace.cart].cartItems;
export const getCoupon = (state: State): CouponType => state[NameSpace.cart].coupon;
export const getDiscount = (state: State): number => state[NameSpace.cart].discount;
export const getDiscountLoadingStatus = (state: State): LoadingStatus => state[NameSpace.cart].discountLoadingStatus;
export const getOrderLoadingStatus = (state: State): LoadingStatus => state[NameSpace.cart].orderLoadingStatus;
