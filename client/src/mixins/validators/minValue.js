export function minValue(scope) {
  if (typeof scope.validations.minValue === 'number') {
    if (parseFloat(scope.value) < scope.validations.minValue) { 
      scope.errorText = `Minimum ${scope.validations.minValue}`;
      return false;
    }
  } else {
    // assume object with 'value' and 'message' properties
    if (parseFloat(scope.value) < scope.validations.minValue.value) {
      scope.errorText = scope.validations.minValue.message;
      return false;
    }
  }
  // NaN will always equal false, meaning
  // if parseFloat returns NaN, minValue will return true
  return true;
}