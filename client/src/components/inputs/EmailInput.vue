<template>
  <div class="input-group" :class="classes">
    <label for="" class="input-label">{{label}}</label>
    <div class="input-wrapper">
      <input type="email" 
        class="input-item"
        :disabled="disabled"
        :autofocus="autofocus"
        :name="name"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="classObject.focused = true"
        @blur="blur"
        :placeholder="placeholder">
    </div>
    <p class="helper-text">{{helperText}}</p>
  </div>
</template>

<script>
export default {
  name: 'EmailInput',
  props: {
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
      type: String,
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
    }
  },
  data() {
    return {
      classObject: {
        focused: false,
        error: false,
        'has-content': false,
        disabled: false
      },
      errorText: ""
    }
  },
  computed: {
    classes() {
      return {
        focused: this.classObject.focused,
        error: this.classObject.error,
        'has-content': this.value,
        disabled: this.disabled
      }
    },
    helperText() {
      return this.errorText ? this.errorText : this.helper;
    }
  },
  methods: {
    blur() {
      this.classObject.focused = false;
      
    }
  }
}
</script>
