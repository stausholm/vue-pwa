<template>
  <div>
    <div class="container--content">
      <h1>this is example swiper</h1>
      <swiper @intersect="loadMore" intersectionMargin="100px">
        <swiper-item v-for="item in items" :key="item.id">
          <b>{{item.title}}</b>
          <p>{{item.id}}</p>
        </swiper-item>
        <swiper-item v-if="loading" class="no-card">
          <h2>loading more</h2>
        </swiper-item>
        <swiper-item v-if="allDataLoaded" class="no-card">
          <h2>All data has been loaded</h2>
        </swiper-item>
      </swiper>

      <p style="margin-top:200px">more height!</p>
      <button @click="addItem">add item</button>
      <button @click="removeItem">remove item</button>
      (resize screen to recalculate custom scrollbar, after editing items array)
      <!-- <a href="https://blog.usejournal.com/css-scroll-snap-how-it-really-works-94d99db80bc9">https://blog.usejournal.com/css-scroll-snap-how-it-really-works-94d99db80bc9</a>
      <a href="https://nolanlawson.com/2019/02/10/building-a-modern-carousel-with-css-scroll-snap-smooth-scrolling-and-pinch-zoom/">https://nolanlawson.com/2019/02/10/building-a-modern-carousel-with-css-scroll-snap-smooth-scrolling-and-pinch-zoom/</a> -->
      
      <br>
      <br>
      <br>
      <h2>This is custom swiper item</h2>
      <swiper>
        <custom-swiper-item v-for="item in items2" :key="item.id" :content="item"/>
      </swiper>

      <br>
      <br>
      <br>
      <h2>This is custom swiper with native scrollbar enabled</h2>
      <swiper :noScrollbar="false">
        <custom-swiper-item v-for="item in items2" :key="item.id" :content="item"/>
      </swiper>
      
      <br>
      <br>
      <br>
      <h2>This is custom swiper with custom scrollbar enabled v4</h2>
      <swiper customScrollBar="yes">
        <custom-swiper-item v-for="item in items2" :key="item.id" :content="item"/>
      </swiper>
      
      <!-- <br>
      <br>
      <br>
      <h2>This is custom swiper with custom scrollbar enabled (and indented)</h2>
      <swiper customScrollBar="indent">
        <custom-swiper-item v-for="item in items2" :key="item.id" :content="item"/>
      </swiper> -->

      <br>
      <br>
      <br>
      <h2>This is another custom swiper item</h2>
      <swiper>
        <custom-swiper-item-2 v-for="item in items2" :key="item.id" :content="item" class="custom-swiper-item-2"/>
      </swiper>
    </div>
  </div>
</template>

<script>
import Swiper from '../../components/swiper/SwiperWrapper'
import SwiperItem from '../../components/swiper/SwiperItem'
import CustomSwiperItem from '../../components/swiper/layouts/Custom1'
import CustomSwiperItem2 from '../../components/swiper/layouts/Custom2'

