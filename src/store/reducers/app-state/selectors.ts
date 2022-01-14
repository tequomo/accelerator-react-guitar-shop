import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getTotalCountGuitars = (state: State): number => state[NameSpace.state].totalCountGuitars;
export const getFirstLoadState = (state: State): boolean => state[NameSpace.state].firstLoadState;
export const getCurrentPage = (state: State): number => state[NameSpace.state].currentPage;
