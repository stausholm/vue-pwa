<template>
  <div>
    <div class="container--content" style="max-width: 600px;">
      <h1>Polls</h1>

      <br>
      <br>

      <!-- <poll :centerText="true" :multiColumn="true" pollId="1234jk-453hhf-345345-3456-dfdg-dfg345">
        Some content to give context to the question. e.g. an image
        <template slot="subtext">
          <span>some smalltext disclaimer</span>
        </template>
        <template slot="brand">
          Brand example 1
        </template>
      </poll>
      
      <br>
      <br>

      <poll :multiColumn="true" :boxed="true" pollId="lkfgj-fdkjgh-456sd-664-dsgghj-08ddf">
        Some content to give context to the question. e.g. an image
        <img src="https://picsum.photos/600/400" alt="">
        <template slot="subtext">
          <span>some smalltext disclaimer</span>
        </template>
        <template slot="brand">
          Brand example 2
        </template>
      </poll>
      
      <br>
      <br>
      
      <poll :centerText="true" pollId="idshdf-hght-jhgft-522d-yyye-sdfe">
        Some content to give context to the question. e.g. an image
        <template slot="subtext">
          <span>some smalltext disclaimer</span>
        </template>
        <template slot="brand">
          Brand example 3
        </template>
      </poll>
      
      <br>
      <br> -->
      
      <poll pollId="c7cbb406-69ce-494d-ba46-176ccb73af5d" >
        Some content to give context to the question. e.g. an image
        <template slot="subtext">
          <span>some smalltext disclaimer</span>
        </template>
        <template slot="brand">
          Brand example 4
        </template>
      </poll>

    </div>
  </div>
</template>

<script>
import Poll from '@/components/poll/Poll'

export default {
  name: 'ExamplePolls',
  components: {
    Poll
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>