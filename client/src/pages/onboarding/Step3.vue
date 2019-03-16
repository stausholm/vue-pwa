<template>
  <div>
    <p>step 3</p>
    <button @click="next">finish onboard</button>

    <button @click="showModal = true">show privacy stuff</button>

    <modal-advanced 
      v-if="showModal" 
      @close="showModal = false" 
     >
      <!-- <p>test</p>
      <button @click="showModal = false">more test</button> -->
    </modal-advanced>
  </div>
</template>

<script>
import ModalAdvanced from '@/components/modal/ModalAdvanced'

export default {
  components: {
    ModalAdvanced
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    next() {
      //localStorage.setItem('onBoardingComplete', true)
      this.$router.replace('/')
    }
  }
}
</script>
