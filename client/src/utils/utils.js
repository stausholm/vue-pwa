// TODO: jsDoc
/**
 * returns a number between the two provided numbers
 * @param {number} min - the minimum number
 * @param {number} max - the maximum number
 */
export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const sampleOne = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const sample = (arr, len = 1) => {
  let output = [];

  for (let i = 0; i < len; i++) {
    output.push(sampleOne(arr));
  }

  return output;
};

export const clamp = (number, lower, upper) => {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}