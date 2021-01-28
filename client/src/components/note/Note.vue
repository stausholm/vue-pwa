<template>
  <transition :name="transition">
    <aside v-if="!dismissed && !!visible" :class="['side-note', `side-note--${type}`, {'side-note--dismissable': dismissable}]">
      <div class="side-note__icon" v-if="!hideIcon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <template v-if="type === 'info'">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </template>
          <template v-if="type === 'error'">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </template>
          <template v-if="type === 'success'">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </template>
          <template v-if="type === 'warning'">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </template>
        </svg>
      </div>
      <div v-if="dismissable" class="side-note__dismiss">
        <span class="side-note__dismiss-countdown" v-if="typeof visible === 'number'">Dismisses in {{visible}}s..</span>
        <button :aria-label="dismissLabel" class="side-note__dismiss-btn" @click="dismiss"></button>
      </div>
      <strong class="side-note__title" v-if="title">{{title}}</strong>
      <div class="side-note__body">
        <slot />
        <div class="side-note__expanded" v-if="hasExpandedChildren">
          <div v-if="!showExpandedChildren">
            <button @click="showExpandedChildren = true" class="side-note__expanded-toggle">
              <span>Show more</span>
              <icon-base width="20" height="20" class="icon">
                <icon-arrow-down />
              </icon-base>
            </button>
          </div>
          <transition name="slide-down">
            <div class="side-note__expanded-content" v-if="showExpandedChildren">
              <slot name="expanded"></slot>
            </div>
          </transition>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script>
import IconArrowDown from '../icons/IconArrowDown.vue'
import IconBase from '../icons/IconBase.vue'
/**
 * Sources:
 * https://joshwcomeau.com/react/animated-sparkles-in-react/ (general design)
 * https://vuetensils.stegosource.com/components/alert.html#dismissible (alert functionality)
 * https://github.com/Stegosource/vuetensils/blob/master/src/components/VAlert/VAlert.vue
 */
export default {
  components: { IconBase, IconArrowDown },
  name: 'Note',
  model: {
    prop: 'visible',
    event: 'update'
  },
  props: {
    type: {
      type: String,
      default: 'info' // info, warning, success, error
    },
    title: {
      type: String
    },
    visible: { // determines whether the note is visible. Also binds with v-model
      type: [Boolean, Number],
      default: true
    },
    dismissable: {
      type: Boolean,
      default: false
    },
    dismissLabel: { // aria-label for dismiss button
      type: String,
      default: 'Dismiss this note'
    },
    hideIcon: { // optionally hide the icon
      type: Boolean,
      default: false
    },
    transition: { // a transition name if you want to add one
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      dismissed: false,
      timerId: null,
      showExpandedChildren: false
    }
  },
  computed: {
    hasExpandedChildren() {
      return this.$slots.expanded && this.$slots.expanded.length > 0
    }
  },
  methods: {
    dismiss() {
      /**
       * Fired when a user manually dismissed an alert
       * @event dismiss
       * @type { undefined }
       */
      this.$emit("dismiss")
      this.dismissed = true
      if (typeof this.visible === "number") {
        this.$emit("update", 0)
        this.clearTimer()
      } else {
        this.$emit("update", false)
      }
    },
    countdown() {
      const { visible } = this
      if (visible <= 0) return
      this.timerId = setTimeout(() => {
        /**
         * Fired whenever the visibility changes. Either through user interaction, or a countdown timer
         * @event update
         * @type { boolean/number }
         */
        this.$emit("update", visible - 1)
      }, 1000)
    },
    clearTimer() {
      const { timerId } = this
      if (timerId) {
        clearInterval(timerId)
        this.timerId = null
      }
    }
  },
  watch: {
    visible: {
      handler(visible) {
        if (visible) {
          this.dismissed = false
        }
        if (typeof visible === "number") {
          this.clearTimer() // Clear timers in case this.visible watcher adds multiples
          this.countdown()
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.clearTimer()
  }
}
</script>
