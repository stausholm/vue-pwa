<template>
  <div class="cards" ref="cards">
    <transition name="fade">
      <p class="card-message" v-show="!allDataFetched && loading">
        <span class="icon-wrapper ripple">

        </span>
        <span>Loading more items...</span>
      </p>
    </transition>
    <transition name="fade">
      <p class="card-message" v-show="allDataFetched">
        <span class="icon-wrapper"></span>
        <span>No more items to show right now!</span>
      </p>
    </transition>
    <card 
         v-for="(item, index) in visibleItems" 
         :key="item.id" :style="{transform: item.styles}" 
         :class="{'card-first': index === visibleItems.length -1}"
        >
      <div class="card__content">
        <b>{{item.title}}</b>
        <p>{{item.body}}</p>
        <br>
        <b>Item id: {{item.id}}</b>
        <p>{{item.styles}}</p>
        <p>items total: {{items.length}}</p>    
      </div>
      <div class="card__actions">
        <button class="btn-success" @click="removeItem('like', item)">Like this</button>
        <button class="btn-danger" @click="removeItem('dislike', item)">Dislike!</button>
      </div>
    </card>
    
    <div class="card empty" ref="empty">
      <div class="card__content" v-if="removedItem">
        <b>{{removedItem.title}}</b>   
        <p>{{removedItem.body}}</p>
        <br>
        <b>Item id: {{removedItem.id}}</b>
        <p>{{removedItem.styles}}</p>
        <p>items total: {{items.length}}</p>  
      </div>
      <div class="card__actions">
        <button >Like this</button>
        <button >Dislike!</button>
      </div>
      
      <div class="ball"></div>
    </div>
  </div>
</template>

<script>
import {browserIsTouch} from '@/utils/browserSpecs'
import Card from './Card'

export default {
  name: 'CardStack',
  components: {
    Card
  },
  data() {
    return {
      supportsTouch: browserIsTouch(),
      items: [],
      currentPage: 13,
      maxItems: 3,
      removedItem : null,
      loading: false,
      allDataFetched: false
    }
  },
  computed: {
    visibleItems() {
      return this.items
        .slice(0, this.maxItems)
        .map((obj, index) => {
          obj.styles = this.animate(index);
          return obj;
        })
        .reverse(); // reverse for css
    }
  },
  methods: {
    removeItem(action, item) {
      this.$emit(action, item.id);
      
      this.removedItem = item;
      const empty = this.$refs.empty;

      const closingClass = action === 'like' ? 'closing-left' : 'closing-right';
      const animFunc = () => {
        empty.classList.remove(closingClass);
        empty.removeEventListener('animationend', animFunc);
      }

      empty.classList.add(closingClass);
      empty.addEventListener('animationend', animFunc)
      this.items.shift();
    },
    fetchItems() {
      console.log('fetching')
      this.loading = true;
      fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.currentPage}&_limit=7`)
      .then(res => res.json())
      .then((data) => {
        setTimeout(() => { // fake delay
          this.items = this.items.concat(data);
          //this.items.push(...data);
          this.loading = false;
          if (data.length === 0) {
            this.allDataFetched = true;
          }
        }, 1000)
      })
    },
    animate(n) {
      let scale = 1-(n/20);
          scale = scale < 0 ? 0 : scale;
      const translateY = (10*n)+"px";
      
      return "scale("+scale+") translateY("+translateY+")";
    }
  },
  created() {
    this.fetchItems();
  },
  watch: {
    items() {
      console.log('watched items change')
      if (this.items.length <= this.maxItems && !this.loading && !this.allDataFetched) {
        this.currentPage++;
        this.fetchItems();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/base/variables.scss";
$danger: #C4183C;
$success: #17C671;

.cards {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  height: 300px;
  position: relative;

  .card {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform-origin: 50% 100%;
    transition: transform 0.3s, box-shadow .3s;
    animation: open 0.3s;

    &.empty {
      opacity: 0;
      pointer-events: none;
      user-select: none;
      animation: none;
    }

    &.closing-left {
      animation: close-right 0.3s;
      opacity: 1;
    }
    &.closing-right {
      animation: close-left 0.3s;
    }
    
    &:not(.card-first) {
      user-select: none;
      pointer-events: none;
    }
  }
}

@keyframes open {
  0%   { 
    bottom: -10px;
    opacity: 0;
  }
  100%   {
    bottom: 0;
    opacity: 1;
  }
}

@keyframes close-left {
  0%   { transform: translateX(0px); opacity: 1; }
  100%   { transform: translateX(100vw); opacity: 0; }
}
@keyframes close-right {
  0%   { transform: translateX(0px); opacity: 1; }
  100%   { transform: translateX(-100vw); opacity: 0; }
}


.ball {
  width:100px;
  height: 100px;
  background: grey;
  border-radius: 50%;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  &::after {
    content: "✌";
    color: $white;
    width: 100%;
    height: 100%;
    display: block;
    text-align: center;
    line-height: 100px;
    font-size: 50px;
  }
}
.closing-right .ball {
  background: $danger;

  &::after {
    content: "💔";
  }
}
.closing-left .ball {
  background: $success;
  
  &::after {
    content: "💚";
  }
}



.cards {
  display: flex;
  justify-content: center;
  align-items: center;

  .card-message {
    font-weight: 500;
    user-select: none;
    position: absolute;
  }
  
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    
    &__content {
      padding: $default-spacing;
      overflow: auto;
    }
    
    &__actions {
      display: flex;
      border-top: 1px solid lightgrey;
      
      button {
        flex: 1;
        border: 0;
        outline: 0;
        background: none;
        padding: 20px;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: .025em;
        text-decoration: none;
        font-weight: 600;
        cursor: pointer;
        transition: all 250ms cubic-bezier(.27,.01,.38,1.06);
        
        &:hover {
          background: lightgrey;
        }
        
        &.btn-danger {
          color: $danger;
          &:hover {
            background: $danger;
            color: $white;
          }
        }
        &.btn-success {
          color: $success;
          &:hover {
            background: $success;
            color: $white;
          }
        }
        
      }
    }
    
    // &-first {
    //   &:hover {
    //     box-shadow: 0px 8px 60px 10px rgba(48, 52, 58, 0.4);
    //   }
    // }
  }
}

.icon-wrapper {
  width: 24px;
  height: 24px;
  background: $gray-darker;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
  
  &.ripple {
    animation: ripple 0.6s linear infinite;
  }
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba($gray-darker, 0.1),
                0 0 0 20px rgba($gray-darker, 0.1),
                0 0 0 40px rgba($gray-darker, 0.1),
                0 0 0 60px rgba($gray-darker, 0.1);
  }
  100% {
    box-shadow: 0 0 0 20px rgba($gray-darker, 0.1),
                0 0 0 40px rgba($gray-darker, 0.1),
                0 0 0 60px rgba($gray-darker, 0.1),
                0 0 0 80px rgba($gray-darker, 0);
  }
}
</style>