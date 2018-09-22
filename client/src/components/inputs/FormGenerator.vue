<template>
  <div>
    <form @submit.prevent="submitForm">
      <component v-for="(field, index) in schema"
                :key="index"
                :is="field.fieldType"
                :value="formData[field.name]"
                @input="updateForm(field.name, $event)"
                @error="updateErrors"
                @valid="updateErrors"
                v-bind="field">
      </component>

      <div class="input-group">
        <button type="submit" class="btn btn--responsive">
          <slot></slot>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import TextInput from './TextInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

export default {
  name: 'FormGenerator',
  components: {TextInput, EmailInput, PasswordInput},
  props: {
    schema: {
      type: Array
    },
    // action: {
    //   type: String
    // },
    // method: {
    //   type: String,
    //   default: 'GET'
    // },
    value: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      formData: this.value || {}, // populate form with data, if exists
      loading: false
    }
  },
  methods: {
    submitForm() {
      console.log('submitForm called')
      if(this.loading) {
        // submit in progress, prevent additional API calls

      } else {
        // if no errors, emit success event
        this.$emit('success')
        this.loading = true;
      }
    },
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    },
    updateErrors() {
      console.log('updating Errors')
    }
  }
}

/**
 * @param fieldType - the specific name of the component to be rendered. Used by component :is="fieldType"
 * @param name - String, specify the name of the input. Useful for browser autocompletion
 * @param label - String, frontend label text for the input
 * @param placeholder - String, placeholder text inside input
 * @param required - Boolean, input should be required. Defaults to true
 * @param disabled - Boolean, input should be disabled. Defaults to false
 * @param helper - String, Helper text to be displayed with the input field
 * @param autofocus - Boolean, autofocus this input when the form is loaded
 * @param validations - object with validations for the input field. Example below
 * @param dumb - Boolean, Ignore all form validations and required value for the input field
 * 
 * validations: {
 *    minLength: 4, //min length of string
 *    minLength: { // you can pass an object to also define a custom error message. if only a value is passed, default message will be used 
 *      value: 4,
 *      message: "my custom error message"
 *    },
 *    maxLength: 2, //max length of string
 *    minValue: 11, //min value of number
 *    maxValue: 12, //max value of number
 *    custom: [
 *      {
 *        value: /asd|dsa/g, //regex to match
 *        message: "Value may only be asd or dsa"
 *      },
 *      {
 *        ...
 *      }
 *    ]
 * }
 * 
 * input specific
 * @param options - Array of string values to be used with radiogroups, checkboxgroups and select lists
 * @param checked - Boolean value, determines if checkbox/toggleswitch should be checked
 */

</script>
