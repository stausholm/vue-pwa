<template>
  <div class="graph-wrapper" :style="{paddingLeft: maxValChars * 10 + 'px'}"> <!-- assume 10px width for each char -->
    <div class="graph linegraph" ref="graph" :class="{'graph--animateload': graph.animateOnLoad}">
      <svg :viewBox="`0 0 ${width} ${graph.height}`" shape-rendering="geometricPrecision">
        <defs>
          <linearGradient id="graphgradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop 
              offset="0%" 
              :style="`stop-color:${graph.colorGradientFill1};stop-opacity:1`"/>
            <stop 
              :offset="graph.gradientFillStop + '%'" 
              :style="`stop-color:${graph.colorGradientFill2};stop-opacity:${graph.gradientFill2Opacity}`"/>
          </linearGradient>
        </defs>
        <g v-if="graph.xLines">
          <line 
            v-for="n in graph.xLinesCount"
            :key="n"
            class="graph-line--horizontal"
            x1="0"
            :y1="(n - 1) * horizontalPositionMultiplier"
            :x2="width"
            :y2="(n - 1) * horizontalPositionMultiplier"
            :stroke="graph.colorXLines"
            stroke-width="1">
          </line>
        </g>
        <g v-if="graph.yLines">
          <line 
            v-for="(value, index) in graph.data"
            :key="'line' + index"
            class="graph-line--vertical"
            :x1="index * verticalPositionMultiplier"
            :y1="getY1(value.y)"
            :x2="index * verticalPositionMultiplier"
            :y2="graph.height"
            :stroke="graph.colorYLines"
            stroke-dasharray="5 6"
            stroke-width="1">
          </line>
        </g>
        <path
          v-if="graph.fill && !graph.gradientFill"
          class="graph-fill"
          :d="fillPath"
          :fill="graph.colorFill"
          :style="'opacity: ' + graph.fillOpacity"
          stroke-width="0">
        </path>
        <path
          v-if="graph.gradientFill"
          class="graph-fill"
          :d="fillPath"
          fill="url(#graphgradient)"
          :style="'opacity: ' + graph.fillOpacity"
          stroke-width="0">
        </path>
        <path
          class="graph-line--main"
          :d="mainPath"
          :stroke="graph.colorLine"
          :stroke-width="graph.lineWeight"
          fill="none"
          vector-effect="non-scaling-stroke">
        </path>
        <g v-if="graph.dots">
          <circle 
            v-for="(value, index) in graph.data"
            :key="'dot' + index"
            class="graph-dot"
            :cx="index * verticalPositionMultiplier" 
            :cy="getY1(value.y)" 
            :r="graph.dotRadius" 
            :fill="graph.colorDot" 
            :stroke="graph.colorDotStroke" 
            :stroke-width="graph.dotStrokeWeight" 
            vector-effect="non-scaling-stroke">
          </circle>
        </g>
        <text
          v-for="(value, index) in graph.data"
          :key="'dotlabel' + index"
          class="graph-dot-label"
          :class="{'graph-dot-label--hovershow': graph.DotLabelsOnlyOnHover}"
          :x="index * verticalPositionMultiplier"
          :y="getY1(value.y) - graph.dotRadius * 2"
          :fill="graph.colorDotLabels"
          text-anchor="middle">
          {{value.y}}
        </text>
        <g>
          <text
            v-for="(value, index) in graph.data"
            :key="'xlabel' + index"
            class="graph-vertical-label"
            :x="index * verticalPositionMultiplier"
            :y="graph.height + 16"
            :fill="graph.colorYLinesLabels"
            :text-anchor="textAnchor(index)">
            {{value.x}}
          </text>
        </g>
        <g>
          <text 
            class="graph-horizontal-label"
            :x="0 - maxValChars"
            :y="0"
            alignment-baseline="middle"
            text-anchor="end">
            {{maxVal}}
          </text>
          <text 
            class="graph-horizontal-label"
            :x="0 - maxValChars"
            :y="graph.height"
            alignment-baseline="middle"
            text-anchor="end">
            0
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
// currently assume largest value is largest from dataset, and lowest is 0
export default {
  name: 'LineGraph',
  props: {
    settings: {
      type: Object
    }
  },
  data() {
    return {
      graph: {},
      width: 0
    }
  },
  computed: {
    values() {
      //list of values from data
      return this.graph.data.map(obj => obj.y)
    },
    maxVal() {
      // largest value from dataset
      return Math.max.apply(Math, this.values)
    },
    maxValChars() {
      // number of chars in maxVal. Used to calculate padding-left on wrapper
      return this.maxVal.toString().length;
    },
    verticalPositionMultiplier() {
      // get x position for data at index 1. Used to multiply with index in v-for
      const length = this.graph.data.length - 1;
      const one = this.width / length;

      return one;
    },
    horizontalPositionMultiplier() {
      // get y position for horizontal line at index 1. Used to multiply with index in v-for
      return this.graph.height / (this.graph.xLinesCount - 1)
    },
    mainPath() {
      // calculate data path
      let dataString = "";

      this.graph.data.forEach((item, index) => {
        // get positions for point on path
        let x = index * this.verticalPositionMultiplier;
        let y = this.getY1(item.y);

        if (index === 0) { // start path with M
          let letter = this.graph.lineCurve ? 'S' : 'L'; // determine if cubic bezier or straight lines
          return dataString += `M ${x} ${y} ${letter} `
        }
        if (!this.graph.lineCurve) { // is straight lines
          return dataString += `${x} ${y} `;
        }

        // us curved lines
        let curveX = this.width / this.values.length; // prevent funky looking curves on small devices
        if (curveX > 50) {
          curveX = 50;
        }
        dataString += `${x - curveX} ${y} ${x} ${y} `

      })
      return dataString;
    },
    fillPath() {
      if (!this.graph.fill) {
        return 0;
      }
      // just take the main path already calculated, and wrap it back to the start
      let height = this.graph.height;
      let dataString = this.mainPath + `L ${this.width} ${height} L 0 ${height} Z`;

      return dataString;
    }
  },
  methods: {
    getY1(y) {
      // find out how many percent down the y-axis y1 has to be
      const remainingPercent = 100 - ((y / this.maxVal) * 100); // get remaining percent. ex: maxval = 120. y = 80. y = 66% of maxval, so remaining = 33%; 

      const viewboxHeight = this.graph.height;

      return remainingPercent / 100 * viewboxHeight;
    },
    textAnchor(index) {
      // left align text for index 0
      if (index === 0) {
        return 'start';
      }
      //right align text for last index
      if (index === this.values.length - 1) {
        return 'end';
      }
      // default center align text
      return 'middle';
    },
    setWidth() {
      // dynamically set svg viewBox width
      this.width = this.$refs.graph.offsetWidth;
    }
  },
  created() {    
    const defaultOptions = Object.assign({
      data: [],

      height: 100, // pixel height of graph

      colorLine: '#d3a2ef', // color of main line
      lineWeight: 2, // thickness of main line
      lineCurve: true, // don't curve the points on the main line

      dots: true, // show or hide dots on main line
      dotRadius: 5, // radius of dots on main line
      colorDot: '#c3ecf7', // color of dots on main line
      dotStrokeWeight: 3, // thickness of stroke on dots
      colorDotStroke: '#000', // color of stroke on dots
      colorDotLabels: '#000', // color of labels above dots on hover
      DotLabelsOnlyOnHover: true, // hide labels and show them only on hover

      xLines: true, // show horizontal lines behind the graph
      xLinesCount: 5, // show this many horizontal lines
      colorXLines: '#7f7f7f', // color of horizontal lines behind graph
      colorXLinesLabels: '#000', // color of labels next to horizontal lines
      //xLinesLabels: true, 

      yLines: true, // show vertical lines behind the graph
      colorYLines: '#7f7f7f', // color of vertical lines behind graph
      colorYLinesLabels: '#000', // color of labels under vertical lines

      fill: true, // fill in area below main line
      colorFill: '#533c68', // color of filled in area below main line
      fillOpacity: 0.25, // opacity of filled in area below main line
      gradientFill: true, // use a gradient to fill in area below main line, instead of a solid color
      colorGradientFill1: 'rgb(255,255,0)', // top color of gradient  
      colorGradientFill2: 'rgb(255,255,0)', // bottom color of gradient  
      gradientFill2Opacity: 0, // opacity bottom part of gradient 
      gradientFillStop: 100, // percentage from top, gradient ends   

      animateOnLoad: true, // animate graph on load


    }, this.settings)

    this.graph = defaultOptions;
  },
  mounted() {
    this.setWidth();
    
    window.addEventListener('resize', this.setWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWidth)
  }
}
</script>

<style lang="scss">
.graph-wrapper {
  padding: 1rem 0;
}
.linegraph svg {
  overflow: visible;

  .graph-dot-label {
    font-size: .8rem;

    &--hovershow {
      opacity: 0;
      transform: translateY(1.2rem);
      transition: transform .15s, opacity .15s;
    }
  }

  &:hover {
    .graph-dot-label--hovershow {
      opacity: 1;
      transform: translateY(0)
    }
  }
  
  .graph-horizontal-label {
    opacity: .6;
  }
}
.graph--animateload {
  .graph-line--main, .graph-fill, .graph-dot, .graph-line--vertical {
    transform-origin: bottom;
    //transform: scale(1);
    animation: graphgrow .4s ease-out;
  }
}
@keyframes graphgrow {
  0% {transform: scaleY(0);}
  100% {transform: scaleY(1);}
}
</style>