<template>
  <div class="list-item" 
    tabindex="0" 
    @click="handleClick" 
    @touchstart="handleTouchStart" 
    @touchend="handleTouchEnd" 
    @touchmove="handleTouchMove" 
    @touchcancel="handleTouchCancel"
  >
    <div class="list-item__content" :style="stylesObj">
      <div class="list-item__content-inner">
        <div>
          <p class="title">{{item.title}}</p>
          <p class="id">item id: {{item.id}}</p>
        </div>
        <!-- <button @click="selectMe">select</button> -->
        <input v-if="isSelecting" type="checkbox" :checked="itemIsSelected" @change="$emit('selected')">
      </div>
    </div>

    <div class="list-item__actions" v-if="showDelete">
      <button v-for="action in actions" :key="action"  @click="$parent.$emit(action, item)" class="btn-icon btn-icon--large btn-icon--animate">
        <icon-base :iconName="action" width="24" height="24">
          <!-- <component :is="action"/> -->
          <transition v-if="action === 'star'" name="icon-scale">
            <star v-if="item.completed"/>
            <star-border v-else/>
          </transition>
          <delete v-else/>
        </icon-base>
      </button>

    </div>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconDelete from '@/components/icons/IconDelete';
import IconStar from '@/components/icons/IconStar';
import IconStarBorder from '@/components/icons/IconStarBorder';

export default {
  name: 'ListAdvancedItemTodo',
  components: {
    IconBase,
    'delete': IconDelete,
    'star': IconStar,
    'star-border': IconStarBorder
  },
  props: {
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
      type: Array
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
      showDelete: false,
      touchEndX: false,
      touchEndY: false,
      touchEndTime: false,
      touchStartX: false,
      touchStartY: false,
      touchStartTime: false,
      shouldCancel: false
    }
  },
  computed: {
    stylesObj() {
      return {
        'transform': `translateX(${this.cardPositionX}px)`, 
        'transition': this.enableTransition ? 'transform 200ms ease' : '', 
        'will-change': this.cardPositionX > 0 ? 'transform': ''
      }
    }
  },
  methods: {
    selectMe() {
      this.$emit('selected')
    },
    handleClick() {
      if(this.isSelecting) {
        this.selectMe()
        return
      }
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

      console.log(e.currentTarget)
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
      this.touchStartTime = Date.now();
      this.cardStartPositionX = this.cardPositionX;
      if (this.enableTransition) this.enableTransition = false;
      
      //e.currentTarget.focus();
      this.shouldCancel = false;
    },
    handleTouchEnd(e) {
      console.log('####################end');
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

      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;
      const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      const velocity = distance / time; // higher = faster
      const angleInDegrees = Math.atan2(deltaY, deltaX);
      console.log({time, distance, velocity, horizontalSwipe: !this.isScroll, angleInDegrees})
      this.handleSwipeEnd();
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

    
    handleSwipeEnd() {
      const threshold = Math.min(window.innerWidth, 1200) / 2;
      const thresholdButton = 26;
      window.cancelAnimationFrame(this.animationFrame);
      this.enableTransition = true;
      this.isScroll = null;
      document.body.style.overflowY = '';
      this.shouldCancel = true;

      if (this.cardPositionX >= thresholdButton && this.cardPositionX < threshold) { // swiped far enough to show action buttons
        this.cardPositionX = this.actions.length * 48;
        this.showDelete = true;
        console.log('end short', this.cardPositionX)
      } else if (this.cardPositionX >= threshold) { // swiped very far
        this.$parent.$emit('delete', this.item);
        this.cardPositionX = window.innerWidth;
        this.showDelete = false;
        console.log('end far', this.cardPositionX)
      } else { // didn't swipe very far at all
        this.cardPositionX = 0;
        this.showDelete = false;
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
      if (this.showDelete || this.cardPositionX !== 0) {
        this.cardPositionX = 0;
        this.showDelete = false;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleBlur);
    window.removeEventListener('touchstart', this.handleBlur);
  },
  mounted() {
    window.addEventListener('click', this.handleBlur);
    window.addEventListener('touchstart', this.handleBlur);
  },
}
</script>

<style lang="scss" scoped>
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

    &-inner {
      display: flex;
      align-items: center;
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

.list-item--alternative {
  .list-item__content {
    padding: 0;

    &-inner {
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
</style>
