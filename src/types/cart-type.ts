import { GuitarType } from './guitar-type';

export type CouponType = string | null;

export type CouponPostType = {
  coupon: CouponType,
}

export type OrderPostType = {
  guitarsIds: number[],
  coupon: CouponType,
}

export type CartItemType = {
  item: GuitarType,
  itemCount: number,
}
