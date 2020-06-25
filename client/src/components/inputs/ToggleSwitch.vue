<template>
  <div class="input-group options-list" :class="classes">
    <label class="form-switch options-list__item" :class="{'disabled': classes.disabled}">
      <span>
        {{label}}
        <span v-if="description" class="description__subtitle">{{description}}</span>
      </span>
      <div class="action">
        <div class="switch-label">
          <input type="checkbox"
            :name="name"
            :value="value"
            :disabled="disabled"
            :checked="value === true"
            @input="updateChecked($event.target.checked)"
            @focus="classObject.focused = true"
            @blur="blur">
            <span class="slider"></span>
        </div>
      </div>
    </label>
    <p class="helper-text" >{{helperText}}</p>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'ToggleSwitch',
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
        this.errorText = this.requiredMessage !== '' ? this.requiredMessage : this.defaultMessages.required;
        return false;
      }

      this.errorText = '';
      return true;
    }
  }
}
</script>

<style lang="scss">
.form-switch {
  padding: 0;

  .description__subtitle {
    display: block;
  }

}
.fieldset-group.input-group .fieldset-input-wrapper .options-list__item {
  color: inherit;
  align-items: center;
  font-size: inherit;
  margin: 0;
  padding: 10px 0;
}
</style>