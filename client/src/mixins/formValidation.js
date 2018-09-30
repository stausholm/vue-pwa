import { minLength } from './validators/minLength';
import { maxLength } from './validators/maxLength';
import { minValue } from './validators/minValue';
import { maxValue } from './validators/maxValue';
import { validEmail } from './validators/validEmail';
import { validUrl } from './validators/validUrl';

export const formValidation = {
  data() {
    return {
      classObject: {
        focused: false,
        'has-content': false,
        disabled: false
      },
      hasBlurredOnce: false,
      errorText: '',
      defaultMessages: {
        required: 'Field required'
      }
    }
  },
  props: {
    submitAttempted: { // updated when a form is submitted via formgenerator component
      type: Boolean,
      default: false
    },
    dumb: { // ignore all form validation and required 
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Array, Boolean], // arrays for checkbox groups, boolean for single checkboxes
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    requiredMessage: {
      type: String,
      default: ''
    },
    helper: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    validations: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isValid() {
      if (this.dumb || this.disabled) {
        return true;
      }

      if (this.required && !this.value) {
        this.errorText = this.requiredMessage !== '' ? this.requiredMessage : this.defaultMessages.required;
        return false;
      }

      if (this.value) { // check for this.value incase the field is not required but should still validate if user inputs something
        if (this.validations.minLength && !minLength(this)) return false;
        if (this.validations.maxLength && !maxLength(this)) return false;
        if (this.validations.minValue && !minValue(this)) return false;
        if (this.validations.maxValue && !maxValue(this)) return false;
        if (this.validations.email && !validEmail(this)) return false;
        if (this.validations.url && !validUrl(this)) return false;
      }

      if (this.validations.custom && this.value) {
        let invalid = false;

        for (let obj of this.validations.custom) {
          if (!obj.value.test(this.value)) {
            this.errorText = obj.message;
            invalid = true;
            break;
          }
        }
        if (invalid) {
          return false;
        }
      }


      this.errorText = '';
      return true;
    },
    classes() {
      if (this.dumb) {
        return {
          focused: this.classObject.focused,
          error: false,
          'has-content': this.value,
          disabled: false,
          valid: false
        }
      }
      return {
        focused: this.classObject.focused,
        error: !this.isValid && this.hasBlurredOnce || !this.isValid && this.submitAttempted,
        'has-content': this.value,
        disabled: this.disabled,
        valid: this.isValid && !this.disabled // disabled inputs should only be able to use 'has-content' and 'disabled' classes
      }
    },
    helperText() {
      if (!this.required && !this.errorText && !this.helper) { 
        // show 'Optional' if input is not required. input can still be invalid even though it's not a required field
        return 'Optional'
      }

      if (this.isValid && !this.dumb) {
        return 'Valid - ' + this.helper;
      }

      // this.errorText has to be something else than '', and the user has to have blurred the field once, or attempted to submit the form once
      return this.errorText && this.hasBlurredOnce || this.errorText && this.submitAttempted ? this.errorText : this.helper;
    }
  },
  methods: {
    blur() {
      this.classObject.focused = false;
      this.hasBlurredOnce = true; 
    }
  },
  watch: { // let parent know if field is valid
    isValid() {
      let valid = this.isValid ? "valid" : "error";
      console.log(this.name + ' input is now: ' + valid)
      this.$emit(valid, valid, this.disabled, this.dumb, 'watch')
    }
  },
  created() { // let parent know if field is valid oncreate.
    let valid = this.isValid ? "valid" : "error";
    console.log(`${this.name} state on create: ${valid}. Disabled: ${this.disabled} Dumb: ${this.dumb}`)
    this.$emit(valid, valid, this.disabled, this.dumb, 'created')
  }
}