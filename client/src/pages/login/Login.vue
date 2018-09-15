<template>
  <div>
    <div class="container--content">
      <h1>Login</h1>
      <div>
        <p class="text-secondary">Continue with</p>
        <div class="input-group">
          <button class="btn-auth btn-auth--google">
            <icon-base iconName="Google" iconColor="#fff" width="24" height="24">
              <icon-logo-google />
            </icon-base>
            Google
          </button>
        </div>
        <div class="input-group">
          <button class="btn-auth btn-auth--facebook">
            <icon-base iconName="Facebook" iconColor="#fff" width="24" height="24">
              <icon-logo-facebook />
            </icon-base>
            Facebook
          </button>
        </div>
        <span class="divider-with-text"><span>or</span></span>
        <div class="input-group">
          <button class="btn-auth" @click="showEmailForm = !showEmailForm">
            <icon-base iconName="Email" iconColor="#fff" width="24" height="24">
              <icon-mail />
            </icon-base>
            Email
          </button>
        </div>

        <form @submit.prevent="login" v-if="showEmailForm">
          <div class="input-group">
            <label for="email" class="input-label">Email Address</label>
            <div class="input-wrapper">
              <input id="email" type="email" v-model="email" required autofocus class="input-item">
            </div>
          </div>

          <div class="input-group">
            <label for="password" class="input-label">Password</label>
            <div class="input-wrapper">
              <input id="password" type="password" v-model="password" required class="input-item">
            </div>
          </div>

          <div class="input-group">
              <button type="submit" class="btn btn--responsive">Login</button>
          </div>
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
import IconMail from '@/components/icons/IconMail';

export default {
  name: 'Login',
  components: {
    IconBase, IconLogoGoogle, IconLogoFacebook, IconMail
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
