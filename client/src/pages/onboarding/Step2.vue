<template>
  <div>
    <icon-base width="100%" height="30vh" class="fade-up">
      <icon-beach-access />
    </icon-base>
    <h1>Solve that one issue you're having</h1>
    <p>How to simply solve that one thing with this very useful app</p>
    <button class="btn" @click="next">Seems useful</button>
    <!-- <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p> -->
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
