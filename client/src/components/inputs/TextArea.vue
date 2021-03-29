<template>
  <div class="input-group" :class="classes">
    <label for="" class="input-label">{{label}}</label>
    <div class="input-wrapper" :class="{'textarea-autogrow': autoGrow}">
      <textarea class="input-item" 
        :disabled="disabled"
        :autofocus="autofocus"
        :name="name"
        :value="value"
        @input="handleInput($event)"
        @focus="classObject.focused = true"
        @blur="blur"
        :placeholder="placeholder">
      </textarea>
    </div>
    <p class="helper-text">{{helperText}}</p>
    <p class="helper-text" v-if="validations.maxLength">{{value.length}} / {{validations.maxLength.value || validations.maxLength}}</p>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'TextArea',
  mixins: [formValidation],
  props: {
    autoGrow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput($event) {
      const val = $event.target.value;
      this.$emit('input', val)

      if(this.autoGrow) { 
        // TODO: this pure css could also be interesting to use if we don't care about IE, and display:grid; won't mess with other forms styles
        // https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
        const { 
          lineHeight, 
          width, 
          padding,
          border,
          boxSizing, 
          fontSize, 
          fontFamily, 
          letterSpacing,
          whiteSpace } = window.getComputedStyle($event.target);

        const fakeEl = document.createElement('div');
        fakeEl.textContent = val;
        fakeEl.style = `
          position: absolute; 
          float: left;
          line-height: ${lineHeight};
          visibility: hidden; 
          font-family: ${fontFamily}; 
          font-size: ${fontSize};
          letter-spacing: ${letterSpacing};
          width: ${width};
          padding: ${padding};
          border: ${border};
          box-sizing: ${boxSizing};
          white-space: ${whiteSpace};
          `;

        document.body.appendChild(fakeEl)
        const textareaContentHeight = fakeEl.offsetHeight;
        fakeEl.remove();

        $event.target.style.height = textareaContentHeight + 10 + 'px'; // + 10 to add a little extra spacingas it would cause a scrollbar to appear
      }
    }
  }
}
</script>
