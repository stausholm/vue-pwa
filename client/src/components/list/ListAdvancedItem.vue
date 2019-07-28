<template>
  <div class="list-item__content-inner">
    <div>
      <p class="title">{{item.title}}</p>
      <p class="id">item id: {{item.id}}</p>
    </div>
    <input v-if="isSelecting" type="checkbox" :checked="itemIsSelected" >
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    isSelecting: {
      type: Boolean
    },
    itemIsSelected: {
      type: Boolean
    }
  }
}
</script>

<style>

</style>
