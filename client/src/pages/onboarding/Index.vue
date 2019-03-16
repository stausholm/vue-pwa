<template>
  <div class="onboarding-page">
    <div class="container--content">
      <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
      <div class="onboarding__bottom">
        <div class="dots">
          <span v-for="(dot, index) in childRoutes" :key="index" class="dot" :class="{'dot--is-current': index === activeStep}"></span>
        </div>
        <button class="btn" @click="skip">Skip onboarding</button>
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
      transitionName: 'onboard-left',
      yo: this.$router
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

<style lang="scss">
.onboarding-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  background-color: #fff;
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;

  .dots {
    display: flex;
    justify-content: center;
    margin: 8px auto;
    .dot {
      opacity: .6;
      width: 8px;
      height: 8px;
      background: #333;
      border-radius: 50%;
      display: inline-block;
      transition: opacity .2s ease-out;
      
      &:not(:last-child) {
        margin-right: 6px;
      }

      &--is-current {
        opacity: 1;
      }
    }
  }
}
.onboard-left-enter-active,
.onboard-left-leave-active,
.onboard-right-enter-active,
.onboard-right-leave-active {
  transition: transform 200ms ease, opacity 200ms ease;
}

.onboard-left-enter,
.onboard-left-leave-to,
.onboard-right-enter,
.onboard-right-leave-to {
  opacity: 0;
}

.onboard-left-enter,
.onboard-right-leave-to {
  transform: translateX(20vw);
}
.onboard-left-leave-to,
.onboard-right-enter {
  transform: translateX(-20vw);
}
// .onboard-left-move {
//   transition: transform 200ms ease;
// }




.fade-up {
  animation: reveal .4s ease-out;
}

@keyframes reveal {
  0% {opacity: 0; transform: translateY(10px);}
  33% {opacity: 0; transform: translateY(10px);}
  100% {opacity: 100; transform: translateY(0);}
}






.onboarding__bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  padding-top: 32px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0) 10%,rgba(255,255,255,1) 100%);

  button {
    pointer-events: initial;
  }
}
</style>
