import defaultMessages from './validatorsDefaults'

export function maxValue(scope) {
  if (typeof scope.validations.maxValue === 'number') {
    if (parseFloat(scope.value) > scope.validations.maxValue) { 
      scope.errorText = defaultMessages.maxValue(scope.validations.maxValue);
      return false;
    }
  } else {
    // assume object with 'value' and 'message' properties
    if (parseFloat(scope.value) > scope.validations.maxValue.value) {
      scope.errorText = scope.validations.maxValue.message;
      return false;
    }
  }
  // NaN will always equal false, meaning
  // if parseFloat returns NaN, maxValue will return true
  return true;
}