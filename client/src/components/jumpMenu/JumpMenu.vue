<template>
  <div class="jump-menu" :class="{'menu-active': active, 'level-2-active': level2Open, 'level-3-active': level3Open}" :aria-hidden="!active">
    <div class="jm-overlay" ref="overlay" @click="active = false">
      <icon-base class="icon" iconName="close">
        <icon-close />
      </icon-base>
    </div>
    <div class="jm-container jm-container--level-1">
      <transition name="fade">
        <a v-if="level2Open && active" href="#" @click.prevent="goBackToLevel1" title="Go back" class="level-2-go-back">
          <icon-base class="icon" width="40" iconName="Go back">
              <icon-arrow-left />
            </icon-base>
        </a>
      </transition>

      <transition name="fade">
        <nav class="main-nav" role="tablist" v-if="active">
          <a href="#" 
             v-for="(tab, index) in tabs" :key="index + 1"
             @click.prevent="setActive(index + 1)"
             :class="{'active': isActive(index + 1)}"
             role="tab"
             :aria-selected="isActive(index + 1)"
             :aria-setsize="tabs.length"
             :aria-posinset="index + 1"
             :aria-controls="'jm-tab-panel-' + (index + 1)"
             :id="'jm-tab-label-' + (index + 1)"
             :title="tab.label"
          >
            <icon-base class="icon" :iconName="tab.label">
              <component :is="tab.icon"></component>
            </icon-base>
          </a>
        </nav>
      </transition>

      <transition name="fade">
        <div class="menu-inner" v-if="active">
          <panel1 class="panel" :class="{'active': isActive(1)}" :aria-hidden="!isActive(1)" role="tabpanel" id="jm-tab-panel-1" aria-labelledby="jm-tab-label-1"/>

          <panel2 class="panel" :class="{'active': isActive(2)}" :aria-hidden="!isActive(2)" role="tabpanel" id="jm-tab-panel-2" aria-labelledby="jm-tab-label-2"/>

          <panel3 class="panel" :class="{'active': isActive(3)}" :aria-hidden="!isActive(3)" role="tabpanel" id="jm-tab-panel-3" aria-labelledby="jm-tab-label-3"/>

          <article class="panel" :class="{'active': isActive(4)}">
            <section class="section-flex">
              <h2 class="panel-title">dummy 2nd level list</h2>
            </section>
            <section class="section-flex">
              <div class="block full">
                <button @click="openLevel2">open nav</button>
              </div>
            </section>
          </article>
        </div>
      </transition>

      <div class="jm-container jm-container--level-2" :class="{'open': level2Open}">
        <transition name="fade">
          <div class="menu-inner" v-if="level2Open && active">
            <article class="panel active"> <!-- TODO: how to make this content dynamic -->
              <span class="tab-go-back">Go back</span> <!-- TODO: should we have this as a way to tab to a back button, or don't we need a way to tab to a back button because we have esc and arrowleft?-->
              <section class="section-flex">
                <h2 class="panel-title">navigation 2nd level!</h2>
              </section>
              <section class="section-flex">
                <div class="block full">
                  <p>clicking on the part of level-1 visible should go back. ✔</p>
                  <p>leftkey and esc should go back ✔</p>
                  <p>rightkey should stopPropagation ✔</p>
                  <p>focused el from before should be refocused when closing 2nd level ✔</p>
                  <p>focus should be moved into 2nd level menu</p>
                  <p>on mobile there should be a backbutton in upper corner, and touchevents for left and right should stopPropagation</p>

                  <button @click="goBackToLevel1">Click to close</button>
                </div>
              </section>
            </article>
          </div>
        </transition>
      </div>
    </div>
  </div>  
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconClose from '@/components/icons/IconClose';
import IconArrowLeft from '@/components/icons/IconArrowLeft';
import Panel1 from './panels/Panel1'
import Panel2 from './panels/Panel2'
import Panel3 from './panels/Panel3'

// const tabLegend = {
//   1: 'search',
//   2: 'home',
//   3: 'stuff'
// }

const tabs = [
  {
    label: 'a label',
    icon: () => import('@/components/icons/IconSearch')
  },
  {
    label: 'another label',
    icon: () => import('@/components/icons/IconHome')
  },
  {
    label: 'a third label',
    icon: () => import('@/components/icons/IconStarBorder')
  },
  {
    label: 'test second layer',
    icon: () => import('@/components/icons/IconBeachAccess')
  }
]

