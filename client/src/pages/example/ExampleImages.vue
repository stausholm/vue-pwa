<template>
  <div>
    <div class="container--content">
      <h1>this is example images</h1>
      <div style="max-width: 500px">
        <depth-photo imgSrc="/static/img/depthPhotos/avo.jpg" depthmapSrc="/static/img/depthPhotos/avo-map.jpg" :width="600" :height="800" :expandToFit="true" :hideCTA="false"/>
      </div>
      <depth-photo imgSrc="/static/img/depthPhotos/ball.jpg" depthmapSrc="/static/img/depthPhotos/ball-map.jpg" :expandToFit="true" :hideCTA="false"/>
      <depth-photo imgSrc="/static/img/depthPhotos/canyon.jpg" depthmapSrc="/static/img/depthPhotos/canyon-map.jpg" :expandToFit="true" :hideCTA="false"/>
      <depth-photo imgSrc="/static/img/depthPhotos/lady.jpg" depthmapSrc="/static/img/depthPhotos/lady-map.jpg" :expandToFit="true" :hideCTA="false"/>
      <depth-photo imgSrc="/static/img/depthPhotos/mount.jpg" depthmapSrc="/static/img/depthPhotos/mount-map.jpg" :expandToFit="true" :hideCTA="false"/>
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
