<template>
  <li class="filter-col">
    <b class="filter-label">{{filterGroup.label}}</b>
    <ul class="col-filters">
      <li v-for="filter in visibleFilters" :key="filter.value" class="filter-item">
        <label>
          <input type="checkbox" :value="filter.value" v-model="values" @change="updateFilters">
          {{filter.label}}
        </label>
      </li>
      <li v-if="filterGroup.values.length > maxFilters" class="filter-expand">
        <button @click="expandFilters = !expandFilters">{{expandFilters ? 'Fewer filters' : 'More filters'}}</button>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'FilterGroup',
  props: {
    filterGroup: {
      type: Object,
      required: true
    },
    activeFilters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      expandFilters: false,
      maxFilters: 6,
      values: this.activeFilters || []
    }
  },
  computed: {
    visibleFilters() {
      return this.expandFilters ? this.filterGroup.values : this.filterGroup.values.slice(0, this.maxFilters);
    }
  },
  methods: {
    updateFilters() {
      this.$emit('input', [...this.values, ...this.activeFilters].filter((x, i, arr) => arr.indexOf(x) === i))
    }
  },
  watch: {
    activeFilters(newVal, oldVal) {
      if (newVal.length === 0) {
        // clear filters
        this.values = [];
      }
    }
  }
}
</script>
