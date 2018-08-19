<template>
  <div class="bottom-nav" :class="{ 'bottomnav-hide': subRoute}">
    <div class="container">
      <nav>
        <router-link to="/example" replace>
          <icon-base iconName="beach" iconColor="#fff" width="24" height="24">
            <icon-beach-access />
          </icon-base>
          example
        </router-link>
        <router-link to="/" replace>
          <icon-base iconName="business center" iconColor="#fff" width="24" height="24">
            <icon-business-center />
          </icon-base>
          home
        </router-link>
        <router-link to="/aa" replace>
          <icon-base iconName="casino" iconColor="#fff" width="24" height="24">
            <icon-casino />
          </icon-base>
          <span>another home here</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import IconBase from '../icons/IconBase';
import IconCasino from '../icons/IconCasino';
import IconBeachAccess from '../icons/IconBeachAccess';
import IconBusinessCenter from '../icons/IconBusinessCenter';

export default {
  name: 'BottomNav',
  components: {
    IconBase, IconCasino, IconBeachAccess, IconBusinessCenter
  },
  data() {
    return {
    }
  },
  mounted() {
    document.documentElement.classList.add('has-bottomnav')
  },
  computed: {
    subRoute() {
      return this.$route.meta.enableBack;
    }
  }
}
</script>
