<template>
    <label class="switch-label" :class="{'switch-label--disabled': disabled}">
      <input type="checkbox"
        :name="name"
        :value="value"
        :disabled="disabled"
        :checked="value === true"
        @input="updateChecked($event.target.checked)">
      <span class="slider"></span>
    </label>
</template>

<script>
export default {
  name: 'SwitchInput',
  props: {
    value: {
      type: Boolean, 
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateChecked(checked) {
      this.$emit('input', checked)
    }
  },
  computed: {
    
  }
}
</script>
