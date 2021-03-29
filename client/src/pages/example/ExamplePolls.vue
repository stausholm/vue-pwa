<template>
  <div>
    <div class="container--content">
      <h1>Polls</h1>

      <br>
      <br>

      <poll :centerText="true" :multiColumn="true" pollId="1234jk-453hhf-345345-3456-dfdg-dfg345">
        Some content to give context to the question. e.g. an image
      </poll>
      
      <br>
      <br>

      <poll :multiColumn="true" :boxed="true" pollId="lkfgj-fdkjgh-456sd-664-dsgghj-08ddf">
        Some content to give context to the question. e.g. an image
        <img src="https://picsum.photos/600/400" alt="">
      </poll>
      
      <br>
      <br>
      
      <poll :centerText="true" pollId="idshdf-hght-jhgft-522d-yyye-sdfe">
        Some content to give context to the question. e.g. an image
      </poll>
      
      <br>
      <br>
      
      <poll pollId="wwwrt-erttt-342-qdfff-sdfhgv">
        Some content to give context to the question. e.g. an image
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