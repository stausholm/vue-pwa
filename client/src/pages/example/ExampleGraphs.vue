<template>
  <div>
    <div class="container--content">
      <h1>This is graphs and charts</h1>
    </div>
    <div class="container--content">
      <h2>OrganizationChart</h2>
      <button @click="OrganizationChartSettings.enableMobileColumn = !OrganizationChartSettings.enableMobileColumn">enableMobileColumn: {{OrganizationChartSettings.enableMobileColumn}}</button>
      <button @click="OrganizationChartSettings.horizontal = !OrganizationChartSettings.horizontal">horizontal: {{OrganizationChartSettings.horizontal}}</button>
      <organization-chart 
        :data="OrganizationChartData" 
        :horizontal="OrganizationChartSettings.horizontal" 
        :figCaption="OrganizationChartSettings.figCaption" 
        :enableMobileColumn="OrganizationChartSettings.enableMobileColumn" 
        @node-select="onNodeSelect" 
        @node-toggle="onNodeToggle">
        <template slot="bigboss" slot-scope="slotProps">
          <span>{{slotProps.node.data.label}}</span>
        </template>
        <!-- <template slot="default" slot-scope="slotProps">
          <span>slot {{slotProps.node.data.label}}</span>
        </template> -->
      </organization-chart>

      <p style="margin: 200px 0;">MORE HEIGHT</p>
      <h2>Line graph</h2>
      <line-graph :settings="lineSettings" />

      <h2>Bar graph</h2>
      <bar-graph />

      <h2>Donut chart</h2>
      <donut-chart :initialValues="donutValues"/>
      <p style="margin: 200px 0;">MORE HEIGHT</p>
    </div>
  </div>
</template>

<script>
import LineGraph from '@/components/graphs/LineGraph'
import BarGraph from '@/components/graphs/BarGraph'
import DonutChart from '@/components/graphs/DonutChart'
import OrganizationChart from '@/components/graphs/OrganizationChart'

export default {
  name: 'ExampleGraphs',
  components: {
    LineGraph, BarGraph, DonutChart, OrganizationChart
  },
  data() {
    const days = [
      {x: "Mon", y: 70},
      {x: "Tues", y: 50},
      {x: "Wed", y: 10},
      {x: "Thu", y: 50},
      {x: "Fri", y: 120},
      {x: "Sat", y: 72},
      {x: "Sun", y: -100},
      {x: "blab", y: 120},
    ];

    return {
      lineSettings: {
        data: days
      },
      donutValues: [230, 308, 520, 130, 200],
      OrganizationChartSettings: {
        figCaption: 'fig caption prop',
        enableMobileColumn: true,
        horizontal: true
      },
      OrganizationChartData: [
        {
          //type: 'bigboss', // use the bigboss template that we have to create as a scopedSlot then. if no type is added, it defaults to 'default', which can be overwritten with a scopedSlot of the same name, or otherwise will use a default template that can render image, text, label pr node
          styleClass: 'custom-class', // add a custom css class to this node
          disabled: false, // whether clicking on this element emits an event or not. Also toggles a 'disabled' css class. Default false
          collapsible: false, // whether it should be possible to hide all it's children
          collapsed: false, // whether this element is collapsed
          data: { // the data to display in the template
            label: 'aaaa',
            text: 'bbbb',
            imgSrc: 'aaa.jpg'
          },
          children: [ // the children of the element
            {
              data: {
                label: '0 0'
              },
              children: [
                {
                  disabled: true,
                  data: {
                    label: '0 0 0'
                  },
                  children: [
                    {
                      data: {
                        text: '0 0 0 0'
                      }
                    }
                  ]
                },
                {
                  collapsible: true,
                  data: {
                    label: '0 0 1'
                  },
                  children: [
                    {
                      data: {
                        text: '0 0 1 0'
                      }
                    }
                  ]
                },
                {
                  data: {
                    label: '0 0 2'
                  }
                }
              ]
            },
            {
              data: {
                label: '0 1'
              },
              children: [
                {
                  data: {
                    label: '0 1 0'
                  }
                }
              ]
            },
            {
              data: {
                label: '0 2'
              }
            }
          ]
        },
        {
          data: {
            label: '1'
          },
          children: [
            {
              data: {
                label: '1 0'
              }
            },
            {
              data: {
                label: '1 1'
              }
            }
          ]
        },
        {
          data: {
            label: '2'
          },
          children: [
            {
              data: {
                label: '2 0'
              }
            },
            {
              data: {
                label: '2 1'
              }
            }
          ]
        },
        {
          data: {
            label: '3'
          },
          children: [
            {
              data: {
                label: '3 0'
              }
            },
            {
              data: {
                label: '3 1'
              }
            }
          ]
        },
        {
          data: {
            label: '4'
          },
          children: [
            {
              data: {
                label: '4 0'
              }
            },
            {
              data: {
                label: '4 1'
              }
            }
          ]
        }
      ]
    }
  },
  methods: {
    onNodeSelect(node, position) {
      this.$set(node, 'selected', !node.selected)
    },
    onNodeToggle(node, position) {
      this.$set(node, 'collapsed', !node.collapsed)
    }
  }
}
</script>
