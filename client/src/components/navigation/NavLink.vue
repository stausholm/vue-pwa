<template>
  <li :class="['nav-link', 'nav-link--depth-' + depth, route.class]">
    <a v-if="route.action"
      href="" 
      @click.prevent.stop="route.action"
      :title="route.title">{{route.label || route.title}}</a>

    <router-link v-else-if="useRouterLink"
      :to="route.path"
      :target="route.target"
      :rel="rel"
      :title="route.title">{{route.label || route.title}}</router-link>
      
    <a v-else 
      :href="route.path"
      :target="route.path"
      :rel="rel"
      :title="route.title">{{route.label || route.title}}</a>

      <span v-if="route.badge" :class="['nav-link__badge', `nav-link__badge--${route.badge.type || 'default'}`]">{{route.badge.label}}</span>

    <button v-if="route.children" @click="toggleChildren">{{showChildren ? '-' : '+'}}</button>

    <ul v-if="route.children && showChildren">
      <navlink v-for="child in route.children" :key="child.label" :useRouterLink="useRouterLink" :route="child" :depth="depth + 1" :expandAllChildren="expandAllChildren"/>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'navlink',
  props: {
    depth: {
      type: Number
    },
    useRouterLink: {
      type: Boolean,
      default: true
    },
    expandAllChildren: {
      type: Boolean,
      default: false
    },
    route: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showChildren: this.expandAllChildren 
    }
  },
  computed: {
    rel() {
      if (this.route.useSecureTargetBlank === false && this.route.target === '_blank') {
        return this.route.rel;
      } else if (this.route.target === '_blank') {
        return this.$route.rel ? this.route.rel + ' noopener noreferrer' : 'noopener noreferrer';
      }

      return this.route.rel;
    }
  },
  methods: {
    toggleChildren() {
      if (this.expandAllChildren) {
        this.showChildren = true;
        return;
      }
      this.showChildren = !this.showChildren;
    }
  }
}
</script>
