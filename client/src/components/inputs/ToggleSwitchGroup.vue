<template>
  <fieldset class="input-group fieldset-group" :class="classes">
    <legend class="fieldset-label">{{label}}</legend>
    <div class="fieldset-input-wrapper options-list">
      <label v-for="(option, index) in formattedOptions" 
        :key="index" 
        class="form-switch options-list__item" 
        :class="{'disabled': classes.disabled || (maxChecked && !disabled ? values.length >= maxChecked && !values.includes(option.value) : disabled)}">
        <span>
          {{option.label}}
          <span v-if="option.description" class="description__subtitle">{{option.description}}</span>
        </span>
        <div class="action">
          <div class="switch-label">
            <input type="checkbox"
              :name="name"
              :value="option.value"
              :disabled="maxChecked && !disabled ? values.length >= maxChecked && !values.includes(option.value) : disabled" 
              v-model="values"
              @change="updateValue"
              @focus="classObject.focused = true"
              @blur="blur"> <!-- disabled is applied to elements that are not checked, if max allowed checkboxes have been checked -->
              <span class="slider"></span>
          </div>
        </div>
      </label>

    </div>
    <p v-if="checkedMessage" class="helper-text">{{checkedMessage}}</p>
    <p class="helper-text">{{helperText}}</p>
  </fieldset>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';
import { formFormatOptions } from '@/mixins/formFormatOptions';

export default {
  name: 'ToggleSwitchGroup',
  mixins: [formValidation, formFormatOptions],
  props: {

  },
  data() {
    return {
      values: this.value || []
    }
  },
  computed: {
    isValid() {
      // overwrite isValid from mixin
      if (this.dumb || this.disabled) {
        return true;
      }

      if (this.required && this.values.length < 1) {
        this.errorText = this.requiredMessage !== '' ? this.requiredMessage : this.defaultMessages.required;
        return false;
      }

      if (this.values.length < this.minChecked) {
        this.errorText = ''; // we just use checkedMessage to show a helping text always
        return false;
      }

      this.errorText = '';
      return true;
    },
    minChecked() {
      if (this.validations.minChecked) {
        return this.validations.minChecked.value ? this.validations.minChecked.value : this.validations.minChecked;
      }
      // if this.validations.minChecked is set to 0, it will also return false. 
      // It will however return true if this.validations.minChecked is an object where value property is 0
      return false; 
    },
    maxChecked() {
      if (this.validations.maxChecked) {
        return this.validations.maxChecked.value ? this.validations.maxChecked.value : this.validations.maxChecked;
      }
      return false;
    },
    checkedMessage() {
      if (this.minChecked && !this.maxChecked) {
        if (this.validations.minChecked.message) { // we have a custom message
          return this.validations.minChecked.message;
        }
        return `please select at least ${this.minChecked}`;
      }
      if (!this.minChecked && this.maxChecked) {
        if (this.validations.maxChecked.message) {
          return this.validations.maxChecked.message;
        }
        return `select up to ${this.maxChecked}`;
      }
      if (this.minChecked && this.maxChecked) {
        return `please select between ${this.minChecked} and ${this.maxChecked}`;
      }
      return false;
    }
  },
  methods: {
    updateValue() {
      //console.log('updatevalue', this.values);
      this.$emit('input', this.values)
    }
  }
}
</script>
