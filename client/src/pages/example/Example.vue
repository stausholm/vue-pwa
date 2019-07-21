<template>
  <div>
    <div class="container--content">
      <h1>this is example yo</h1>
      <breadcrumbs />
      <cta-button-icon @click.native="test">
        <template slot="text">amazing cta text</template>
        <template slot="icon">
          <icon-base iconName="CTA" width="18" height="18">
            <icon-beach-access />
          </icon-base>
        </template>
      </cta-button-icon>
      <button @click="testNotification">test notification</button>
      <button @click="testNotification2">test notification warning</button>
      <div style="width:200px;height:200px;background:red;" v-if="showBox"></div>
      <p style="margin-top:200px">more height!</p>
      

      <ul>
        <li v-for="link in childRoutes" :key="link.path">
          <router-link :to="'/example/' + link.path">{{link.name}}</router-link>
        </li>
      </ul>
      <router-view class="router-view"/>
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
      <search-bar />
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
    </div>
  </div>
</template>

<script>
import CTAButtonWithIcon from '@/components/buttons/CTAButtonWithIcon';
import IconBase from '@/components/icons/IconBase';
import IconBeachAccess from '@/components/icons/IconBeachAccess';
import SearchBar from '@/components/search/SearchBar';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

import {getUAObject} from '@/utils/browserSpecs';

export default {
  name: 'Example',
  components: {
    'cta-button-icon': CTAButtonWithIcon,
    IconBase,
    IconBeachAccess,
    SearchBar,
    Breadcrumbs
  },
  data() {
    return {
      showBox: true
    }
  },
  computed: {
    childRoutes() {
      return this.$router.options.routes.find(route => route.path === '/example').children
    }
  },
  methods: {
    testNotification() {
      this.$store.dispatch('changeNotification', {content: '5 files deleted', duration: 4000, label: 'Undo'})
    },
    testNotification2() {
      this.showBox = false

      this.$store.dispatch('changeNotification', {
        content: 'some warning content that is very long, what will happen now huh', 
        duration: 400000, 
        theme: 'warning',
        // action: () => this.showBox = !this.showBox,
        // action: this.test,
        action: () => this.test200(200),
        label: 'yoyo'
        })
    },
    test() {
      console.log('test .native', getUAObject())
    },
    test200(val) {
      console.log(val)
      this.showBox = !this.showBox
    }
  }
}
</script>
