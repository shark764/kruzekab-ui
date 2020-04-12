export const truncate = (num, places) => Math.trunc(num * 10 ** places) / 10 ** places;

export const isInteger = num => Number.isInteger(num);
