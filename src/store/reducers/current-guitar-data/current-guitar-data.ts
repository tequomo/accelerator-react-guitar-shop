import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { CurrentGuitarData } from '../../../types/state';
import { loadCurrentGuitar, setCurrentGuitarLoadingStatus } from '../../action';

const initialState: CurrentGuitarData = {
  currentGuitar: null,
  currentGuitarLoadingStatus: LoadingStatus.Idle,
};


const currentGuitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCurrentGuitar, (state, action) => {
      state.currentGuitar = action.payload;
    })
    .addCase(setCurrentGuitarLoadingStatus, (state, action) => {
      state.currentGuitarLoadingStatus = action.payload;
    });
});

export { currentGuitarData };
