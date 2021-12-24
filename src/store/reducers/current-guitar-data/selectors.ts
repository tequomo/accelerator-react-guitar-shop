import { LoadingStatus } from '../../../const';
import { GuitarType } from '../../../types/guitar-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getCurrentGuitar = (state: State): GuitarType | null => state[NameSpace.currentGuitar].currentGuitar;
export const getCurrentGuitarLoadingStatus = (state: State): LoadingStatus => state[NameSpace.currentGuitar].currentGuitarLoadingStatus;
