import defaultMessages from './validatorsDefaults'
import bytesToSize from '@/utils/bytesToSize'

export function validFileSize(scope) {
  const maxSize = scope.validations.maxSize
  const file = scope.$refs.image.files[0]

  if (typeof maxSize === 'number') {
    if (file.size > maxSize) {
      scope.errorText = defaultMessages.validFileSize(bytesToSize(maxSize));
      return false;
    }
  } else {
    // assume object with 'value' and 'message' properties
    if (file.size > maxSize.value) {
      scope.errorText = maxSize.message;
      return false;
    }
  }

  return true;
}