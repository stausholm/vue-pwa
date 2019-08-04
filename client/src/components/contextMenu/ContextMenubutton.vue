<template>
  <button @click="openMenu" class="button-with-context-menu">
    <icon-base iconName="more options" width="18" height="18">
      <icon-more-vert />
    </icon-base>
    <context-menu v-if="menuOpened" :actions="actions" :event="event" v-on="$listeners" :mobileBottomSheet="mobileBottomSheet"/>
  </button>
</template>

<script>
import ContextMenu from './ContextMenu'
import IconBase from '@/components/icons/IconBase'
import IconMoreVert from '@/components/icons/IconMoreVert'

export default {
  name: 'ContextMenuButton',
  components: {
    ContextMenu,
    IconBase,
    IconMoreVert
  },
  props: {
    actions: {
      type: Array,
      required: true
    },
    mobileBottomSheet: {
      type: Boolean
    }
  },
  data() {
    return {
      menuOpened: false,
      event: null
    }
  },
  methods: {
    openMenu(ev) {
      this.menuOpened = true;
      this.event = ev; // pass the click event that opened the menu, to get the clientX and clientY values from the click
    },
    closeMenu() {
      this.menuOpened = false;
    }
  },
  watch: {
    menuOpened() { // close menu when clicking on the window
      if(this.menuOpened) {
        window.addEventListener('click',this.closeMenu)
      } else {
        window.removeEventListener('click',this.closeMenu)
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('click',this.closeMenu)
  }
}
</script>