export function maxLength(scope) {
  if (typeof scope.validations.maxLength === 'number') {
    if (scope.value.length > scope.validations.maxLength) {
      scope.errorText = `Use maximum ${scope.validations.maxLength} characters`;
      return false;
    }
  } else {
    // assume object with 'value' and 'message' properties
    if (scope.value.length > scope.validations.maxLength.value) {
      scope.errorText = scope.validations.maxLength.message;
      return false;
    }
  }
  return true;
}