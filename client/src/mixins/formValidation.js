export const formValidation = {
  data() {
    return {
      classObject: {
        focused: false,
        'has-content': false,
        disabled: false
      },
      hasBlurredOnce: false,
      errorText: ''
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
      type: [String, Array],
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
        this.errorText = 'Field required';
        return false;
      }


      // if we make this into a loop, the user can also define order of error messages, by order 
      // in which they were placed in schema

      // how about making the validation into functions instead of recreating loop all the time?
      // if (this.validations.minLength) {
      //   console.log('inside if')
      //   if (!this.someValidationFunction()) {
      //     return false;
      //   }
      // }
      //console.log('after if')

      if (this.validations.minLength) {
        if (typeof this.validations.minLength === 'number') {
          if (this.value.length < this.validations.minLength) {
            this.errorText = `Use minimum ${this.validations.minLength} characters`;
            return false;
          }
        } else {
          // assume object with 'value' and 'message' properties
          if (this.value.length < this.validations.minLength.value) {
            this.errorText = this.validations.minLength.message;
            return false;
          }
        }
      }

      if (this.validations.maxLength) {
        if (typeof this.validations.maxLength === 'number') {
          if (this.value.length > this.validations.maxLength) {
            this.errorText = `Use maximum ${this.validations.maxLength} characters`;
            return false;
          }
        } else {
          // assume object with 'value' and 'message' properties
          if (this.value.length > this.validations.maxLength.value) {
            this.errorText = this.validations.maxLength.message;
            return false;
          }
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
    },
    someValidationFunction() {
      console.log('inside someValidationFunction')
      return false;
    }
  },
  watch: { // let parent know if field is valid
    isValid() {
      let valid = this.isValid ? "valid" : "error";
      console.log(valid)
      this.$emit(valid, valid, this.disabled, this.dumb, 'watch')
    }
  },
  created() { // let parent know if field is valid oncreate.
    let valid = this.isValid ? "valid" : "error";
    console.log(valid, this.name, this.disabled, this.dumb)
    this.$emit(valid, valid, this.disabled, this.dumb, 'created')
  }
}