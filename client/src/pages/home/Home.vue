<template>
  <div>
    <hero-block-split :pullImageLeft="false" :background="['image', 'fade']"/>
    <div class="container--content">
      <breadcrumbs />
      <h1>this is home</h1>
      <nav class="block-link-wrapper">
        <block-link to="/example">Example</block-link>
        <block-link to="/exampleWithAuth">a page that doesn't exist</block-link>
        <block-link to="/search">Search</block-link>
        <block-link to="/account">Account</block-link>
      </nav>

      <br>
      <h2>Dummy block links</h2>
      <nav class="block-link-wrapper">
        <block-link to="https://google.com" type="external">google.com</block-link>
        <block-link to="https://i.kym-cdn.com/photos/images/newsfeed/000/823/349/06f.gif" type="file">yeee</block-link>
        <block-link to="/nope.zip" type="file">Some external archive</block-link>
        <block-link to="/someunknownfileextension" type="file">another file</block-link>
      </nav>

      <br>
      <h2>Dummy login</h2>
      <header>
        <span v-if="!isLoggedIn"><router-link to="/login">Login</router-link></span>
        <span v-if="!isLoggedIn"><router-link to="/register">Register</router-link></span>
        <span v-if="isLoggedIn"><a @click.prevent="logout">Logout</a></span>
      </header>
      <button class="btn" @click="toggleLogin">{{isLoggedIn ? 'logout' : 'login'}}</button>

      <pre style="overflow: scroll;">{{UA}}</pre>
      
      <p style="margin-top:200px">more height!</p>
    </div>
  </div>
</template>

<script>

import HeroBlockSplit from '@/components/hero/HeroBlockSplit';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import BlockLink from '@/components/navigation/BlockLink';

import {getUAObject} from '@/utils/browserSpecs';

export default {
  name: 'Home',
  components: {
    HeroBlockSplit, 
    Breadcrumbs,
    BlockLink
  },
  data() {
    return {
      UA: getUAObject()
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
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