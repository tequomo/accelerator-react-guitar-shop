// del
export const numberWithSpaces = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const modifyImgUrl = (url: string, modificator: string): string => {
  const arr = url.split('/');
  arr.splice(1,0,modificator);

  return arr.join('/');
};
