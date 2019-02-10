export default {
  maxLength: val => (`Use maximum ${val} characters`),
  minLength: val => (`Use minimum ${val} characters`),
  maxValue: val => (`Maximum ${val}`),
  minValue: val => (`Minimum ${val}`),
  validEmail: val => (`${val} is not a valid email`),
  validUrl: val => (`${val} is not a valid URL. Did you remember the http(s):// part?`),
  validFileSize: val => (`The Chosen file is too large. File must be smaller than ${val}`),
  required: 'This field is required'
}