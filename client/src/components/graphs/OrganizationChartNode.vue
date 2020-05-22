<template>
  <li class="o-chart__node o-chart-li">
    <div :class="nodeDataClasses" v-if="node.data" @click="onNodeClick">
      <organizationChartNodeTemplate v-if="hasCustomTemplate" :node="node" :template="__templates[node.type] || __templates['default']"/>
      <template v-else>
        <strong v-if="node.data.label">{{node.data.label}}</strong>
        <img v-if="node.data.imgSrc" :src="node.data.imgSrc" alt="">
        <p v-if="node.data.text">{{node.data.text}}</p>
      </template>
      <button v-if="isCollapsible" @click.stop="toggleNode">toggle collapsible {{isCollapsed}}</button>
    </div>

    <ul class="o-chart-ul" v-if="!isLeaf && !isCollapsed">
      <organization-chart-node 
        v-for="(child, i) in node.children" 
        :key="i" 
        :node="child" 
        :__layer="__layer + 1" 
        :__index="i" 
        :__position="position" 
        :__templates="__templates"
        @node-click="onChildNodeClick"
        @node-toggle="onChildNodeToggle"/>
    </ul>
  </li>
</template>

<script>
// TODO: add keyboard navigation to selectable chart node data, and to collapsible toggle button

// Render the custom template defined in a scoped slot
const OrganizationChartNodeTemplate = {
  functional: true,
  props: {
    node: {
      type: null,
      default: null
    },
    template: {
      type: null,
      default: null
    }
  },
  render(createElement, context) {
    const content = context.props.template({
      'node': context.props.node
    })
    return [content]
  }
}

export default {
  name: 'organizationChartNode',
  components: {
    OrganizationChartNodeTemplate
  },
  props: {
    node: {
      required: true,
      type: Object
    },
    __layer: {
      type: Number,
      default: 0
    },
    __index: {
      type: Number,
      default: 0
    },
    __position: {
      type: Array,
      default: () => []
    },
    __templates: {
      type: null,
      default: null
    }
  },
  computed: {
    position() { 
      return [...this.__position, this.__index]
    },
    nodeDataClasses() {
      return [
        'o-chart__node-data', 
        this.node.styleClass, 
        {
          'o-chart__node-data--disabled': this.isDisabled, 
          'o-chart__node-data--default': !this.hasCustomTemplate,
          'o-chart__node-data--selected': this.isSelected,
          'o-chart__node-data--collapsed': this.isCollapsed
        }
      ]
    },
    isDisabled() {
      return this.node.disabled || false
    },
    isSelected() {
      return this.node.selected === true
    },
    isCollapsed() {
      return this.node.collapsed === true
    },
    isCollapsible() {
      return (this.node.collapsible && !this.isLeaf) || false
    },
    isLeaf() { // does not have any children
      return !(this.node.children && Array.isArray(this.node.children) && this.node.children.length > 0)
    },
    childrenCount() {
      return this.isLeaf ? 0 : this.node.children.length
    },
    hasCustomTemplate() {
      return (this.__templates[this.node.type] || this.__templates['default'])
    }
  },
  methods: {
    onNodeClick(event) {
      if (!this.isDisabled) {
        this.$emit('node-click', this.node, this.position)
      }
    },
    onChildNodeClick(node, position) {
      this.$emit('node-click', node, position)
    },
    toggleNode() {
      this.$emit('node-toggle', this.node, this.position)
    },
    onChildNodeToggle(node, position) {
      this.$emit('node-toggle', node, position)
    }
  }
}
</script>