<template>
  <div class="input-group" :class="classes">
    <label for="" class="input-label">{{label}}</label>
    <div class="input-wrapper">
      <textarea class="input-item" 
        :disabled="disabled"
        :autofocus="autofocus"
        :name="name"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="classObject.focused = true"
        @blur="blur"
        :placeholder="placeholder">
      </textarea>
    </div>
    <p class="helper-text">{{helperText}}</p>
    <p class="helper-text" v-if="validations.maxLength">{{value.length}} / {{validations.maxLength.value || validations.maxLength}}</p>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'TextArea',
  mixins: [formValidation]
}
</script>
