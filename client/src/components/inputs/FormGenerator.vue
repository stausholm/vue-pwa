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
                @file="setFile(field.name, $event)"
                @filebytearray="setByteArray(field.name, $event)"
                v-bind="field"
                :submitAttempted="submitAttempted">
      </component>

      <div class="input-group">
        <button type="submit" class="btn btn--responsive">
          <slot></slot>
        </button>
      </div>
    </form>
    <div v-if="invalidFields !== 0 && submitAttempted">Please fix above errors</div>
  </div>
</template>

<script>
import TextInput from './TextInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import TextArea from './TextArea';
import RadioGroup from './RadioGroup';
import SelectList from './SelectList';
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';
import ConfirmInput from './ConfirmInput';
import SliderInput from './SliderInput';
import NumberInput from './NumberInput';
import ImageInput from './ImageInput';
import FileInput from './FileInput';
import HiddenInput from './HiddenInput';

export default {
  name: 'FormGenerator',
  components: {
    TextInput, 
    EmailInput, 
    PasswordInput, 
    TextArea, 
    RadioGroup, 
    SelectList, 
    Checkbox, 
    CheckboxGroup, 
    ConfirmInput, 
    SliderInput, 
    NumberInput,
    ImageInput,
    FileInput,
    HiddenInput
  },
  props: {
    schema: {
      type: Array
    },
    loading: {
      type: Boolean,
      default: false
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
      invalidFields: 0,
      submitAttempted: false // tell children if they should show error styles
    }
  },
  methods: {
    submitForm() {
      this.submitAttempted = true;
      //console.log('submitForm called')
      if(this.loading) {
        // submit in progress, prevent additional API calls
        console.log('still awaiting response from server')
      } else if (this.invalidFields === 0){
        // if no errors, emit success event
        this.$emit('success')
      } else {
        console.log('fields are invalid')
      }
    },
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    },
    updateErrors(value, isDisabled, isDumb, caller) {
      // TODO: Redo this
      //console.log('updating Errors')
      if (value === "valid" && !isDisabled && !isDumb && caller === 'watch') {
        //console.log('is valid')
        // we only want to decrement for each field that is valid while not being disabled or dumb. 
        // if the value is valid on created(), we don't want to decrement, so we check for caller === 'watch'
        this.invalidFields--
      } else if (value === "error") {
        this.invalidFields++
        //console.log('is error')
      }
    },
    setFile(fieldName, value) {
      this.$set(this.formData, fieldName + '__file', value);
      this.$emit("input", this.formData);
    },
    setByteArray(fieldName, value) {
      this.$set(this.formData, fieldName + '__byte-array', value);
      this.$emit("input", this.formData);
    }
  }
}

/**
 * @param fieldType - the specific name of the component to be rendered. Used by component :is="fieldType"
 * @param name - String, specify the name of the input. Useful for browser autocompletion. Also used for modelbinding to object
 * @param label - String, frontend label text for the input
 * @param placeholder - String, placeholder text inside input
 * @param required - Boolean, input should be required. Defaults to true
 * @param requiredMessage - String, overwrite default required message
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
 *    minChecked: 4, //min ammount of checked checkboxes in checkboxgroup
 *    maxChecked: 6, //max ammount of checked checkboxes in checkboxgroup
 *    maxSize: 10000 //max size in bytes for imageInput
 *    custom: [
 *      {
 *        value: /asd|dsa/, //regex to match. the g flag messes with current implementation that loops over the custom array
 *        message: "Value may only be asd or dsa"
 *      },
 *      {
 *        ...
 *      }
 *    ]
 * }
 * 
 * input specific
 * @param options - Array of string values (or objects {label:'text', value: 'val'}) to be used with radiogroups, checkboxgroups and select lists
 * @param sortDir - either 'asc' or 'desc', for options. if not defined, use original array order, else sort alphabetically
 * @param min - Number, for range slider min value - default 0
 * @param max - Number, for range slider max value - default 100
 * @param steps - Number, range slider step
 * @param type - String, for Confirminput. Defines what type of input it should be. Default 'text'
 * @param match - String, for ConfirmInput. Defines what other inputfield it should match
 * @param matchMessage - String, for ConfirmInput. Defines a message to show if it doesn't match
 */

</script>
