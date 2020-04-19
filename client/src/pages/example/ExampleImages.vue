<template>
  <div>
    <div class="container--content">
      <h1>this is example images</h1>
      <depth-photo imgSrc="https://i.postimg.cc/4dWr7TnV/avo.jpg" depthmapSrc="https://i.postimg.cc/bv36L98j/avo-depth.jpg" :expandToFit="false" :hideCTA="false"/>
      <h2>some content below image</h2>
    </div>
  </div>
</template>

<script>
import DepthPhoto from '@/components/DepthPhoto/DepthPhoto'
export default {
  name: 'ExampleImages',
  components: {
    DepthPhoto
  },
  data() {
    return {
      images: [

      ]
    }
  }
}
</script>
