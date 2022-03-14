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

export const localizeDate = (date: string): string => {
  const reviewDate = new Date(date);
  return reviewDate.toLocaleString('ru-Ru', { month: 'long', day: '2-digit' });
};

export const reviewRatingValues = new Array(MAX_RATING_VALUE).fill(null).map((_, index) => index + 1).sort((a, b) => b - a);

export const hasBlankSpaces = (str: string) => str.match(/(\s)/g) !== null;
export const removeSpaces = (str: string) => str.replace(/(\s)/g,'');
export const hasStartZero = (str: string) => str.match(/^0+/) !== null;
export const removeStartZero = (str: string) => str.replace(/^0+/,'');


