<template>
  <ul class="breadcrumbs">
    <li>
      <router-link to="/">
        <icon-base>
          <icon-home />
        </icon-base>
      </router-link>
    </li>
    <li v-for="(crumb, index) in crumbs" :key="crumb.path">
      <span class="breadcrumb-divider" aria-hidden="true">/</span>
      <router-link :to="crumb.path">
        {{crumb.meta.title || `level: ${index}`}}
      </router-link>
    </li>
  </ul>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconHome from '@/components/icons/IconHome';

export default {
  name: 'Breadcrumbs',
  components: {
    IconBase,
    IconHome
  },
  data() {
    return {

    }
  },
  computed: {
    crumbs() {
      return this.$route.matched;
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  color: #333;

  li {
    display: flex;
    align-items: center;

    &:first-child {
      a {
        padding-left: 0;
      }
    }
  }

  .breadcrumb-divider {
    // font-weight: bold;
    opacity: .8;
  }

  a {
    color: #333;
    padding: 6px 8px;
    display: flex;
    align-items: center;

    &:hover {
      text-decoration: underline;
      color: #555;
      text-underline-position: under;
    }

    &.router-link-exact-active {
      font-weight: bold;
      pointer-events: none;
    }
  }
}
</style>
