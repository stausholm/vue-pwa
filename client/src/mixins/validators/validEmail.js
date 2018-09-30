export function validEmail(scope) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(scope.value)) { 
    if (typeof scope.validations.email === 'boolean') {
      scope.errorText = `${scope.value} is not a valid email`;
    } else {
      scope.errorText = scope.validations.email.message;
    }
    return false;
  }

  return true;
}