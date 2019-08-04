<template>
  <transition name="contextMenuTransition">
    <div class="context-menu" :class="{'as-bottom-sheet': mobileBottomSheet}">
      <div :class="`context-menu-content context-menu-content--${style}`">
        <ul>
          <li tabindex="0" v-for="action in actions" :key="action.label" @click="$emit(action.emit)" @keyup.space.enter="$emit(action.emit)">{{action.label}}</li>
        </ul>
      </div>
      <div class="context-menu-overlay"></div>
    </div>
  </transition>
</template>

<script>
const clickRegion = (ev) => {
  // return which quarter of the viewport was clicked
  const X = ev.clientX;
  const Y = ev.clientY;
  const topHalf = window.innerHeight / 2 > Y;
  const leftSide = window.innerWidth / 2 > X;

  if(topHalf && !leftSide) { //clicked topright
    return "topright";
  }
  if(topHalf && leftSide) { //clicked topleft
    return "topleft";
  }
  if(!topHalf && !leftSide) { //clicked bottomright
    return "bottomright";
  }
  if(!topHalf && leftSide) { //clicked bottomleft
    return "bottomleft";
  }
}

export default {
  name: 'ContextMenu',
  props: {
    actions: {
      type: Array,
      required: true
    },
    event: {
      required: true
    },
    mobileBottomSheet: { // show context menu as a bottom sheet instead on mobile
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      style: clickRegion(this.event)
    }
  }
}
</script>
