<template>
  <div class="list-item" tabindex="0" @click="handleClick" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove" @touchcancel="handleTouchCancel">
    <div class="list-item__content">
      <div class="list-item__content-inner">
        <div>
          <p class="title">{{item.title}}</p>
          <p class="id">item id: {{item.id}}</p>
        </div>
        <!-- <button @click="selectMe">select</button> -->
        <input v-if="isSelecting" type="checkbox" :checked="itemIsSelected" @change="$emit('selected')">
      </div>
    </div>

    <div class="list-item__actions">
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
    // id: {
    //   type: Number,
    //   required: true
    // },
    // completed: {
    //   type: Boolean,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // userId: {
    //   type: Number,
    //   required: true
    // },
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
      longTouchfunc: null
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
    handleTouchStart() {
      console.log('start');
      if (!this.isSelecting) {
        this.longTouchfunc = setTimeout(this.selectMe, 500)
      }
    },
    handleTouchEnd() {
      console.log('end');
      if (!this.isSelecting && this.longTouchfunc !== null) {
        clearTimeout(this.longTouchfunc)
        this.longTouchfunc = null;
      }
    },
    handleTouchMove() {
      console.log('move');
      if (!this.isSelecting && this.longTouchfunc !== null) {
        clearTimeout(this.longTouchfunc)
        this.longTouchfunc = null;
      }
    },
    handleTouchCancel() {
      console.log('cancel');
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  width: 100%;
  margin-bottom: 10px;
  position: relative;

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
