<template>
  <div>
    <div class="input-group" :class="classes">
      <label for="" class="input-label">{{label}}</label>
      <div class="input-wrapper">
        <input :type="type" 
          class="input-item"
          :value="value"
          @input="$emit('input', $event.target.value)"
          :disabled="disabled"
          :autofocus="autofocus"
          :name="name"
          @focus="classObject.focused = true"
          @blur="blur"
          :placeholder="placeholder">

      </div>
      <p class="helper-text">{{helperText}}</p>
    </div>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'PasswordConfirm',
  mixins: [formValidation],
  props: {
    match: { // the name attribute of the input field to match
      type: String, 
      default: 'password'
    },
    matchMessage: { // the name attribute of the input field to match
      type: String, 
      default: 'Content does not match'
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      content: '',
      inputToMatch: null,
      matchInputHasChanged: false
    }
  },
  computed: {
    contentMatches() {
      return this.inputToMatch ? this.value === this.matchInputValue : false;
    },
    matchInputValue() {
      if (this.matchInputHasChanged) {
        this.matchInputHasChanged = false;
        return this.inputToMatch.value;
      }

      // return value if one was set initially
      return this.inputToMatch.value;
    },
    isValid() {
      if (!this.value) {
        return false;
      }
      if (!this.contentMatches) {
        this.errorText = this.matchMessage;
        return false;
      }

      this.errorText = '';
      return true;
    }
  },
  methods: {
    handleUpdateInMatched() {
      this.matchInputHasChanged = true;
    }
  },
  mounted() {
    this.inputToMatch = document.querySelector(`input[name="${this.match}"], select[name="${this.match}"]`) // works matching any string value input field, excluding radiobuttongroup
    this.inputToMatch.addEventListener('input', this.handleUpdateInMatched)
  },
  beforeDestroy() {
    this.inputToMatch.removeEventListener('input', this.handleUpdateInMatched)
  }
}
</script>
