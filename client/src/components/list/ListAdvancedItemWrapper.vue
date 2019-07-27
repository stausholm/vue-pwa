<template>
  <div class="list-item" 
    tabindex="0" 
    @click="handleClick" 
    @touchstart="handleTouchStart" 
    @touchend="handleTouchEnd" 
    @touchmove="handleTouchMove" 
    @touchcancel="handleTouchCancel"
    :class="{'list-item--no-touch': !isTouchDevice}"
  >
    <div class="list-item__content" :style="stylesObj">
      <component 
      :item="item" 
      :is="itemTemplate"
      :itemIsSelected="itemIsSelected"
      :isSelecting="isSelecting"
      :actions="actions"
      v-on="$listeners"
      @selected="updateSelected(item)"/>
    </div>

    <div class="list-item__actions" v-if="showActions || !isTouchDevice"> 
      <button v-for="action in itemActions" :key="action.emit"  @click.stop="$emit(action.emit, item)" class="btn-icon btn-icon--large btn-icon--animate" :class="action.class">
        <icon-base v-if="action.states" :iconName="action.label" width="24" height="24">
          <transition name="icon-scale">
            <component :is="action.states.values.find(val => item[action.states.key] === val.value).icon || action.icon"/>
          </transition>
        </icon-base>
        <icon-base v-else :iconName="action.label" width="24" height="24">
          <component :is="action.icon"/>
        </icon-base>
      </button>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';

export default {
  name: 'ListAdvancedItemWrapper',
  components: {
    IconBase
  },
  props: {
    itemTemplate: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    isSelecting: {
      type: Boolean,
      required: true
    },
    itemIsSelected: {
      type: Boolean,
      required: true
    },
    actions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isTouchDevice: 'ontouchstart' in window,
      longTouchfunc: null,
      animationFrame: false,
      cardPositionX: 0,
      cardStartPositionX: 0,
      enableTransition: false,
      isScroll: null,
      showActions: false,
      touchEndX: false,
      touchEndY: false,
      touchEndTime: false,
      touchStartX: false,
      touchStartY: false,
      touchStartTime: false,
      shouldCancel: false,
      maxMobileButtons: this.actions.length
    }
  },
  computed: {
    stylesObj() {
      return {
        'transform': `translateX(${this.cardPositionX}px)`, 
        'transition': this.enableTransition ? 'transform 200ms ease' : '', 
        'will-change': this.cardPositionX > 0 ? 'transform': ''
      }
    },
    itemActions() {
      return this.actions.filter(action => {
        return !action.type || action.type === 'single'
      }).slice(0, this.maxMobileButtons)
    },
    primaryAction() {
      const primaryAction = this.actions.filter(action => action.isPrimary);
      if (primaryAction.length > 1) {
        console.error('Multiple actions set to primary. Only one action should be primary.')
      }
      if (primaryAction[0] && primaryAction[0].type === 'bulk') {
        console.error('primary action defined on an action of type "bulk". primary actions should only be used with single or both')
      }
      return primaryAction[0]
    },
    bulkActions() {
      return this.actions.filter(action => {
        return !action.type || action.type === 'bulk'
      })
    }
  },
  methods: {
    selectMe() {
      if(this.bulkActions.length > 0) {
        this.$emit('selected_internal_use_only')
      }
    },
    handleClick() {
      if(this.isSelecting) {
        this.selectMe()
        return
      }

      this.$emit('itemClicked', this.item)
    },
    handleTouchStart(e) {
      //console.log('start');
      if (!this.isSelecting) {
        this.longTouchfunc = setTimeout(() => {
          this.selectMe();
          this.enableTransition = true;
          this.resetSwipe();
        }, 500)
      } else {
        return // don't do the swipes if selecting
      }

      //console.log(e.currentTarget)
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
      this.touchStartTime = Date.now();
      this.cardStartPositionX = this.cardPositionX;
      if (this.enableTransition) this.enableTransition = false;
      
      //e.currentTarget.focus();
      this.shouldCancel = false;
    },
    handleTouchEnd(e) {
      //console.log('end');
      if (this.isSelecting) {
        return
      }
      if (!this.isSelecting && this.longTouchfunc !== null) {
        clearTimeout(this.longTouchfunc)
        this.longTouchfunc = null;
      }

      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.touchEndTime = Date.now();
      const time = this.touchEndTime - this.touchStartTime;

      // https://stackoverflow.com/a/16101634
      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;
      const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      const velocity = distance / time; // higher = faster
      const angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
      const direction = this.getDirection(angleInDegrees)
      const isQuickSwipe = !this.isScroll && velocity > 1.1 && direction === 'left';
      console.table({time, distance, velocity, horizontalSwipe: !this.isScroll, angleInDegrees, isQuickSwipe, direction})

      if (angleInDegrees < 50 && angleInDegrees > 40) {
        console.log('swiping ~45 degrees angle towards bottom-right corner of screen')
      }
      this.handleSwipeEnd(isQuickSwipe);
    },
    getDirection(angleInDegrees) {
      if (angleInDegrees >= -135 && angleInDegrees < -45) {
        return 'down'
      }
      if (angleInDegrees <= 45 && angleInDegrees >= -45) {
        return 'left'
      }
      if (angleInDegrees > 45 && angleInDegrees < 135) {
        return 'up'
      }
      return 'right'
    },
    handleTouchMove(e) {
      //console.log('move');
      if (this.isSelecting) {
        return
      }
      if (!this.isSelecting && this.longTouchfunc !== null) {
        clearTimeout(this.longTouchfunc)
        this.longTouchfunc = null;
      }

      this.animationFrame = window.requestAnimationFrame(() => this.swiping(e));
    },
    handleTouchCancel(e) {
      console.log('cancel');
    },

    
    handleSwipeEnd(isQuickSwipe) {
      const threshold = Math.min(window.innerWidth, 1200) / 2;
      const thresholdButton = 26;
      window.cancelAnimationFrame(this.animationFrame);
      this.enableTransition = true;
      this.isScroll = null;
      document.body.style.overflowY = '';
      this.shouldCancel = true;
      const iconButtonWidth = 48;

      if (this.cardPositionX >= threshold && this.primaryAction || isQuickSwipe && this.primaryAction) { // swiped very far or very fast
        this.$emit(this.primaryAction.emit, this.item);
        this.cardPositionX = window.innerWidth;
        this.showActions = false;
        console.log('end far', this.cardPositionX)
      } else if (this.cardPositionX >= thresholdButton && this.cardPositionX < threshold) { // swiped far enough to show action buttons
        const actionsWidth = this.itemActions.length * iconButtonWidth;
        const maxButtons = Math.floor(threshold / iconButtonWidth);
        this.maxMobileButtons = maxButtons;
        this.cardPositionX = actionsWidth >= threshold ? maxButtons * iconButtonWidth : actionsWidth; // if actionsbuttons take up more space than the max threshold, just show the maximum amount of actions before hitting the threshold
        if (actionsWidth >= threshold) {
          console.warn(`Screen too small to display all supplied actions. Showing the first ${maxButtons} actions only`)
        }
        this.showActions = true;
        console.log('end short', this.cardPositionX)
      } else { // didn't swipe very far at all
        this.cardPositionX = 0;
        this.showActions = false;
        console.log('end very short', this.cardPositionX)
      }
    },
    swiping(e) {
      if (this.shouldCancel) { // calling requestAnimationFrame in touchmove means that sometimes this.swiping can get called after a touchend event
        return
      }

      const currentX = e.changedTouches[0].screenX;
      const currentY = e.changedTouches[0].screenY;
      const distanceX = currentX - this.touchStartX;
      const distanceY = currentY - this.touchStartY;
      const limitLeft = 0;
      const limitRight = window.innerWidth;

      const scrollingVertically = Math.abs(distanceY) >= Math.abs(distanceX);
      if ( scrollingVertically && this.isScroll === null) {
        this.isScroll = true;
      } else if (this.isScroll === null) {
        document.body.style.overflowY = 'hidden'; // prevent vertical scrolling while swiping card
        this.isScroll = false;
      }

      if (this.isScroll) return;

      //console.count('swiping')
      if (this.cardPositionX >= limitLeft && this.cardPositionX <= limitRight) {
        if (distanceX >= 0) { // pulling left or right
          this.cardPositionX = Math.min(this.cardStartPositionX + distanceX, limitRight);
        } else {
          this.cardPositionX = Math.max(this.cardStartPositionX + distanceX, limitLeft)
        };
      }
    },
    handleBlur(e) {
      if (!this.$el.contains(e.target)) this.resetSwipe();
    },
    resetSwipe() {
      if (this.showActions || this.cardPositionX !== 0) {
        this.cardPositionX = 0;
        this.showActions = false;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleBlur);
    window.removeEventListener('touchstart', this.handleBlur);
  },
  mounted() {
    // this.primaryAction; // validate primary action on mount
    window.addEventListener('click', this.handleBlur);
    window.addEventListener('touchstart', this.handleBlur);
  },
}
</script>