export default {
  name: 'JumpMenu',
  components: {
    IconBase,
    IconClose,
    IconArrowLeft,
    Panel1,
    Panel2,
    Panel3
  },
  props: {

  },
  data() {
    return {
      touchY: null,
      touchX: null,
      active: false,
      activeTab: 2,
      tabs: tabs,
      level2Open: false,
      level3Open: false,
      storedHighlightedEl: null
    }
  },
  methods: {
    isActive(tab) {
      return this.activeTab === tab;
    },
    setActive(tab) {
      console.log(tab)
      this.activeTab = tab;
    },
    switchLeft() {
      const previousTab = this.activeTab === 1 ? tabs.length : this.activeTab - 1;
      this.setActive(previousTab)
    },
    switchRight() {
      const nextTab = this.activeTab === tabs.length ? 1 : this.activeTab + 1;
      this.setActive(nextTab)
    },
    closeMenu() {
      this.active = false;
      // TODO: cleanup if level2 menu was open
    },
    handleFocusIn(e) { // TODO: this is not looping through correctly.
      console.log(e.target)
      if (this.active && this.level2Open && !e.target.matches('.jump-menu .jm-container--level-2 .panel.active *')) {
        // move focus back inside level 2 menu
        this.$el.querySelector('.jm-container--level-2 .panel.active a, .jm-container--level-2 .panel.active button').focus()
        return
      }

      if (this.active && !e.target.matches('.jump-menu .main-nav a, .jump-menu .panel.active *')) {
        // move focus back inside menu
        if (e.target.matches('.jump-menu .panel:not(.active) *')) {
          this.$el.querySelector('.panel.active a, .panel.active button').focus()
        } else {
          this.$el.querySelector('.main-nav a').focus()
        }
      }
    },
    handleTouchStart(e) {
      this.touchX = e.touches[0].clientX;                                      
      this.touchY = e.touches[0].clientY;
    },
    handleTouchMove(e) {
      if (!this.touchY || !this.touchX) {
        return
      }

      const moveX = e.touches[0].clientX;                                      
      const moveY = e.touches[0].clientY;

      const xDiff = this.touchX - moveX;
      const yDiff = this.touchY - moveY;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          // left swipe
          this.switchRight()
        } else {
          // right swipe
          this.switchLeft()
        }
      } else {
        if (yDiff > 0) {
          // up swipe
          this.$refs.overlay.classList.add('folded')
        } else {
          // down swipe
          this.$refs.overlay.classList.remove('folded')

        }
      }

      this.touchX = null;
      this.touchY = null;
    },
    storeCurrentEl() { // TODO: keep reference of el that opened a level2 menu. How will we also store a level2 el that opened a level3 menu? this.storedHighlightedEl2 ?
      this.storedHighlightedEl = document.activeElement
    },
    clearCurrentEl() {
      this.storedHighlightedEl = null
    },
    clearCurrentFocus() { // when navigating to other level 1 tabs, clear potential focus from previous tab
      document.activeElement.blur()
    },
    handleKeydownLevel2(e, key) {
      const upDownCssSelector = '.jm-container--level-2 .panel.active a, .jm-container--level-2 .panel.active button'
      switch(key) {
        case "escape": // close level 2 menu
        case "arrowleft":
          e.stopPropagation()
          e.preventDefault()
          this.goBackToLevel1()
          break;

        case "arrowright":
          e.stopPropagation()
          e.preventDefault()
          break;

        case "arrowup":
          e.stopPropagation()
          e.preventDefault()
          this.switchFocus(upDownCssSelector, 'up')
          break;

        case "arrowdown":
          e.stopPropagation()
          e.preventDefault()
          this.switchFocus(upDownCssSelector, 'down')
          break;

        default:
          break;
      }
    },
    goBackToLevel1() {
      this.level2Open = false;
      if (this.storedHighlightedEl) {
        this.storedHighlightedEl.focus()
        this.clearCurrentEl()
      }
    },
    openLevel2() {
      if (!this.storedHighlightedEl) { // TODO: maybe also handle if using mouseclick?
        this.storeCurrentEl()
        this.storedHighlightedEl.blur()
      }
      this.level2Open = true;
    },
    switchFocus(cssSelector, direction) { // both arguments = strings
      const buttons = Array.from(this.$el.querySelectorAll(cssSelector))
      const currentButton = document.activeElement
      const index = buttons.indexOf(currentButton)
      console.log(buttons, currentButton, index)

      if (direction === 'up') {
        if (index > -1) {
          if (index === 0) {
            buttons[buttons.length - 1].focus() // wrap down to last
          } else {
            buttons[index - 1].focus()
          }
        } else if (buttons.length > 0) {
          buttons[buttons.length - 1].focus() // fallback to focus last in active tab.
        }
      }

      if (direction === 'down') {
        if (index > -1) {
          if (index + 1 === buttons.length) {
            buttons[0].focus() // wrap back up to the first
          } else {
            buttons[index + 1].focus()
          }
        } else if (buttons.length > 0){
          buttons[0].focus() // fallback to focus first button in active tab.
        }
      }
    }
  },
  mounted() {
    this.$el.addEventListener('touchstart', this.handleTouchStart, false)
    this.$el.addEventListener('touchmove', this.handleTouchMove, false)
  },
  created() {
    this.$root.$on('jumpmenu', () => { // TODO: make better
      this.active = true;
    })
    document.addEventListener('focusin', this.handleFocusIn) // prevent tab focus from escaping menu
    window.addEventListener('popstate', this.closeMenu) // close menu when navigating. TODO: also add same check as modalAdvanced in router.

    document.addEventListener('keydown', e => {
      const key = e.key.toLowerCase()
      const upDownCssSelector = '.panel.active a, .panel.active button'
      // this is not in switch case for level 1 keydowns because it should always run, no matter if you have level2 or 3 open
      if (key === "j" && e.ctrlKey) {
        this.active = !this.active;
        this.setActive(2) // always start on this tab // TODO: make a prop
        // TODO: cleanup if level2 menu was open (we want to close it)
        e.preventDefault();
        return;
      }

      //handle level2 keydowns
      if (this.level2Open) {
        return this.handleKeydownLevel2(e, key) // ignore level 1 events, by returning here
      }

      // handle level 1 keydowns
      switch(key) {
        case "escape":
          if (this.active) {
            this.closeMenu()
          }
          break;

        case "q": // shortcut to open search tab
          if(!this.active && e.ctrlKey) {
            e.preventDefault()
            this.setActive(1);
            this.active = true;
            // TODO: focus search input in tab
          }
          break;

        case "arrowleft":
          if (this.active) {
            e.stopPropagation()
            e.preventDefault()
            this.switchLeft()
            this.clearCurrentFocus()
          }
          break;

        case "arrowright":
          if (this.active) {
            e.stopPropagation()
            e.preventDefault()
            this.switchRight()
            this.clearCurrentFocus()
          }
          break;

        case "arrowup":
          if (this.active) {
            e.stopPropagation()
            e.preventDefault()
            this.switchFocus(upDownCssSelector, 'up')
          } 
          break;

        case "arrowdown":
          if (this.active) {
            e.stopPropagation()
            e.preventDefault()
            this.switchFocus(upDownCssSelector, 'down')
          }
          break;

        default:
          break;
      }
    })
  }
}
</script>

