<template>
  <div class="donut-wrapper">
    <div class="donut" ref="donut">
      <svg :viewBox="`0 0 ${cxAndCy * 2} ${cxAndCy * 2}`" shape-rendering="geometricPrecision">
        <g v-for="(item, index) in chartData" :key="index">
          <circle 
            :cx="cxAndCy" 
            :cy="cxAndCy" 
            :r="radius" 
            fill="transparent" 
            :stroke="colors[index]" 
            :stroke-width="strokeWidth"
            :stroke-dasharray="circumference - 2"
            :stroke-dashoffset="calculateStrokeDashOffset(item.value)"
            :transform="item.rotate">
          </circle>
          <text
            v-if="item.textPercentage > 5"
            text-anchor="middle"
            dy="5px"
            :x="item.textX" 
            :y="item.textY">
            {{item.textPercentage}}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
// https://css-tricks.com/building-a-donut-chart-with-vue-and-svg/
export default {
  name: 'DonutChart',
  props: {
    initialValues: {
      type: Array
    }
  },
  data() {
    return {
      colors: ["#6495ED", "goldenrod", "#cd5c5c", "thistle", "lightgray"],
      // cx: 80,
      // cy: 80,                      
      radius: 80,   
      strokeWidth: 30,
      angleOffset: -90
    }
  },
  computed: {
    cxAndCy() {
      return this.strokeWidth / 2 + this.radius
    },
    circumference() {
      return 2 * Math.PI * this.radius
    },
    sortedValues() {
      return this.initialValues.map(item => item).sort((a,b) => b-a)
    },
    chartData() {
      return this.sortedValues.map((item, index) => {
        const {x, y} = this.calculateTextCoords(item, this.angleOffset)
        const percentage = this.dataPercentage(item)
        const thing = {
          value: item,
          degrees: this.angleOffset,
          rotate: `rotate(${this.angleOffset}, ${this.cxAndCy}, ${this.cxAndCy})`,
          textX: x,
          textY: y,
          textPercentage: Math.round(percentage * 100)
        }
        this.angleOffset = percentage * 360 + this.angleOffset
        return thing
      })
    },
    dataTotal() {
      return this.sortedValues.reduce((a,b) => a + b, 0)
    }
  },
  methods: {
    dataPercentage(dataVal) {
      return dataVal / this.dataTotal
    },
    calculateStrokeDashOffset(dataVal) {
      const strokeDiff = this.dataPercentage(dataVal) * this.circumference
      return this.circumference - strokeDiff
    },
    calculateTextCoords(dataVal, angleOffset) {
      const angle = (this.dataPercentage(dataVal) * 360) / 2 + angleOffset
      const radians = this.degreesToRadians(angle)

      const textCoords = {
        x: (this.radius * Math.cos(radians) + this.cxAndCy),
        y: (this.radius * Math.sin(radians) + this.cxAndCy)
      }
      return textCoords
    },
    degreesToRadians(angle) {
      return angle * (Math.PI / 180)
    }
  }
}
</script>