<style lang="scss">
.list-item {
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  user-select: none;

  .list-item__content {
    background-color: lightgrey;
    box-shadow: 0 2px 4px rgba(0,0,0,.12);
    border-radius: 3px;
    height: 100%;
    position: relative;
    z-index: 2;
    padding: 4px;
    min-height: 100px;

    &-inner {
      display: flex;
      align-items: top;
      justify-content: space-between;
    }
  }

  &--selected {
    .list-item__content {
      background-color: gray;
    }
  }

  &__actions {
    position: absolute;
    top: 0;
    left: 0;
    button {
      box-shadow: 0 2px 4px rgba(0,0,0,.12);
    }
  }
}

.list-advanced--alternative {
  .list-item {
    .list-item__content {
      padding: 0;

      &-inner {
        height: 100%;
        background: skyblue;
        padding: 4px;
        border-radius: 3px;
        transition: transform 300ms cubic-bezier(0.4,0.0,0.2,1);
      }
    }

    &.list-item--selected {
      .list-item__content {
        background-color: lightgrey;
        &-inner {
          transform: scale(0.901961, 0.907407);
        }
      }
    }
  }
}

.list-item--no-touch {
  cursor: pointer;

  .list-item__actions {
    z-index: 2;
    left: auto;
    right: 0;
    visibility: hidden;
    opacity: 0;
    padding: 4px;

    left: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%,rgba(0,0,0,0) 100%);
    display: flex;
    justify-content: flex-end;
    border-radius: 4px;
    transition: opacity .2s, visibility .2s;


    &:focus {
      opacity: 1;
      visibility: visible;
    }

    .btn-icon {
      box-shadow: none;
    }
  }

  &:hover, &:focus {
    .list-item__actions {
      opacity: 1;
      visibility: visible;
    }
  }

  .list--is-selecting & {
    .list-item__actions {
      // right: 30px;
      display: none;
    }
  }
}

</style>