<style lang="scss">
@import "@/styles/base/variables.scss";
@import "@/styles/base/_breakpoints.scss";

$menu-bg: rgba(240, 240, 240, .95);
$primary-color: #6190e8;
$text-color: #212121;
$btn-bg-color: rgba(0,0,0, .07);
$transition-ease: cubic-bezier(.17,.67,.16,.99);

// $menu-bg: rgba(45, 45, 45, .95);
// $primary-color: orangered;
// $text-color: #fff;
// $btn-bg-color: rgba(240,240,240, .07);

.jump-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  //overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10000;

  &:not(.menu-active) * {
    user-select: none;
    pointer-events: none;
  }
}

.jm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  //display: block;
  width: 0;
  height: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity .15s linear, width 0s linear, height 0s linear;
  transition-delay: 0s, .15s, .15s;
  z-index: 1;

  .icon { // close icon on mobile
    display: none;
  }

  .menu-active & {
    opacity: 1;
    width: 100%;
    height: 100%;
    transition-delay: 0s, 0s, 0s;

    @include breakpoint-max(sm) {
      width: 60px; 
      height: 60px;
      top: unset; 
      bottom: 10px; 
      left: 50vw;
      margin-left: -30px;
      background-color: #ccc;
      z-index: 3;
      overflow: hidden;
      line-height: 70px;
      text-align: center;
      transition: transform .15s $transition-ease;
      .icon {
        display: initial;
      }
      &.folded {
        transform: scale(0);
      }
    }
  }

  
}

