<template>
  <div>
    setting page 1
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <floating-action-bar :options="options" />
  </div>
</template>

<script>
import FloatingActionBar from '@/components/floatingActionBar/FloatingActionBar'

export default {
  name: 'Setting1',
  components: {
    FloatingActionBar
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
        },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
        // {
        //   label: 'Beach boi has a very long name',
        //   icon: () => import('@/components/icons/IconBeachAccess'),
        //   action: () => this.yo(5)
        // },
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
