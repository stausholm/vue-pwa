<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
      <span><router-link to="/">Home</router-link></span>
      <span><router-link to="/example">Example</router-link></span>
      <span><router-link to="/exampleWithAuth">Example auth</router-link></span>
      <span><router-link to="/exampleWithAuthRole">Example auth role</router-link></span>
      <span v-if="!isLoggedIn"><router-link to="/login">Login</router-link></span>
      <span v-if="!isLoggedIn"><router-link to="/register">Register</router-link></span>
      <span v-if="isLoggedIn"><a @click.prevent="logout">Logout</a></span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
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
    }
  },
  created() {
    // handle expired token
    this.$http.interceptors.response.use(undefined, function (err) { // intercept axios to see if we get 401 Unauthorized. If so, token has expired and dispatch "logout" action
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });


    fetch('http://localhost:3000/auth/bean')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  min-height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: inline-block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
  a {
    color: inherit;
    margin: 0 10px;
  }
}
</style>
