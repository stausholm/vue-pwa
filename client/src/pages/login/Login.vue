<template>
  <div>
    <div class="container--content">
      <h1>Login</h1>
      <div>
        <p class="text-secondary">Continue with</p>
        <button class="btn-auth btn-auth--google">
          <icon-base iconName="Google" iconColor="#fff" width="48" height="48">
            <icon-logo-google />
          </icon-base>
          Google
        </button>
        <button class="btn-auth btn-auth--facebook">
          <icon-base iconName="Facebook" iconColor="#fff" width="48" height="48">
            <icon-logo-facebook />
          </icon-base>
          Facebook
        </button>
        <span class="divider-with-text"><span>or</span></span>
        <button class="btn-auth" @click="showEmailForm = !showEmailForm">Email</button>

        <form class="login" @submit.prevent="login" v-if="showEmailForm">
          <label>Email</label>
          <input required v-model="email" type="email" placeholder="Name"/>
          <label>Password</label>
          <input required v-model="password" type="password" placeholder="Password"/>
          <button type="submit">Login</button>
        </form>
      </div>
      <router-link to="/register" class="link-other-form">Register new account</router-link>
      
      <p class="footnote">Your privacy is important to us. We handle all data with great care, and use the information you provide, to enhance and personalize your experience.
        <br>
        <router-link to="/privacy-policy">Read more about how we manage the data you share with us</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconLogoGoogle from '@/components/icons/IconLogoGoogle';
import IconLogoFacebook from '@/components/icons/IconLogoFacebook';

export default {
  name: 'Login',
  components: {
    IconBase, IconLogoGoogle, IconLogoFacebook
  },
  data() {
    return {
      email: "",
      password: "",
      showEmailForm: false
    }
  },
  methods: {
    login() {
      let email = this.email 
      let password = this.password
      this.$store.dispatch('login', { email, password })
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>
.link-other-form {
  display: inline-block;
  margin: 16px 0;
}
</style>
