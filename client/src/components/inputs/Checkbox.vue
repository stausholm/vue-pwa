<template>
  <div class="input-group" :class="classes">
    <label>
      <input type="checkbox"
        :name="name"
        :value="value"
        :disabled="disabled"
        :checked="value === true"
        @input="updateChecked($event.target.checked)"
        @focus="classObject.focused = true"
        @blur="blur">
      {{label}}
    </label>
    <p class="helper-text" >{{helperText}}</p>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'Checkbox',
  mixins: [formValidation],
  props: {
    required: { // overwrite default required behaviour, as it is most common for checkboxes not to be required, unless it's a "i accept"
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateChecked(checked) {
      this.$emit('input', checked)
    }
  },
  computed: {
    isValid() { // overwrite default validation checks
      if (this.required && !this.value) {
        this.errorText = 'Field required';
        return false;
      }

      this.errorText = '';
      return true;
    }
  }
}
</script>
