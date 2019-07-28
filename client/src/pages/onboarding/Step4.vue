<template>
  <div>
    <h1>One last thing</h1>
    <p>Please write something inside this input to get started</p>
    <text-input v-model="dummy" label="an input"/>
    <button @click="next" class="btn" :class="{'btn--disabled': !dummy}">Finish onboarding</button>
  </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput';

export default {
  components: {
    TextInput
  },
  data() {
    return {
      dummy: ''
    }
  },
  methods: {
    next() {
      if (!this.dummy) return

      localStorage.setItem('onBoardingComplete', true)
      this.$router.replace('/')
    }
  }
}
</script>
