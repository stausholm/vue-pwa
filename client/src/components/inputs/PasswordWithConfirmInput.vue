<template>
  <div>
    <password-input />
    <div class="input-group">
      confirm password
      
    </div>
  </div>
</template>

<script>
import PasswordInput from './PasswordInput';

export default {
  name: 'PasswordWithConfirm',
  components: {
    PasswordInput
  }
}
</script>
