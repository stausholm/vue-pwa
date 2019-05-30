<template>
  <div class="list-item">
    <p>{{item.id}}</p>
    <button @click="selectMe">select</button>
    <input v-if="isSelecting" type="checkbox" :checked="itemIsSelected" @change="$emit('selected')">
    
    <div class="list-item__actions">
      <button v-for="action in actions" :key="action"  @click="$parent.$emit(action, item)">{{action}}</button>
      <!-- 
        <button v-for="action in actions" :key="action"  @click="$parent.$emit(action, [item])">{{action}}</button> 
        could also just emit the item as an array, and skip the Array.isArray() check for emitting bulk actions / emitting single item actions
      -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListAdvancedItemTodo',
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
