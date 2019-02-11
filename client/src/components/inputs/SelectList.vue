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

          <option value="" disabled></option>
          
          <option v-for="option in formattedOptions" :key="option.value" :value="option.value">
            {{option.label}}
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
  mixins: [formValidation],
  computed: {
    formattedOptions() {
      if (typeof this.options[0] === 'string') {
        if (this.sortDir === 'asc') {
          return this.options.map(item => ({label: item, value: item})).sort(this.sortAsc)
        } else if (this.sortDir === 'desc') {
          return this.options.map(item => ({label: item, value: item})).sort(this.sortDesc)
        }
        return this.options.map(item => ({label: item, value: item}))
      }


      if (this.sortDir === 'asc') {
        return this.options.map(item => item).sort(this.sortAsc)
      } else if (this.sortDir === 'desc') {
        return this.options.map(item => item).sort(this.sortDesc)
      }

      return this.options
    }
  },
  methods: {
    sortAsc(a, b) {
      const labelA = a.label.toLowerCase()
      const labelB = b.label.toLowerCase()
      return labelA > labelB ? 1 : -1
    },
    sortDesc(a, b) {
      const labelA = a.label.toLowerCase()
      const labelB = b.label.toLowerCase()
      return labelA < labelB ? 1 : -1
    }
  }
}
</script>
