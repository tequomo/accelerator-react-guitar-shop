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

// export const trapFocus = (element: HTMLElement) => {
//   const focusableEls = element.querySelectorAll<HTMLElement>('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
//   const firstFocusableEl = focusableEls[0];
//   const lastFocusableEl = focusableEls[focusableEls.length - 1];
//   const KEYCODE_TAB = 9;

//   element.addEventListener('keydown', (e) => {
//     const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

//     if (!isTabPressed) {
//       return;
//     }

//     if ( e.shiftKey ) /* shift + tab */ {
//       if (document.activeElement === firstFocusableEl) {
//         lastFocusableEl.focus();
//         e.preventDefault();
//       }
//     } else /* tab */ {
//       if (document.activeElement === lastFocusableEl) {
//         firstFocusableEl.focus();
//         e.preventDefault();
//       }
//     }
//   });
// };

export const localizeDate = (date: string): string => {
  const reviewDate = new Date(date);
  return reviewDate.toLocaleString('ru-Ru', { month: 'long', day: '2-digit' });
};
