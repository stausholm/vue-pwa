<template>
  <div class="bottom-nav" :class="{ 'bottomnav-hide': subRoute}">
    <div class="container">
      <nav>
        <router-link v-for="route in routes" :key="route.name" :to="route.path" replace>
          <icon-base>
            <component :is="route.meta.icon || fallbackIcon"></component>
          </icon-base>
          <span>{{route.meta.title}}</span>
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
      return this.$route.meta.enableBack //|| !this.$route.meta.isPrimary;
    },
    routes() {
      return this.$router.options.routes.filter(route => route.meta && route.meta.isPrimary)
    },
    fallbackIcon() {
      return IconCasino
    }
  }
}
</script>
