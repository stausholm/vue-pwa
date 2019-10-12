<template>
  <div class="jump-menu" :class="{'menu-active': active, 'level-2-active': level2Open, 'level-3-active': level3Open}" :aria-hidden="!active">
    <div class="jm-overlay" ref="overlay" @click="active = false">
      <icon-base class="icon" iconName="close">
        <icon-close />
      </icon-base>
    </div>
    <div class="jm-container jm-container--level-1">
      <transition name="fade">
        <a v-if="level2Open && active" href="#" @click.prevent="goBackToLevel1" title="Go back" class="level-2-go-back" role="button">
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
        <a href="#" @click.prevent.stop="goBackToLevel1" class="mobile-back-button" title="Go back" role="button">
          <icon-base class="icon" iconName="Go back">
            <icon-arrow-left />
          </icon-base>
        </a>
        <transition name="fade">
          <div class="menu-inner" v-if="level2Open && active">
            <article class="panel active"> <!-- TODO: how to make this content dynamic -->
              <section class="section-flex">
                <h2 class="panel-title">navigation 2nd level!</h2>
              </section>
              <section class="section-flex">
                <div class="block full">
                  <p>clicking on the part of level-1 visible should go back. ✔</p>
                  <p>leftkey and esc should go back ✔</p>
                  <p>rightkey should stopPropagation ✔</p>
                  <p>focused el from before should be refocused when closing 2nd level ✔</p>
                  <p>on mobile there should be a backbutton in upper corner ✔</p>
                  <p>touchevents for left and right should stopPropagation ✔</p>
                  <p>focus should be moved into 2nd level menu ✔(but buggy)</p>

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
// https://www.windowscentral.com/xbox-fall-creators-update
// https://youtu.be/VeA2FmPT7xk?t=204

import IconBase from '@/components/icons/IconBase';
import IconClose from '@/components/icons/IconClose';
import IconArrowLeft from '@/components/icons/IconArrowLeft';
import Panel1 from './panels/Panel1'
import Panel2 from './panels/Panel2'
import Panel3 from './panels/Panel3'

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
    startingTab: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      touchY: null,
      touchX: null,
      active: false,
      activeTab: 2,
      tabs: tabs,
      level2Open: false,
      level3Open: false, // TODO: add support for level 3
      storedHighlightedEl: null
    }
  },
  methods: {
    isActive(tab) {
      return this.activeTab === tab;
    },
    setActive(tab) {
      //console.log(tab)
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
      // cleanup if level2 menu was open
      if (this.level2Open) {
        this.goBackToLevel1()
      }
    },
    handleFocusIn(e) { // TODO: this is not looping through correctly.
      //console.log(e.target)
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

      if (Math.abs(xDiff) > Math.abs(yDiff) && !this.level2Open) {
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
    storeCurrentEl() { // keep reference of el that opened a level2 menu. // TODO: How will we also store a level2 el that opened a level3 menu? this.storedHighlightedEl2 ?
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
      if (this.storedHighlightedEl && this.active) {
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
    switchFocus(cssSelector, direction) { // handle Arrowdown + up inside active tab, to focus next a/button tag. both arguments = strings
      const buttons = Array.from(this.$el.querySelectorAll(cssSelector))
      const currentButton = document.activeElement
      const index = buttons.indexOf(currentButton)
      //console.log(buttons, currentButton, index)

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
      if (key === "j" && e.ctrlKey && !e.repeat) { // don't do anything if the user is holding down the key (e.repeat === true)
        this.active = !this.active;
        this.setActive(this.startingTab) // always start on this tab
        e.preventDefault();
        // cleanup if level2 menu was open (we want to close it)
        if (this.level2Open) {
          this.goBackToLevel1()
        }
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