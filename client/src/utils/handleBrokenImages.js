const placeholder = '/static/img/broken.png'

// replaces all <img> tags src that 404, with a placeholder
export default function replaceBrokenImagesInit(placeholderPath = placeholder, cb) {
  document.addEventListener('error', ({target}) => {
    if (target.tagName === 'IMG' && !target.getAttribute('data-replaced-broken-image')) {
      target.setAttribute('data-replaced-broken-image','1')
      target.setAttribute('data-broken-image-src',target.getAttribute('src'))
      target.setAttribute('src',placeholderPath)
      if (cb) {
        cb(target)
      }
    }
  }, true)
}