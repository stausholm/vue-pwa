<template>
  <fieldset class="input-group" :class="classes">
    <legend class="fieldset-label">{{label}}</legend>
    <div class="fieldset-input-wrapper">
      <!-- <checkbox v-for="(option, index) in options" :key="index" :isInGroup="true"/> -->
      <!-- <label v-for="(option, index) in options" :key="index">
        <input type="checkbox" 
          :value="option"
          :name="name"
          :checked="values.includes(option)"
          @bean="bean($event.target.value, $event.target.checked)"
          @input="$emit('input',$event.target.value)"
          >
        {{option}}
      </label> -->

      <label v-for="(option, index) in options" :key="index">
        <input type="checkbox"
          :name="name"
          :value="option"
          :disabled="disabled || values.length >= maxChecked && !values.includes(option)" 
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
// i think it would be a whole lot easier just to reimplement checkboxes here, instead of trying to use checkbox component
import Checkbox from './Checkbox';
import { formValidation } from '@/mixins/formValidation';
export default {
  name: 'CheckboxGroup',
  mixins: [formValidation],
  components: {
    Checkbox
  },
  props: {
    // minChecked: {
    //   type: Number,
    //   default: 0
    // },
    // maxChecked: {
    //   type: Number,
    //   default: 0
    // }
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

      if (this.minChecked) {

      }

      this.errorText = '';
      return true;
    },
    minChecked() {
      if (this.validations.minChecked) {
        return true
      }
      return false;
      //return 0;
    },
    maxChecked() {
      return 2;
      if (this.validations.maxChecked) {
        return true;
      }
      return false;
      //return this.options.length;
    },
    checkedMessage() {
      if (this.minChecked && !this.maxChecked) {
        return "please select at least X"
      }
      if (!this.minChecked && this.maxChecked) {
        return "Select up to X"
      }
      if (this.minChecked && this.maxChecked) {
        return "please select between X and X options"
      }
      return false;
    }
  },
  methods: {
    bean(val, check) {
      console.log(val, check)
    },
    updateValue() {
      console.log('updatevalue', this.values);
      this.$emit('input', this.values)
    }
  },
  watch: {
    // values() {
    //   this.$emit('input', this.values)
    // }
  }
}
</script>
