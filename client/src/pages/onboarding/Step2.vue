<template>
  <div>
    <icon-base width="100%" height="30vh" class="fade-up">
      <icon-beach-access />
    </icon-base>
    <p>step 2</p>
    <button class="btn" @click="next">go to next</button>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconBeachAccess from '@/components/icons/IconBeachAccess';

export default {
  components: {
    IconBase, IconBeachAccess
  },
  methods: {
    next() {
      //localStorage.setItem('onBoardingComplete', true)
      this.$router.replace('/onboarding/step3')
    }
  }
}
</script>