export default {
  name: 'ExampleSwiper',
  components: {
    Swiper,
    SwiperItem,
    CustomSwiperItem,
    CustomSwiperItem2
  },
  data() {
    return {
      loading: false,
      allDataLoaded: false,
      items: [
        {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
        {
        "albumId": 1,
        "id": 2,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": "https://via.placeholder.com/600/771796",
        "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },
        {
        "albumId": 1,
        "id": 3,
        "title": "officia porro iure quia iusto qui ipsa ut modi",
        "url": "https://via.placeholder.com/600/24f355",
        "thumbnailUrl": "https://via.placeholder.com/150/24f355"
        },
        {
        "albumId": 1,
        "id": 4,
        "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        "url": "https://via.placeholder.com/600/d32776",
        "thumbnailUrl": "https://via.placeholder.com/150/d32776"
        },
        {
        "albumId": 1,
        "id": 5,
        "title": "natus nisi omnis corporis facere molestiae rerum in",
        "url": "https://via.placeholder.com/600/f66b97",
        "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
        },
        {
        "albumId": 1,
        "id": 6,
        "title": "accusamus ea aliquid et amet sequi nemo",
        "url": "https://via.placeholder.com/600/56a8c2",
        "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
        },
        {
        "albumId": 1,
        "id": 7,
        "title": "officia delectus consequatur vero aut veniam explicabo molestias",
        "url": "https://via.placeholder.com/600/b0f7cc",
        "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
        },
        {
        "albumId": 1,
        "id": 8,
        "title": "aut porro officiis laborum odit ea laudantium corporis",
        "url": "https://via.placeholder.com/600/54176f",
        "thumbnailUrl": "https://via.placeholder.com/150/54176f"
        },
        {
        "albumId": 1,
        "id": 9,
        "title": "qui eius qui autem sed",
        "url": "https://via.placeholder.com/600/51aa97",
        "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
        },
        {
        "albumId": 1,
        "id": 10,
        "title": "beatae et provident et ut vel",
        "url": "https://via.placeholder.com/600/810b14",
        "thumbnailUrl": "https://via.placeholder.com/150/810b14"
        },
        {
        "albumId": 1,
        "id": 11,
        "title": "nihil at amet non hic quia qui",
        "url": "https://via.placeholder.com/600/1ee8a4",
        "thumbnailUrl": "https://via.placeholder.com/150/1ee8a4"
        },
        {
        "albumId": 1,
        "id": 12,
        "title": "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
        "url": "https://via.placeholder.com/600/66b7d2",
        "thumbnailUrl": "https://via.placeholder.com/150/66b7d2"
        },
        {
        "albumId": 1,
        "id": 13,
        "title": "repudiandae iusto deleniti rerum",
        "url": "https://via.placeholder.com/600/197d29",
        "thumbnailUrl": "https://via.placeholder.com/150/197d29"
        },
        {
        "albumId": 1,
        "id": 14,
        "title": "est necessitatibus architecto ut laborum",
        "url": "https://via.placeholder.com/600/61a65",
        "thumbnailUrl": "https://via.placeholder.com/150/61a65"
        },
        {
        "albumId": 1,
        "id": 15,
        "title": "harum dicta similique quis dolore earum ex qui",
        "url": "https://via.placeholder.com/600/f9cee5",
        "thumbnailUrl": "https://via.placeholder.com/150/f9cee5"
        }
      ],
      items2: [
        {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
        {
        "albumId": 1,
        "id": 2,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": "https://via.placeholder.com/600/771796",
        "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },
        {
        "albumId": 1,
        "id": 3,
        "title": "officia porro iure quia iusto qui ipsa ut modi",
        "url": "https://via.placeholder.com/600/24f355",
        "thumbnailUrl": "https://via.placeholder.com/150/24f355"
        },
        {
        "albumId": 1,
        "id": 4,
        "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        "url": "https://via.placeholder.com/600/d32776",
        "thumbnailUrl": "https://via.placeholder.com/150/d32776"
        },
        {
        "albumId": 1,
        "id": 5,
        "title": "natus nisi omnis corporis facere molestiae rerum in",
        "url": "https://via.placeholder.com/600/f66b97",
        "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
        },
        {
        "albumId": 1,
        "id": 6,
        "title": "accusamus ea aliquid et amet sequi nemo",
        "url": "https://via.placeholder.com/600/56a8c2",
        "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
        },
        {
        "albumId": 1,
        "id": 7,
        "title": "officia delectus consequatur vero aut veniam explicabo molestias",
        "url": "https://via.placeholder.com/600/b0f7cc",
        "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
        },
        {
        "albumId": 1,
        "id": 8,
        "title": "aut porro officiis laborum odit ea laudantium corporis",
        "url": "https://via.placeholder.com/600/54176f",
        "thumbnailUrl": "https://via.placeholder.com/150/54176f"
        },
        {
        "albumId": 1,
        "id": 9,
        "title": "qui eius qui autem sed",
        "url": "https://via.placeholder.com/600/51aa97",
        "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
        },
        {
        "albumId": 1,
        "id": 10,
        "title": "beatae et provident et ut vel",
        "url": "https://via.placeholder.com/600/810b14",
        "thumbnailUrl": "https://via.placeholder.com/150/810b14"
        },
        {
        "albumId": 1,
        "id": 11,
        "title": "nihil at amet non hic quia qui",
        "url": "https://via.placeholder.com/600/1ee8a4",
        "thumbnailUrl": "https://via.placeholder.com/150/1ee8a4"
        },
        {
        "albumId": 1,
        "id": 12,
        "title": "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
        "url": "https://via.placeholder.com/600/66b7d2",
        "thumbnailUrl": "https://via.placeholder.com/150/66b7d2"
        },
        {
        "albumId": 1,
        "id": 13,
        "title": "repudiandae iusto deleniti rerum",
        "url": "https://via.placeholder.com/600/197d29",
        "thumbnailUrl": "https://via.placeholder.com/150/197d29"
        },
        {
        "albumId": 1,
        "id": 14,
        "title": "est necessitatibus architecto ut laborum",
        "url": "https://via.placeholder.com/600/61a65",
        "thumbnailUrl": "https://via.placeholder.com/150/61a65"
        },
        {
        "albumId": 1,
        "id": 15,
        "title": "harum dicta similique quis dolore earum ex qui",
        "url": "https://via.placeholder.com/600/f9cee5",
        "thumbnailUrl": "https://via.placeholder.com/150/f9cee5"
        }
      ]
    }
  },
  methods: {
    addItem() {
      this.items.push({
        albumId: 1,
        id: Math.random() * Math.random(),
        title: "yoyo" + Math.random(),
        url: "https://via.placeholder.com/600/197d29",
        thumbnailUrl: "https://via.placeholder.com/150/197d29"
      })
    },
    removeItem() {
      this.items.pop()
    },
    loadMore() {
      console.log('swiper intersect')
      if (this.allDataLoaded) return 

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        if (this.items.length < 25) {
          this.addItem();
          this.addItem();
          this.addItem();
        } else {
          this.allDataLoaded = true;
        }
      },1200)
    }
  }
}
</script>
