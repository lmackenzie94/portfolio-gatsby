export const zeroedInt = (num, zeroes = 1) => {
  let numString = parseInt(num, 10).toString();
  let maxString = `1${Array.from({ length: zeroes })
    .fill(0)
    .join('')}`;
  while (numString.length < maxString.length) {
    numString = `0${numString}`;
  }
  return parseInt(numString);
};
