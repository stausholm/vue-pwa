<template>
  <div class="sign-in-up">
    <div class="container--content container--small">
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
        <span class="divider divider--content-center" role="separator">or</span>
        <div class="input-group">
          <button class="btn-auth" @click="showEmailForm = !showEmailForm">
            <icon-base iconName="Email" iconColor="#fff" width="24" height="24">
              <icon-mail />
            </icon-base>
            Email
          </button>
        </div>

        <form-generator :loading="loading" :schema="schema" v-model="formData" v-if="showEmailForm" @success="login">
          <span v-if="loading">LOADING</span> slot content
        </form-generator>
      </div>

      <p v-if="serverError">{{errorMsg}}</p>
      <p v-if="formSuccess">Form was submitted succesfully</p>
      <p v-if="loading">Loading...</p>

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

import FormGenerator from '@/components/inputs/FormGenerator';

export default {
  name: 'Login',
  components: {
    IconBase, IconLogoGoogle, IconLogoFacebook, IconMail, FormGenerator
  },
  data() {
    return {
      formData: {
        email: "",
        password: ""
      },
      schema: [
        {
          fieldType: 'EmailInput',
          name: 'email',
          label: 'Email Address',
          placeholder: 'johndoe@example.com',
          helper: 'your email is your username',
          //dumb: true,
          //autofocus: true,
          validations: {
            minLength: 20,
            maxLength: {
              value: 30,
              message: 'my custom error message'
            }
          }
        },
        {
          fieldType: 'PasswordInput',
          name: 'password',
          label: 'Password'
        }
      ],
      showEmailForm: false,
      serverError: null,
      errorMsg: null,
      formSuccess: null,
      loading: false
    }
  },
  methods: {
    login() {
      console.log('trying to login')
      this.loading = true;

      this.$store.dispatch('login', this.formData)
      .then(() => {
        this.loading = false;
        this.formSuccess = true;
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
        this.loading = false;
        this.serverError = true;
        this.errorMsg = err.message;
      })
    }
  }
}
</script>