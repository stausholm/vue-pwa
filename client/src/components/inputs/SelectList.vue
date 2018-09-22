<template>
  <div class="input-group" :class="classes">
    <label for="" class="input-label">{{label}}</label>
    <div class="input-wrapper">
      <div class="select-wrapper">
        <select class="input-item"
          :disabled="disabled"
          :name="name"
          :value="value"
          @input="$emit('input', $event.target.value)"
          @focus="classObject.focused = true"
          @blur="blur">

          <option disabled>Please select one</option>
          <option v-for="option in options" :key="option">
            {{option}}
          </option>

        </select>
        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10l5 5 5-5z"></path>
        </svg>
      </div>
    </div>
    <p class="helper-text">{{helperText}}</p>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'SelectList',
  mixins: [formValidation]
}
</script>
