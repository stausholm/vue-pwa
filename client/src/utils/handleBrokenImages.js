const placeholder = '/static/img/broken.png'

export default function replaceBrokenImagesInit(placeholderPath = placeholder) {
  // console.log(placeholderPath)
  document.addEventListener('error', ({target}) => {
    if (target.tagName === 'IMG' && !target.getAttribute('data-replaced-broken-image')) {
      target.setAttribute('data-replaced-broken-image','1')
      target.setAttribute('src',placeholderPath)
    }
  }, true)
}