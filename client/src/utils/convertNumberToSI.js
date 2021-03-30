// https://stackoverflow.com/a/9462382
/**
 * 
 * @param {number} num - The number to format
 * @param {number} digits - The amount of decimals to include. Default is none
 * @param {boolean} round - Should the number be rounded. Uses toFixed(). Default is false
 * @returns {string} - The number formatted to SI notation
 */
export default function nFormatter(num, digits, round) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (Math.abs(num) >= si[i].value) {
      break;
    }
  }
  if (round) {
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  } else {
    function toFixed(num, fixed) {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        return num.toString().match(re)[0];
    }
    return toFixed((num / si[i].value), digits).toString().replace(rx, "$1") + si[i].symbol;
  }
}
