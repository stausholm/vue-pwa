<template>
  <button class="nav-hamburger btn-icon btn-icon--animate" @click="handleClick">
    <icon-base :iconName="iconName" width="24" height="24">
      <transition name="icon-rotate">
        <icon-arrow-back v-if="showBack"/>
        <icon-close v-else-if="navOpen"/>
        <icon-menu v-else/>
      </transition>
    </icon-base>
  </button>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconMenu from '@/components/icons/IconMenu';
import IconClose from '@/components/icons/IconClose';
import IconArrowBack from '@/components/icons/IconArrowBack';

import breakpoints from '@/constants/Breakpoints';

export default {
  name: 'Hamburger',
  components: {
    IconBase,
    IconMenu,
    IconClose,
    IconArrowBack
  },
  props: {
    navOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    iconName() {
      if (this.showBack) {
        return 'Go back'
      }

      return this.navOpen ? 'close menu' : 'Open menu';
    },
    showBack() {
      return this.$route.meta.enableBack && window.innerWidth < breakpoints.sm;
    }
  },
  methods: {
    handleClick() {
      if (this.showBack) {
        this.$router.go(-1);
      } else {
        this.$emit('toggleNav');
      }
    }
  }
}
</script>
