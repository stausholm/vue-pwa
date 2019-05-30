<template>
  <div class="list-item">
    <p>{{item.id}}</p>
    <button @click="selectMe">select</button>
    <input v-if="isSelecting" type="checkbox" :checked="itemIsSelected" @change="$emit('selected')">
    
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
      <!-- 
        <button v-for="action in actions" :key="action"  @click="$parent.$emit(action, [item])">{{action}}</button> 
        could also just emit the item as an array, and skip the Array.isArray() check for emitting bulk actions / emitting single item actions
      -->
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
      //selected: false
    }
  },
  methods: {
    selectMe() {
      this.$emit('selected')
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  background-color: lightgrey;
  padding: 10px;
  margin-bottom: 10px;

  &--selected {
    background-color: gray;
  }

  &__actions {
    button {

    }
  }
}
</style>
