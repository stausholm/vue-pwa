<template>
  <figure class="o-chart" :class="{'o-chart--horizontal': horizontal, 'o-chart--single-column': enableMobileColumn}">
    <ul class="o-chart-ul" ref="list">
      <organization-chart-node 
        v-for="(node, i) in data" 
        :key="i" 
        :node="node" 
        :__layer="layer" 
        :__index="i" 
        :__position="[]" 
        :__templates="$scopedSlots"
        @node-toggle="onNodeToggle"
        @node-click="onNodeClick"/>
    </ul>
    <figcaption v-if="figCaption">{{figCaption}}</figcaption>
  </figure>
</template>

<script>
/**
 * Sources:
 * https://primefaces.org/primevue/showcase/#/organizationchart
 * https://github.com/primefaces/primevue/blob/master/src/components/organizationchart/OrganizationChart.vue
 * https://codepen.io/allejo/pen/WbKzmK
 */
import OrganizationChartNode from './OrganizationChartNode'

// by default center horizontally or vertically depending on prop, and have scroll overflow on the container
export default {
  name: 'OrganizationChart',
  components: {
    OrganizationChartNode
  },
  data() {
    return {
      layer: 0
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    figCaption: { // helper text
      type: String
    },
    horizontal: { // make it expand to the left instead of downwards
      type: Boolean,
      default: false
    },
    enableMobileColumn: { // if enabled, change the layout to be singlecolumn on mobile. as a treeview.
      type: Boolean,
      default: false
    }
  },
  methods: {
    onNodeClick(node, position) {
      // if () {
      //   this.$emit('node-select', node, position)
      // } else {
      //   this.$emit('node-unselect', node, position)
      // }
      this.$emit('node-select', node, position)
    },
    onNodeToggle(node, position) {
      // if () {
      //   this.$emit('node-expand', node, position)
      // } else {
      //   this.$emit('node-collapse', node, position)
      // }
      this.$emit('node-toggle', node, position)
    }
  },
  mounted() {
    if (!this.horizontal) {
      const list = this.$refs.list
      list.scrollLeft = (list.scrollWidth - list.offsetWidth) / 2 // center list horizontally, if the tree expands downwards, but overflows to the left
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/base/variables.scss';
@import '@/styles/base/_breakpoints.scss';

.o-chart {
  > .o-chart-ul {
    overflow: auto;
  }

  $chart-node-border: 1px solid black;
  $chart-node-padding: 10px 20px;

  $chart-line-border-radius: 10px;
  $chart-line-border: 5px solid green;
  $chart-line-height: 20px;

  .o-chart-ul {
    display: flex;
    list-style: none;
    padding-left: 0;
    text-align: center;

    > .o-chart-li {
      box-sizing: border-box;
      flex: 1;
      padding: 0 5px;

      > *:not(.o-chart-ul):not(.o-chart-li) { // node items
        border: $chart-node-border;
        display: inline-block;
        margin: 0 auto;
        padding: $chart-node-padding;
        position: relative;

        // We want to add a connector on the bottom of the element unless we've reached the bottom of the tree
        // which is signified by :last-child
        &:not(:last-child) {
          &:after {
            content: '';
            border-left: $chart-line-border;
            bottom: -1 * $chart-line-height;
            height: $chart-line-height;
            left: 50%;
            position: absolute;
          }
        }
      }

      // We've reached the children elements
      .o-chart-ul {
        margin-top: ($chart-line-height * 2) - 1; // Fix 1px spacing between borders, no big deal
        position: relative;

        .o-chart-li {
          position: relative;

          // The :before will be the horizontal line on the right side of a child connector and the :after
          // will be the left side of the child connector. The child connector is the vertical line going
          // down to its children.
          &:after,
          &:before {
            content: '';
            border-top: $chart-line-border;
            position: absolute;
            top: -1 * $chart-line-height;
            width: 50%;
          }

          &:before {
            border-left: $chart-line-border;
            height: $chart-line-height;
            left: 50%;
          }

          &:after {
            right: 50%;
          }

          // The first and last children won't have to connect to its siblings to the left and right of it,
          // so handle that appropriately by hiding 
          &:first-child,
          &:last-child {
            &:before {
              border-top: $chart-line-border;
              border-top-left-radius: $chart-line-border-radius;
              top: -1 * $chart-line-height;
            }

            &:after {
              border: none;
            }
          }

          &:last-child {
            &:before {
              border-left: 0;
              border-right: $chart-line-border;
              border-top-left-radius: 0;
              border-top-right-radius: $chart-line-border-radius;
              left: 0;
              right: 50%;
            }
          }

          // When it's an only child, there won't be a need to connect to its siblings so just remove the
          // top border which serves as the horizontal connector
          &:only-child {
            &:before {
              border-top: none;
              border-top-right-radius: 0;
            }
          }
        }
      }



      // We will apply the hover effect to the lineage of the element also
      .o-chart-li {
        &:before,
        &:after {
          transition: border-color .2s ease-out;
        }
      }
      .o-chart__node-data {
        transition: background-color .2s ease-out;
        &:after {
          transition: border-color .2s ease-out;
        }

        &:hover {
          background-color: red;

          &:after {
            border-color: blue !important;
          }

          + .o-chart-ul {
            .o-chart__node-data {
              background-color: green;

              &:after {
                border-color: yellow;
              }
            }

            .o-chart-li {
              &:before,
              &:after {
                border-color: salmon;
              }
            }
          }
        }
      }
    }
  }



  // Default template if no slot template is provided
  .o-chart__node-data--default {
    padding: 0 !important;
    min-width: 100px;
    background-color: white;

    strong {
      background-color: black;
      color: white;
      display: block;
      padding: 5px 10px;
    }
    img {
      width: 50px;
      max-width: 100%;
      margin: 5px;
    }
    p {
      margin: 5px 10px;
    }

    &.o-chart__node-data--disabled {
      pointer-events: none;
      opacity: 0.1;
      user-select: none;

      + .o-chart-ul {
        opacity: 0.1;
        user-select: none;
        pointer-events: none;
        
        .o-chart-ul .o-chart__node-data--disabled {
          opacity: 1;
          + .o-chart-ul {
            opacity: 1;
          }
        }
      }

    }
  }



  // TODO: horzontal view
  &.o-chart--horizontal {
    .o-chart-ul {
      flex-direction: column;
      align-items: flex-start;

      > .o-chart-li {
        display: flex;
      }
    }
  }



  // TODO: make treeview for mobile
  &.o-chart--single-column {
    @include breakpoint-max(sm) {
      > .o-chart-ul {
        > .o-chart-li {
          &:not(:last-child) {
            margin-bottom: 120px;
          }

          > .o-chart-ul {
            > .o-chart-li {
              &:before {
                width: 50% !important;
              }
            }
          }

          > *:not(.o-chart-ul):not(.o-chart-li) { // veri first node item
            &:not(:last-child) {
              &:after {
                // content: '';
                // border-left: $chart-line-border !important;
                // bottom: -1 * $chart-line-height !important;
                // height: $chart-line-height !important;
                left: 50% !important;
                // position: absolute !important;
              }
            }
          }
        }
      }

      .o-chart-ul {
        flex-direction: column;

        > .o-chart-li {
          padding: 0;

          > .o-chart-ul {
            > .o-chart-li {
              > .o-chart-ul {
                > .o-chart-li {
                  padding-left: 30px;
                }
              }
            }
          }

          .o-chart__node-data {
            width: 100%;
          }

          > *:not(.o-chart-ul):not(.o-chart-li) { // node items
            &:not(:last-child) {
              &:after {
                // content: '';
                // border-left: $chart-line-border;
                // bottom: -1 * $chart-line-height;
                // height: $chart-line-height;
                left: 0%;
                // position: absolute;
              }
            }
          }

          // We've reached the children elements
          .o-chart-ul {
            // margin-top: ($chart-line-height * 2) - 1; // Fix 1px spacing between borders, no big deal
            // position: relative;

            .o-chart-li {
              // position: relative;

              // The :before will be the horizontal line on the right side of a child connector and the :after
              // will be the left side of the child connector. The child connector is the vertical line going
              // down to its children.
              &:after,
              &:before {
                // content: '';
                // border-top: $chart-line-border;
                // position: absolute;
                // top: -1 * $chart-line-height;
                width: 10%;
              }

              &:before {
                // border-left: $chart-line-border;
                // height: $chart-line-height;
                left: 0%;
              }

              &:after {
                right: auto;
                left: 0;
              }

              // The first and last children won't have to connect to its siblings to the left and right of it,
              // so handle that appropriately by hiding 
              &:first-child,
              &:last-child {
                &:before {
                  border-top: $chart-line-border;
                  border-top-left-radius: $chart-line-border-radius;
                  top: -1 * $chart-line-height;
                }

                &:after {
                  border: none;
                }
              }

              &:last-child {
                &:before {
                  border-left: 0;
                  border-right: $chart-line-border;
                  border-top-left-radius: 0;
                  border-top-right-radius: $chart-line-border-radius;
                  left: 0;
                  right: 50%;
                }
              }

              // When it's an only child, there won't be a need to connect to its siblings so just remove the
              // top border which serves as the horizontal connector
              &:only-child {
                &:before {
                  border-top: none;
                  border-top-right-radius: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>