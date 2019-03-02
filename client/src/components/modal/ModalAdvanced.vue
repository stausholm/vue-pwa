<template>
  <transition name="advanced-modal">
  <div class="modal-advanced-container">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal-advanced container">
      <div class="modal-advanced__header" v-if="header">
        {{header}}
      </div>
      <div class="modal-advanced__body" ref="modalbody" tabindex="0">
        <slot>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam doloremque perspiciatis ullam asperiores magni consequatur fugiat odit quidem rem molestiae tempore, nulla unde recusandae, adipisci inventore laboriosam officia totam neque!</p>
          <ul>
            <li><span>yo1</span><input type="radio" name="" id=""></li>
            <li><span>yo2</span><input type="radio" name="" id=""></li>
            <li><span>yo3</span><input type="radio" name="" id=""></li>
            <li><span>yo4</span><input type="radio" name="" id=""></li>
            <li><span>yo5</span><input type="radio" name="" id=""></li>
            <li><span>yo6</span><input type="radio" name="" id=""></li>
            <li><span>yo7</span><input type="radio" name="" id=""></li>
            <li><span>yo8</span><input type="radio" name="" id=""></li>
            <li><span>yo9</span><input type="radio" name="" id=""></li>
            <li><span>yo9</span><input type="radio" name="" id=""></li>
            <li><span>yo9</span><input type="radio" name="" id=""></li>
            <li><span>yo9</span><input type="radio" name="" id=""></li>
            <li><span>yo9</span><input type="radio" name="" id=""></li>
            <li><span>yo9</span><input type="radio" name="" id=""></li>
            <li><span>yo9</span><input type="radio" name="" id=""></li>
            <input type="range" name="" id="">
          </ul>
        </slot>
      </div>
      <div class="modal-advanced__footer">
        <button @click="closeModal">Cancel</button>
        <button v-if="confirmLabel" :class="{destructive: confirmIsDestructive}" @click="$emit('accept')">{{confirmLabel}}</button>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalAdvanced',
  props: {
    confirmLabel: {
      type: String
    },
    confirmIsDestructive: {
      type: Boolean,
      default: false
    },
    header: {
      type: String
    }
  },
  data() {
    return {

    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    handleKeydown(e) {
      if (e.key.toLowerCase() === "escape") {
        e.preventDefault();
        return this.closeModal();
      }
    },
    handleFocusIn(e) {
      if (!e.target.matches('.modal-advanced *')) {
        // move focus back inside modal
        this.$refs.modalbody.focus()
      }
    }
  },
  created() {
    window.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('focusin', this.handleFocusIn)
    window.addEventListener('popstate', this.closeModal)
  },
  mounted() {
    document.body.classList.add('modal-advanced-open')
    this.$refs.modalbody.focus();
  },
  beforeDestroy() {
    document.body.classList.remove('modal-advanced-open')
    window.removeEventListener('keydown', this.handleKeydown)
    document.removeEventListener('focusin', this.handleFocusIn)
    window.removeEventListener('popstate', this.closeModal)
  }
}
</script>
