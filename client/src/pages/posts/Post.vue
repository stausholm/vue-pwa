<template>
  <div>
    <div class="post-header secondary-header secondary-header--as-primary">
      <div class="container">
        <button class="btn-icon" v-for="option in options" :key="option.label" @click="option.action">
          <icon-base>
            <component :is="option.icon"/>
          </icon-base>
        </button>
      </div>
    </div>
    <div class="container--content post">
      This is a post! {{$route.params.id}}
    </div>

    <floating-action-bar :options="options" />
  </div>
</template>

<script>
import FloatingActionBar from '@/components/floatingActionBar/FloatingActionBar'
import IconBase from '@/components/icons/IconBase'

export default {
  name: 'Post',
  components: {
    FloatingActionBar,
    IconBase
  },
  data() {
    return {
      options: [
        {
          label: 'Label 1',
          icon: () => import('@/components/icons/IconBusinessCenter'),
          action: () => this.yo(1)
        },
        {
          label: 'casino',
          icon: () => import('@/components/icons/IconCasino'),
          action: () => this.yo(2)
        },
        {
          label: 'Search',
          icon: () => import('@/components/icons/IconSearch'),
          action: () => this.yo(3)
        },
        {
          label: 'email',
          icon: () => import('@/components/icons/IconMail'),
          action: () => this.yo(4)
        },
        {
          label: 'Beach boi has a very long name',
          icon: () => import('@/components/icons/IconBeachAccess'),
          action: () => this.yo(5)
        }
      ]
    }
  },
  methods: {
    yo(param) {
      console.log('called yo', param)
    }
  }
}
</script>
<style lang="scss" scoped>
.post {
  min-height: 100vh;
}
</style>
