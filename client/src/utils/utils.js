/**
 * returns a number between the two provided numbers. This includes the lower bound, but excludes the upper bound. This is intentional, to match the behaviour of e.g. Math.random and Array.slice
 * @summary returns a number between the two provided numbers
 * @function
 * @param {number} min - minimum number
 * @param {number} max - maximum number
 * @returns {number}
 */
export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * Takes an array, and returns a random item from that array
 * @function
 * @param {Array} arr - array of items to sample from
 * @returns {any} - item at a random index in the array
 */
export const sampleOne = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * returns a defined amount of random samples from an array
 * @function
 * @param {Array} arr - array of items to sample from
 * @param {number} len - amount of samples to take from the array
 * @returns {Array} - array of random items from the array. NB. these are not guaranteed to be unique
 */
export const sample = (arr, len = 1) => {
  let output = [];

  for (let i = 0; i < len; i++) {
    output.push(sampleOne(arr));
  }

  return output;
};

/**
 * clamps a value between an upper and lower bound
 * @function
 * @param {number} number - preferred return value
 * @param {number} lower - smallest (most negative) allowed return value
 * @param {number} upper - largest (most positive) allowed return value
 * @returns {number} - the preferred value, unless it exceeds the lower or upper bound
 */
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

//reference: https://jsdoc.app/index.html#block-tags