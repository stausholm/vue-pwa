export function minLength(scope) {
  if (typeof scope.validations.minLength === 'number') {
    if (scope.value.length < scope.validations.minLength) {
      scope.errorText = `Use minimum ${scope.validations.minLength} characters`;
      return false;
    }
  } else {
    // assume object with 'value' and 'message' properties
    if (scope.value.length < scope.validations.minLength.value) {
      scope.errorText = scope.validations.minLength.message;
      return false;
    }
  }
  return true;
}