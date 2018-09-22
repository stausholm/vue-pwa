<template>
  <div :class="[isInGroup ? '' : 'input-group', classes]">
    <label>
      <input type="checkbox"
        :name="name"
        :value="value"
        :disabled="disabled"
        :checked="value === 'true'"
        @input="updateChecked($event.target.checked)"
        @focus="classObject.focused = true"
        @blur="blur"> <!-- @input="updateChecked($event.target.checked)" -->
      {{label}}
    </label>
    <p class="helper-text" v-if="!isInGroup">{{helperText}}</p>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'Checkbox',
  mixins: [formValidation],
  props: {
    isInGroup: {
      type: Boolean,
      default: false
    },
    dumb: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    updateChecked(checked) {
      //const VAL = checked ? this.name : ''; // current prop validation only accepts string values
      const VAL = checked ? 'true' : 'false';
      this.$emit('input', VAL)
    }
  },
  computed: {
    bean() {
      return this.name;
    },
    isValid() { // overwrite default validation checks
      return true;
    },
    classes() {
      return {
        focused: this.classObject.focused,
        disabled: this.disabled
      }
    },
    helperText() {
      return this.helper;
    }
  }
}
</script>
