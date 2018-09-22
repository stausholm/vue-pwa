<template>
  <fieldset class="input-group">
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
          :value="option"
          v-model="values"
          @change="updateValue">
          {{option}}
      </label>

    </div>
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
  data() {
    return {
      values: this.value || []
    }
  },
  computed: {
    isValid() {
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
