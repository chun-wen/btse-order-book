 export const priceFormatter = (number: number | string) => {
  return new Intl.NumberFormat('en-US').format(Number(number));
};


