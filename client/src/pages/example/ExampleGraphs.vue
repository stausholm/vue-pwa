<template>
  <div>
    <div class="container--content">
      <h1>This is graphs</h1>
    </div>
    <div class="container--content">
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
import LineGraph from '@/components/graphs/LineGraph';
import BarGraph from '@/components/graphs/BarGraph';
import DonutChart from '@/components/graphs/DonutChart';

export default {
  name: 'ExampleGraphs',
  components: {
    LineGraph, BarGraph, DonutChart
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
      donutValues: [230, 308, 520, 130, 200]
    }
  }
}
</script>
