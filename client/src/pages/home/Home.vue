<template>
  <div>
    <hero-block-split :pullImageLeft="false" :background="['image', 'fade']"/>
    <div class="container--content">
      <breadcrumbs />
      <h1>this is home</h1>
      <offline />
      <header>
        <span v-if="!isLoggedIn"><router-link to="/login">Login</router-link></span>
        <span v-if="!isLoggedIn"><router-link to="/register">Register</router-link></span>
        <span v-if="isLoggedIn"><a @click.prevent="logout">Logout</a></span>
      </header>
      <a2hs-button v-if="showPWAButton"/>
      <nav class="temp">
        <router-link to="/">Home</router-link>
        <router-link to="/example">Example</router-link>
        <router-link to="/exampleWithAuth">Example auth</router-link>
        <router-link to="/exampleWithAuthRole">Example auth role</router-link>
        <router-link to="/exampleinputs">Example inputs</router-link>
        <router-link to="/exampledatalist">Example datalist</router-link>
        <router-link to="/examplegraphs">Example graphs</router-link>
        <router-link to="/exampleicons">Example icons</router-link>
        <router-link to="/search">Search</router-link>
        <router-link to="/account">Account</router-link>
      </nav>
      <button class="btn" @click="toggleLogin">{{isLoggedIn ? 'logout' : 'login'}}</button>

      <pre style="overflow: scroll;">{{UA}}</pre>
      
      <p style="margin-top:200px">more height!</p>
    </div>
  </div>
</template>

<script>
import A2HSButton from '@/components/A2HS/A2HSbutton';
import offline from '@/components/offline/OfflineNotice';
import HeroBlockSplit from '@/components/hero/HeroBlockSplit';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

import {getUAObject} from '@/utils/browserSpecs';

export default {
  name: 'Home',
  components: {
    'a2hs-button': A2HSButton, offline, HeroBlockSplit, Breadcrumbs
  },
  data() {
    return {
      UA: getUAObject()
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    showPWAButton() {
      return this.$store.getters.showPWAButton
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login');
        })
    },
    toggleLogin() {
      this.$store.commit('dummyLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
.temp {
  a {
    display: block;
    margin: 16px 0;
  }
}
</style>
