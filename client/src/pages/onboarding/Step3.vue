<template>
  <div>
    <h1>It's secure</h1>
    <p>Obviously this app takes good care of your personal information, and would like to inform you that it infact does so.</p>
    <button @click="showModal = true" class="btn btn--transparent btn--responsive">How secure?</button>
    <button @click="next" class="btn btn--responsive">Nice</button>

    <modal-advanced 
      v-if="showModal" 
      @close="showModal = false" 
     >
      <p>Very secure</p>
      <!-- <button @click="showModal = false">more test</button> -->
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
      this.$router.replace('/onboarding/step4')
    }
  }
}
</script>
