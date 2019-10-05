<template>
  <div>
    <div class="container--content">
      <h1>cards</h1>

      <card>
        some slottet content
      </card>

      <br>
      <br>
      <p>Liked cards ({{likes.length}}): {{likes}}</p>
      <p>Disliked cards ({{dislikes.length}}): {{dislikes}}</p>
      <br>
      <br>

      <card-stack @like="increment('like', $event)" @dislike="increment('dislike', $event)"/>
    </div>
  </div>
</template>

<script>
import Card from '@/components/card/Card'
import CardStack from '@/components/card/CardStack'

export default {
  name: 'ExampleCard',
  components: {
    Card,
    CardStack
  },
  data() {
    return {
      likes: [],
      dislikes: []
    }
  },
  methods: {
    increment(type, id) {
      if (type === 'like') {
        this.likes.push(id)
      }
      if (type === 'dislike') {
        this.dislikes.push(id)
      }
    }
  }
}
</script>