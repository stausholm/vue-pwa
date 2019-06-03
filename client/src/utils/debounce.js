module.exports = function debounce (fn, delay) {
  console.log('got called')
  var timeoutID = null
  return function () {
    console.log('func')
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      console.log('func ran')
      fn.apply(that, args)
    }, delay)
  }
}

//https://github.com/vuejs-tips/tiny-debounce/blob/master/index.js