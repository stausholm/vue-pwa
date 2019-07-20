<template>
  <div class="sign-in-up">
    <hero-block>
      Some full width hero content here
    </hero-block>
    <div class="container--content">
      <h1>Register</h1>
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
            <icon-base iconName="Email" iconColor="#000" width="24" height="24">
              <icon-mail />
            </icon-base>
            Email
          </button>
        </div>

        <form @submit.prevent="register" v-if="showEmailForm">
          <text-input v-model="name" name="name" label="Name" :dumb="true" :autofocus="true"/>

          <email-input v-model="email" name="email" label="Email Address" />
          
          <password-input v-model="password" name="password" label="Password" />

          <confirm-input v-model="email_confirmation" name="confirm" label="Confirm Email" match="email" type="email" matchMessage="please make sure that both emails match"/>

          <div class="input-group">
              <button type="submit" class="btn">Register</button>
          </div>
        </form>
      </div>
      <router-link to="/login" class="link-other-form">Login to existing account</router-link>

      <p class="footnote">Your privacy is important to us. We handle all data with great care, and use the information you provide, to enhance and personalize your experience.
        <br>
        By signing up you agree to our <router-link to="/tos">Terms of Service</router-link>
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
import TextInput from '@/components/inputs/TextInput';
import EmailInput from '@/components/inputs/EmailInput';
import PasswordInput from '@/components/inputs/PasswordInput';
import ConfirmInput from '@/components/inputs/ConfirmInput';

export default {
  name: 'Register',
  components: {
    IconBase, IconLogoGoogle, IconLogoFacebook, IconMail, HeroBlock, TextInput, EmailInput, PasswordInput, ConfirmInput
  },
  data() {
    return {
      name : "",
      email : "",
      password : "",
      email_confirmation : "",
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
