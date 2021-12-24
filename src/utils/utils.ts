import { MAX_RATING_VALUE } from '../const';

// del
export const numberWithSpaces = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const modifyImgUrl = (url: string, modificator: string): string => {
  const arr = url.split('/');
  arr.splice(1,0,modificator);

  return arr.join('/');
};

export const ratingValues = new Array(MAX_RATING_VALUE)
  .fill(null)
  .map((_, index) => index + 1);
  // .sort((a, b) => b - a);

export const debounce = <T>(callback: (e: T) => void, timeoutDelay: number) => {

  let timeoutId: ReturnType<typeof setTimeout>;
  return (...rest: [T]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
