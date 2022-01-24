import { MAX_RATING_VALUE } from '../const';
import { GuitarType } from '../types/guitar-type';

export const modifyImgUrl = (url: string, modificator: string): string => {
  const arr = url.split('/');
  arr.splice(1,0,modificator);

  return arr.join('/');
};

export const ratingValues = new Array(MAX_RATING_VALUE)
  .fill(null)
  .map((_, index) => index + 1);


export const debounce = <T>(callback: (e: T) => void, timeoutDelay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...rest: [T]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const capitalizeWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const sortingGuitars = (guitars: GuitarType[]) => {
  guitars.slice().sort((a, b) => b.name.localeCompare(a.name));
};
