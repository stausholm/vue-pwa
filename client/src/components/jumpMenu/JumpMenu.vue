<template>
  <div class="jump-menu" :class="{'menu-active': active}">
    <div class="jm-overlay" ref="overlay" @click="active = false">
      <i class="icon">Close</i>
    </div>
    <div class="jm-container">
      <nav class="main-nav">
        <a href="#" @click.prevent="setActive(1)" :class="{'active': isActive(1)}">
          <icon-base class="icon">
            <icon-casino />
          </icon-base>
        </a>
        <a href="#" @click.prevent="setActive(2)" :class="{'active': isActive(2)}">
          <icon-base class="icon">
            <icon-casino />
          </icon-base>
        </a>
        <a href="#" @click.prevent="setActive(3)" :class="{'active': isActive(3)}">
          <icon-base class="icon">
            <icon-casino />
          </icon-base>
        </a>
      </nav>
      <div class="menu-inner">
        <article class="panel" :class="{'active': isActive(1)}">
          <section class="section-flex">
            <div class="block full">
              <button>
                <icon-base class="icon">
                  <icon-casino />
                </icon-base>
                Home
              </button>
            </div>
            <div class="block third">
              <button class="hover-text">
                <icon-base class="icon">
                  <icon-casino />
                </icon-base>
                <span>dashboard</span>
              </button>
            </div>
            <div class="block third">
              <button class="hover-text">
                <icon-base class="icon">
                  <icon-casino />
                </icon-base>
                <span>dashboard</span>
              </button>
            </div>
            <div class="block third">
              <button class="hover-text">
                <icon-base class="icon">
                  <icon-casino />
                </icon-base>
                <span>dashboard</span>
              </button>
            </div>
          </section>
          <hr>
          <section class="section-flex">
            <div class="block full">
              <h3>
                My pinned stuff
                <button>
                  <icon-base class="icon">
                    <icon-casino />
                  </icon-base>
                </button>
              </h3>
            </div>
            <div class="block full">
              <rich-link text="yoyo"/>
            </div>
            <div class="block full">
              <rich-link text="yoyo" :icon="icon"/>
            </div>
            <div class="block full">
              <rich-link text="yoyo"/>
            </div>
          </section>
          <hr>
          <section class="section-flex">
            <div class="block full">
              <h3>about me</h3>
            </div>
            <div class="block full">
              <rich-link text="yoyo" smallText="small yoyo" iconText="32+"/>
            </div>
            <div class="block full">
              <rich-link text="yoyo"/>
            </div>
          </section>
        </article>

        <article class="panel" :class="{'active': isActive(2)}">
          <section class="section-flex">
            <h2 class="panel-title">some people</h2>
          </section>
          <section class="section-flex">
            <div class="block full">
              <h3>people</h3>
            </div>
            <div class="block full">
              <avatar-list />
            </div>
            <div class="block full">
              <a href="#">et link</a>
            </div>
          </section>
          <hr>
          <section class="section-flex">
            <div class="block full">
              <h3>more people</h3>
            </div>
            <div class="block full">
              <avatar-list />
            </div>
            <div class="block full">
              <a href="#">endnu et link</a>
            </div>
          </section>
          <hr>
          <section class="section-flex">
            <div class="block full">
              <h3>about me</h3>
            </div>
            <div class="block full">
              <rich-link text="yoyo" smallText="small yoyo" iconText="32+"/>
            </div>
            <div class="block full">
              <rich-link text="yoyo"/>
            </div>
          </section>
        </article>

        <article class="panel" :class="{'active': isActive(3)}">
          <section class="section-flex">
            <h2 class="panel-title">oh wow</h2>
          </section>
          <section class="section-flex"></section>
          <section class="section-flex"></section>
        </article>
      </div>
    </div>
  </div>  
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconCasino from '@/components/icons/IconCasino';
import AvatarList from './AvatarList'
import RichLink from './RichLink'

export default {
  name: 'JumpMenu',
  components: {
    IconBase,
    IconCasino,
    AvatarList,
    RichLink
  },
  props: {

  },
  data() {
    return {
      icon: IconCasino,
      touchY: null,
      touchX: null,
      active: false,
      activeTab: 2,
      tabLegend: {
        1: 'search',
        2: 'home',
        3: 'stuff'
      }
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
      const previousTab = this.activeTab === 1 ? 3 : this.activeTab - 1;
      this.setActive(previousTab)
    },
    switchRight() {
      const nextTab = this.activeTab === 3 ? 1 : this.activeTab + 1;
      this.setActive(nextTab)
    },
    closeMenu() {
      this.active = false;
    },
    handleFocusIn(e) { // TODO: this is not looping through correctly
      console.log(e.target)
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
    }
  },
  mounted() {
    this.$el.addEventListener('touchstart', this.handleTouchStart, false)
    this.$el.addEventListener('touchmove', this.handleTouchMove, false)
  },
  created() {
    document.addEventListener('focusin', this.handleFocusIn) // prevent tab focus from escaping menu
    window.addEventListener('popstate', this.closeMenu) // close menu when navigating. TODO: also add same check as modalAdvanced in router.

    document.addEventListener('keydown', e => {
      const switchFocus = direction => {
        const buttons = Array.from(this.$el.querySelectorAll('.panel.active a, .panel.active button'))
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

      switch(e.key.toLowerCase()) {
        case "j":
          if (e.ctrlKey) {
            this.active = !this.active;
            this.setActive(2) // always start on this tab
            e.preventDefault();
          }
          break;

        case "escape":
          this.closeMenu()
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
          e.stopPropagation()
          e.preventDefault()
          this.switchLeft()
          break;

        case "arrowright":
          e.stopPropagation()
          e.preventDefault()
          this.switchRight()
          break;

        case "arrowup":
          e.stopPropagation()
          e.preventDefault()
          switchFocus('up')
          break;

        case "arrowdown":
          e.stopPropagation()
          e.preventDefault()
          switchFocus('down')
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

  .menu-inner {
    //display: block;
    width: 100%;
    height: calc(100% - 50px);
    position: relative;
    overflow: hidden;

    > .panel {
      overflow-x: hidden;
      overflow-y: auto; 
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transform: translateX(-30px); // is moved a bit to the left by default
      transition: transform 0.5s $transition-ease;

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
        content: ">";
        position: absolute; 
        right: 30px; 
        top: 50%;
        opacity: 0;
        transform: translateY(-50%);
        //text-rendering: optimizeLegibility;
        //font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        //-webkit-font-feature-settings: 'liga';
        //-webkit-font-smoothing: antialiased;
        transition: opacity .15s linear, right .25s $transition-ease;
      }

      &:active,
      &:focus,
      &:hover {
        &::after {
          opacity: 1;
          right: 20px;
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
</style>