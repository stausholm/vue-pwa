<template>
  <div>
    <div class="container--content">
      <div class="input-group" style="text-align:center; margin-bottom: 50px;">
        <icon-base iconName="give feedback" width="200" height="200">
          <icon-beach-access />
        </icon-base>
        <h1>Give Feedback</h1>
        <p>
          Help improve {{appName}} by leaving your suggestions on how we can improve.
        </p>
      </div>
      <form @submit.prevent="submitForm">
        <select-list 
          v-model="formContent.feedbackType" 
          name="feedbackType" 
          label="Feedback Type" 
          :options="feedbackOptions"/>

        <email-input v-model="formContent.email" name="email" label="Email Address" :required="false" :validations="{email:true}"/>
        
        <br>
        <br>
        <div class="input-group">
          <p v-if="formContent.feedbackType ==='suggestion'">In short, describe the feature you believe would fit well into {{appName}}</p>
          <p v-if="formContent.feedbackType ==='error'">In short, describe the error you're having with {{appName}}</p>
        </div>
        <text-area v-model="formContent.comment" name="comment" label="Your comment" :validations="{minLength: 20, maxLength: {value: 300, message: 'Please keep feedback below 300 characters'}}"/>

        <div class="input-group">
          <button class="btn btn--responsive">Send Feedback</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import EmailInput from '@/components/inputs/EmailInput';
import TextArea from '@/components/inputs/TextArea';
import SelectList from '@/components/inputs/SelectList';

import IconBase from '@/components/icons/IconBase'
import IconBeachAccess from '@/components/icons/IconBeachAccess'

import {getUAObject} from '@/utils/browserSpecs';

export default {
  name: 'Feedback',
  components: {
    EmailInput,
    TextArea,
    SelectList,
    IconBase,
    IconBeachAccess
  },
  data() {
    return {
      formContent: {
        feedbackType: 'appraisal',
        email: '',
        comment: ''
      },
      feedbackOptions: [
        { label: "Appraisal", value: "appraisal"}, 
        { label: "Suggestion", value: "suggestion"}, 
        { label: "Error", value: "error"}, 
        { label: "Other", value: "other"}
      ]
    }
  },
  computed: {
    appName() {
      return this.$store.getters.sitesettings.APPNAME
    },
    appVersion() {
      return this.$store.getters.sitesettings.APP_VERSION
    },
    showPWAButton() {
      return this.$store.getters.showPWAButton
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    localSettings() {
      return this.$store.getters.localSettings
    },
    userRole() {
      return this.$store.getters.userRole
    },
    authStatus() {
      return this.$store.getters.authStatus
    },
  },
  methods: {
    submitForm() {
      const formBody = {
        formContent: this.formContent,
        appInfo: {
          version: this.appVersion,
          launchedAsPWA: !this.showPWAButton,
          localSettings: this.localSettings
        },
        userInfo: {
          UA: getUAObject(),
          isLoggedIn: this.isLoggedIn,
          userRole: this.userRole,
          authStatus: this.authStatus
        },
        localStorageDump: {...window.localStorage},
        cookieDump: document.cookie
      }
      console.log('todoooo', formBody)
    }
  }
}
</script>
