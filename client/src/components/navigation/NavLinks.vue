<template>
  <div>
    <nav class="nav-list" ref="navList">
      <div class="nav-group" v-for="(group, index) in nav.navGroups" :key="index">
        <b class="nav-group__label">{{group.groupLabel}}</b>
        <ul class="nav-group__list">
          <nav-link @linkClicked="handleClick" @toggleChildren="handleEmit" v-for="route in group.routes" :key="route.label" :depth="0" :useRouterLink="nav.useRouterLink" :route="route" :expandAllChildren="nav.expandAllChildren"/>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import NavLink from './NavLink'

export default {
  name: 'navlinks',
  components: {
    NavLink
  },
  props: {
    nav: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleEmit(val, el) {
      if (val) {
        el.parentNode.classList.add('move-out')
        this.$refs.navList.classList.add('move-out')
      } else {
        el.parentNode.classList.remove('move-out')
        this.$refs.navList.classList.remove('move-out')
      }
    },
    handleClick() {
      this.$emit('linkClicked');
    }
  }
}

// expected nav structure: {
//   useRouterLink: true,
//   navGroups: [
//     {
//       groupLabel: 'a label',
//       routes: [
//         {
//           path: '',
//           action: '', // js function to trigger instead of a link
//           title: '',
//           label: '', // if empty, use title
//           class: '', // add specific css class (could be used for icons)
//           target: '_self', 
//           rel: '',
//           useSecureTargetBlank: true, // if target _blank, rel should be 'noopener noreferrer'. Default to true
//           children: [

//           ]
//         }
//       ]
//     }
//   ]
// }
</script>
