<template>
  <div>
    <hero-block class="route-title-container">
      Some full width hero content here
    </hero-block>
    <div class="container--content">
      <h1>Register</h1>
      <div>
        <p class="text-secondary">Continue with</p>
        <button class="btn-auth btn-auth--google">
          <icon-base iconName="Google" iconColor="#fff" width="24" height="24">
            <icon-logo-google />
          </icon-base>
          Google
        </button>
        <button class="btn-auth btn-auth--facebook">
          <icon-base iconName="Facebook" iconColor="#fff" width="24" height="24">
            <icon-logo-facebook />
          </icon-base>
          Facebook
        </button>
        <span class="divider-with-text"><span>or</span></span>
        <button class="btn-auth" @click="showEmailForm = !showEmailForm">
          <icon-base iconName="Email" iconColor="#fff" width="24" height="24">
            <icon-mail />
          </icon-base>
          Email
        </button>

        <form @submit.prevent="register" v-if="showEmailForm">
          <label for="name">Name</label>
          <div>
              <input id="name" type="text" v-model="name" required autofocus>
          </div>

          <label for="email" >E-Mail Address</label>
          <div>
              <input id="email" type="email" v-model="email" required>
          </div>

          <label for="password">Password</label>
          <div>
              <input id="password" type="password" v-model="password" required>
          </div>

          <label for="password-confirm">Confirm Password</label>
          <div>
              <input id="password-confirm" type="password" v-model="password_confirmation" required>
          </div>

          <div>
              <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <router-link to="/login" class="link-other-form">Login to existing account</router-link>

      <p class="footnote">Your privacy is important to us. We handle all data with great care, and use the information you provide, to enhance and personalize your experience.
        <br>
        <router-link to="/privacy-policy">Read more about how we manage the data you share with us</router-link>
      </p>
    </div>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconLogoGoogle from '@/components/icons/IconLogoGoogle';
import IconLogoFacebook from '@/components/icons/IconLogoFacebook';
import IconMail from '@/components/icons/IconMail';

import HeroBlock from '@/components/hero/HeroBlock';

export default {
  name: 'Register',
  components: {
    IconBase, IconLogoGoogle, IconLogoFacebook, IconMail, HeroBlock
  },
  data() {
    return {
      name : "",
      email : "",
      password : "",
      password_confirmation : "",
      is_admin : null,
      showEmailForm: false
    }
  },
  methods: {
    register() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      }
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