.jm-container {
  width: 480px;
  height: 90%;
  margin-left: 40px;
  background: $menu-bg;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.05), 0 20px 25px rgba(0, 0, 0, 0.05), 0 3px 4px rgba(0, 0, 0, 0.05);
  z-index: 2;
  transform: translateX(calc(-100% - 40px));
  transform-origin: 0 0;
  transition: transform 0.5s $transition-ease;

  .menu-active & {
    transform: translateX(0);
  }

  @include breakpoint-max(sm) {
    width: 100vw; 
    height: 100%;
    margin-left: 0;
  }

  .main-nav {
    display: flex;
    width: 100%;
    height: 50px;
    // flex-direction: row;
    // justify-content: space-around;

    a {
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      cursor: pointer;
      color: #999;
      line-height: 60px;
      transform: scale(1);
      transition: transform .05s linear, color .15s linear;

      &:hover {
        color: $text-color;
      }

      &.active {
        color: $text-color;
        text-shadow: 0 0 5px rgba(252, 255, 75, 0.2);
        transform: scale(1.3);
      }
    }
  }

  @mixin scrollbars($size, $foreground-color, $background-color: mix($foreground-color, white, 50%)) {
    // For Google Chrome
    &::-webkit-scrollbar {
        width: $size;
        height: $size;
    }

    &::-webkit-scrollbar-thumb {
        background: $foreground-color;
    }

    &::-webkit-scrollbar-track {
        background: $background-color;
    }
    // For Internet Explorer
    scrollbar-face-color: $foreground-color;
    scrollbar-track-color: $background-color;
  }

  .menu-inner {
    //display: block;
    width: 100%;
    height: calc(100% - 50px);
    position: relative;
    overflow: hidden;

    > .panel {
      overflow-x: hidden;
      overflow-y: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transform: translateX(-30px); // is moved a bit to the left by default
      transition: transform 0.5s $transition-ease;

      @include breakpoint(md) {
        @include scrollbars(12px, darken($menu-bg, 30%), darken($menu-bg, 20%));
      }
      
      &.active {
        transform: translateX(0); // visible one is not moved to the side
        z-index: 3;
        opacity: 1;

        ~ .panel {
          transform: translateX(30px); // panels to the right of active, is moved to the right a bit
        }
      }
    }
  }
}


// inner content
.jump-menu {
  .panel {
    color: $text-color;

    .section-flex {
      display: flex;
      //flex-direction: row;
      flex-wrap: wrap;
      // align-content: flex-start;
      // align-items: flex-start;
      justify-content: space-between;
      // box-sizing: border-box;
      padding: 20px;

      .block {
        width: 100%;
        //flex-grow: 1;
        margin-bottom: 2px;

        &.full {
          width: 100%;
        }

        &.third {
          width: calc(33.33333% - 2px);
          max-width: calc(33.33333% - 2px);
        }
      }
    }

    hr {
      margin: 5px 20px;
      color: #888;
    }


    a, button {
      display: block;
      width: 100%;
      position: relative;
      box-sizing: border-box;
      border: none;
      text-decoration: none;
      color: $text-color;
      //height: 100%;
      font-size: 20px;
      line-height: 60px;
      transition: box-shadow .15s linear;
      padding: 0 20px;

      &:focus,
      &:active,
      &:hover {
        cursor: pointer;
        color: #fff;
        background-color: $primary-color;
        box-shadow: 0 0 3px 3px rgba(lighten($primary-color, 20%), .1);
      }

      &.hover-text {
        padding: 20px 0;
        
        > span {
          position: absolute;
          bottom: 15px; left: 15px;
          font-size: 14px;
          line-height: 14px;
          opacity: 0;
        }

        &:hover, &:focus {
          > span {
            opacity: 1;
          }
        } 
      }
    }

    a {
      position: relative;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 50px;
      //padding: 0 20px;

      &::after {
        content: "";
        position: absolute;
        right: 30px;
        top: 50%;
        opacity: 0;
        width: 10px;
        height: 10px;
        border-top: 2px solid;
        border-right: 2px solid;
        transform: translateY(-50%) rotate(45deg);
        //display: inline-block;
        transition: opacity .15s linear, transform .25s $transition-ease;
      }

      &:active,
      &:focus,
      &:hover {
        &::after {
          opacity: 1;
          transform: translateY(-50%) translateX(10px) rotate(45deg);
        }
      }
    }


    button {
      //padding-left: 20px; padding-right: 20px;
      background-color: $btn-bg-color;
      text-align: center;
    }
    h3 {
      position: relative;
      display: block;
      width: 100%;
      margin: 0 0 30px 0;
      button {
        //display: inline;
        width: auto; 
        height: auto;
        padding: 0;
        text-align: center;
        line-height: initial;
        position: absolute;
        right: 20px; top: 50%;
        transform: translateY(-50%);
        background-color: transparent;
      }
    }
  }
}




// second level styles
.jm-container {
  &--level-1 {
    position: relative;
  }

  &--level-2 {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #eaeaea;
    z-index: 5;
    transform-origin: 0 0;
    transition: opacity .3s, transform 0.5s $transition-ease;
    opacity: 0;

    &:not(.open) {
      pointer-events: none;
      user-select: none;
    }
    
    .menu-active & {
      transform: translateX(70px); // comes in from the right instead
      &.open {
        opacity: 1;
        transform: translateX(0);
      }
    }

  }
}

.level-2-go-back {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.15);
  cursor: pointer;
  z-index: 4;

  // center svg icon
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: $text-color;

  svg {
    transform: translateX(10px);
    opacity: 0;
    transition: opacity .3s, transform 0.5s $transition-ease;
  }

  &:hover,
  &:focus {
    svg {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

</style>