import { CartItemType } from '../../../types/cart-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getItemsInCart = (state: State): CartItemType[] => state[NameSpace.cart].cartItems;
