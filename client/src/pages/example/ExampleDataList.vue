<template>
  <div>
    <div class="container--content">
      <h1>This is data table</h1>
    </div>
    <div class="container--content">
      <data-list :data="gridData" :columns="gridColumns"/>
      <p style="margin: 200px 0;">MORE HEIGHT</p>
    </div>
  </div>
</template>

<script>
import DataList from '@/components/datalist/DataList';

export default {
  name: 'ExampleDataList',
  components: {
    DataList
  },
  data() {
    return {
      gridData: [
        { name: 'American alligator', location: 'Southeast United States', letter: 'a', number: '1' },
        { name: 'Chinese alligator', location: 'Eastern China', letter: 'b', number: '2' },
        { name: 'Spectacled caiman', location: 'Central & South America', letter: 'c', number: '' },
        { name: 'Broad-snouted caiman', location: 'South America', letter: 'd', number: '4' },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        { name: 'Black caiman', location: 'South America', letter: 'f', number: '6' },
        { name: 'BLbck caiman', location: 'South America', letter: 'f', number: '7' },
        { name: 'American alligator', location: 'Southeast United States', letter: 'a', number: '1' },
        { name: 'Chinese alligator', location: 'Eastern China', letter: 'b', number: '2' },
        { name: 'Spectacled caiman', location: 'Central & South America', letter: 'c', number: '' },
        { name: 'Broad-snouted caiman', location: 'South America', letter: 'd', number: '4' },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        { name: 'Black caiman', location: 'South America', letter: 'f', number: '6' },
        { name: 'BLbck caiman', location: 'South America', letter: 'f', number: '7' },
        { name: 'American alligator', location: 'Southeast United States', letter: 'a', number: '1' },
        { name: 'Chinese alligator', location: 'Eastern China', letter: 'b', number: '2' },
        { name: 'Spectacled caiman', location: 'Central & South America', letter: 'c', number: '' },
        { name: 'Broad-snouted caiman', location: 'South America', letter: 'd', number: '4' },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        { name: 'Black caiman', location: 'South America', letter: 'f', number: '6' },
        { name: 'BLbck caiman', location: 'South America', letter: 'f', number: '7' },
        { name: 'American alligator', location: 'Southeast United States', letter: 'a', number: '1' },
        { name: 'Chinese alligator', location: 'Eastern China', letter: 'b', number: '2' },
        { name: 'Spectacled caiman', location: 'Central & South America', letter: 'c', number: '' },
        { name: 'Broad-snouted caiman', location: 'South America', letter: 'd', number: '4' },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        { name: 'Black caiman', location: 'South America', letter: 'f', number: '6' },
        { name: 'BLbck caiman', location: 'South America', letter: 'f', number: '7' },
        { name: 'American alligator', location: 'Southeast United States', letter: 'a', number: '1' },
        { name: 'Chinese alligator', location: 'Eastern China', letter: 'b', number: '2' },
        { name: 'Spectacled caiman', location: 'Central & South America', letter: 'c', number: '' },
        { name: 'Broad-snouted caiman', location: 'South America', letter: 'd', number: '4' },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        { name: 'Black caiman', location: 'South America', letter: 'f', number: '6' },
        { name: 'BLbck caiman', location: 'South America', letter: 'f', number: '7' },
        { name: 'American alligator', location: 'Southeast United States', letter: 'a', number: '1' },
        { name: 'Chinese alligator', location: 'Eastern China', letter: 'b', number: '2' },
        { name: 'Spectacled caiman', location: 'Central & South America', letter: 'c', number: '' },
        { name: 'Broad-snouted caiman', location: 'South America', letter: 'd', number: '4' },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        { name: 'Black caiman', location: 'South America', letter: 'f', number: '6' },
        { name: 'BLbck caiman', location: 'South America', letter: 'f', number: '7' },
        { name: 'American alligator', location: 'Southeast United States', letter: 'a', number: '1' },
        { name: 'Chinese alligator', location: 'Eastern China', letter: 'b', number: '2' },
        { name: 'Spectacled caiman', location: 'Central & South America', letter: 'c', number: '' },
        { name: 'Broad-snouted caiman', location: 'South America', letter: 'd', number: '4' },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        { name: 'Black caiman', location: 'South America', letter: 'f', number: '6' },
        { name: 'BLbck caiman', location: 'South America', letter: 'f', number: '7' },
        { name: 'American alligator', location: 'Southeast United States', letter: 'a', number: '1' },
        { name: 'Chinese alligator', location: 'Eastern China', letter: 'b', number: '2' },
        { name: 'Spectacled caiman', location: 'Central & South America', letter: 'c', number: '' },
        { name: 'Broad-snouted caiman', location: 'South America', letter: 'd', number: '4' },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        { name: 'Black caiman', location: 'South America', letter: 'f', number: '6' },
        { name: 'BLbck caiman', location: 'South America', letter: 'f', number: '7' },
        { name: 'American alligator', location: 'Southeast United States', letter: 'a', number: '1' },
        { name: 'Chinese alligator', location: 'Eastern China', letter: 'b', number: '2' },
        { name: 'Spectacled caiman', location: 'Central & South America', letter: 'c', number: '' },
        { name: 'Broad-snouted caiman', location: 'South America', letter: 'd', number: '4' },
        { name: 'Jacaré caiman', location: 'South America', letter: 'A' },
        { name: 'Black caiman', location: 'South America', letter: 'f', number: '6' },
        { name: 'BLbck caiman', location: 'South America', letter: 'f', number: '7' },
      ],
      gridColumns: ['name', 'location', 'letter', 'number'],
    }
  }
}
</script>

<style>

</style>
