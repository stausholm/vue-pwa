//https://www.sitepoint.com/throttle-scroll-events/
//https://css-tricks.com/debouncing-throttling-explained-examples/
//http://sampsonblog.com/simple-throttle-function/
  
//https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
//always call func after event ends, even if event ended within the throttle limit period
module.exports = function throttle (func, limit) {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}