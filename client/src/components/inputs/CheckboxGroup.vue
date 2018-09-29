<template>
  <fieldset class="input-group" :class="classes">
    <legend class="fieldset-label">{{label}}</legend>
    <div class="fieldset-input-wrapper">
      <label v-for="(option, index) in options" :key="index">
        <input type="checkbox"
          :name="name"
          :value="option"
          :disabled="maxChecked && !disabled ? values.length >= maxChecked && !values.includes(option) : disabled" 
          v-model="values"
          @change="updateValue"
          @focus="classObject.focused = true"
          @blur="blur">
          <span>{{option}}</span>
      </label>

    </div>
    <p v-if="checkedMessage" class="helper-text">{{checkedMessage}}</p>
    <p class="helper-text">{{helperText}}</p>
  </fieldset>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'CheckboxGroup',
  mixins: [formValidation],
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
        this.errorText = 'Field required';
        return false;
      }

      if (this.values.length < this.minChecked) {
        this.errorText = ''; // we just use checkedMessage to show a helping text allways
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
