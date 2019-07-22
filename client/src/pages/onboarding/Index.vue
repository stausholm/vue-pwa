<template>
  <div class="onboarding-page">
    <div class="container--content">
      <transition :name="transitionName" mode="out-in">
        <router-view class="router-view"></router-view>
      </transition>
      <div class="onboarding__bottom">
        <div class="dots">
          <span v-for="(dot, index) in childRoutes" :key="index" class="dot" :class="{'dot--is-current': index === activeStep}"></span>
        </div>
        <button class="btn btn--small btn--inverted" @click="skip">Skip onboarding</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Onboarding',
  components: {

  },
  data() {
    return {
      transitionName: 'onboard-left'
    }
  },
  methods: {
    skip() {
      localStorage.setItem('onBoardingComplete', true)
      this.$router.replace('/')
    }
  },
  computed: {
    childRoutes() {
      return this.$router.options.routes.find(route => route.path === '/onboarding').children
    },
    activeStep() {
      return this.childRoutes.findIndex(route => route.name === this.$route.name)
    }
  },
   watch: {
    '$route' (to, from) {
      this.transitionName = to.meta.step > from.meta.step ? 'onboard-left' : 'onboard-right'
    }
  }
}
</script>