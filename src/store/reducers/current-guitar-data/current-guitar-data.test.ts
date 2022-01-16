import { LoadingStatus } from '../../../const';
import { CurrentGuitarData } from '../../../types/state';
import { getFakeGuitar } from '../../../utils/mock';
import { loadCurrentGuitar, setCurrentGuitarLoadingStatus } from '../../action';
import { currentGuitarData } from './current-guitar-data';

const state: CurrentGuitarData = {
  currentGuitar: null,
  currentGuitarLoadingStatus: LoadingStatus.Idle,
};

const guitar = getFakeGuitar();

describe('Reducer: currentGuitarData', () => {

  it('with omit parameters should return initial state', () => {
    expect(currentGuitarData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should load current guitar', () => {
    expect(currentGuitarData(state, loadCurrentGuitar(guitar)))
      .toEqual({
        ...state,
        currentGuitar: guitar,
      });
  });

  it('should update loading status when current offer is loaded or not loaded', () => {
    expect(currentGuitarData(state, setCurrentGuitarLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        currentGuitarLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(currentGuitarData(state, setCurrentGuitarLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        currentGuitarLoadingStatus: LoadingStatus.Failed,
      });
  });

});

