<template>
  <div class="input-group" :class="classes">
    <label for="" class="input-label">{{label}}</label>
    <div class="input-wrapper">
      <input :type="inputType" 
        class="input-item"
        :disabled="disabled"
        :autofocus="autofocus"
        :name="name"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="classObject.focused = true"
        @blur="blur"
        :placeholder="placeholder"
        ref="inputField">
        <span class="password-visibility-button btn-icon btn-icon--animate" @mousedown.prevent @click="toggleVisibility">
          <icon-base iconName="toggle visibility" iconColor="rgba(0, 0, 0, 0.54)" width="24" height="24">
            <transition name="icon-scale">
              <icon-visibility-off v-if="inputType === 'password'"/>
              <icon-visibility v-else/>
            </transition>
          </icon-base>
        </span>
    </div>
    <p class="helper-text">{{helperText}}</p>
    <p class="helper-text" v-if="validations.maxLength">{{value.length}} / {{validations.maxLength.value || validations.maxLength}}</p>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconVisibilityOff from '@/components/icons/outline/IconVisibilityOff';
import IconVisibility from '@/components/icons/outline/IconVisibility';

import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'PasswordInput',
  mixins: [formValidation],
  components: {
    IconBase, IconVisibilityOff, IconVisibility
  },
  props: {
    
  },
  data() {
    return {
      inputType: "password"
    }
  },
  computed: {
    
  },
  methods: {
    toggleVisibility() {
      //this.classObject.focused = true;
      //this.$refs.inputField.focus(); // will this make onscreen keyboard be wonky?
      this.inputType = this.inputType === "password" ? "text" : "password";
    }
  }
}
</script>
