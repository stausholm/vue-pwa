<template>
  <div>
    <div>
      <div class="container--content">
        <account-card/>
        <button @click="logout" class="btn btn--responsive btn-logout">Sign out</button>
      </div>
      <div class="container options-container" :class="{'sticky-header': stickyHeaders}">
        <b class="header-small">Settings</b>
        <b class="list-header">Account</b>
        <ul class="options-list">
          <li class="options-list__item" @click="test = !test">
            <div class="description">
              <p class="description__title">Alarm in silent mode</p>
              <p class="description__subtitle">Play alarm even when the phone is in silent mode</p>
            </div>
            <div class="action">
              <switch-input :disabled="false" v-model="test"/>
            </div>
          </li>
          <li class="options-list__item" @click="$router.push('/account/setting1')">
            <div class="description">
              <p class="description__title">Ring duration</p>
              <p class="description__subtitle">Alarm will ring for 5 minutes</p>
            </div>
            <div class="action">
              <icon-base iconName="go to option" width="24" height="24">
                <icon-arrow-right />
              </icon-base>
            </div>
          </li>
          <li class="options-list__item disabled">
            <div class="description">
              <p class="description__title">Snooze duration</p>
              <p class="description__subtitle">Alarm intervals of 10 min, auto-silence after 3 times</p>
            </div>
            <div class="action">
              action 
              <icon-base iconName="go to option" width="24" height="24">
                <icon-arrow-right />
              </icon-base>
            </div>
          </li>
          <li class="options-list__item">
            <div class="description">
              <p class="description__title">Volume buttons function</p>
              <p class="description__subtitle">Set what volume buttons do when an alarm goes off on the lock screen</p>
            </div>
            <div class="action">
              action
              <icon-base iconName="go to option" width="24" height="24">
                <icon-arrow-right />
              </icon-base>
            </div>
          </li>
        </ul>
      </div>
      <div class="container options-container" :class="{'sticky-header': stickyHeaders}">
        <b class="list-header">List header</b>
        <ul class="options-list">
          <list-item subtitle="subtitle" type="check" v-model="test2"></list-item>
          <li class="options-list__item">
            <div class="description">
              <p class="description__title">Option headline</p>
              <p class="description__subtitle">subheader content</p>
            </div>
            <div class="action">
              action
            </div>
          </li>
          <li class="options-list__item">
            <div class="description">
              <p class="description__title">Option headline</p>
              <p class="description__subtitle">subheader content</p>
            </div>
            <div class="action">
              action
            </div>
          </li>
        </ul>
      </div>
      <div class="container options-container" :class="{'sticky-header': stickyHeaders}">
        <b class="list-header">other header</b>
        <ul class="options-list">
          <li class="options-list__item">
            <div class="description">
              <p class="description__title">Option headline</p>
            </div>
            <div class="action">
              action
            </div>
          </li>
          <li class="options-list__item" @click="test2 = !test2">
            <div class="description">
              <p class="description__title">Option headline</p>
              <p class="description__subtitle">subheader content</p>
            </div>
            <div class="action">
              <input type="checkbox" name="" id="" v-model="test2">
            </div>
          </li>
          <li class="options-list__item" @click="showModal = !showModal">
            <div class="description">
              <p class="description__title">Option headline</p>
              <p class="description__subtitle">subheader content</p>
            </div>
            <div class="action">
              action
            </div>
          </li>
        </ul>
      </div>
      <div class="container options-container" :class="{'sticky-header': stickyHeaders}">
        <b class="list-header">Data</b>
        <ul class="options-list">
          <list-item title="Delete my data" subtitle="Remove all locally stored content" type="arrow" @click.native="$router.push('/account/delete')"></list-item>
        </ul>
      </div>
      <div class="container options-container" :class="{'sticky-header': stickyHeaders}">
        <b class="list-header">Application</b>
        <ul class="options-list">
          <list-item title="Darkmode" type="switch" :value="localSettings.darkmode" @update="toggleDarkmode" @keyup.enter.native="toggleDarkmode" @click.native="toggleDarkmode"></list-item>
          <list-item title="Image saturation" subtitle="Adjust the vibrance of colors in images" type="arrow" :actionLabel="imageSaturationLabel" @keyup.enter.native="showSaturationModal = true" @click.native="showSaturationModal = true"></list-item>
          <list-item title="Prefer reduced motion" subtitle="Disable/enable app animations" type="switch" :value="localSettings.preferReducedMotion" @update="toggleAnimations" @keyup.enter.native="toggleAnimations" @click.native="toggleAnimations"></list-item>
          <list-item title="Changelog" subtitle="See what's new" type="arrow" @keyup.enter.native="todo" @click.native="todo"></list-item>
          <list-item title="Send Feedback" type="arrow" @keyup.enter.native="todo" @click.native="todo"></list-item>
          <list-item title="About" type="arrow" @keyup.enter.native="$router.push('/account/about')" @click.native="$router.push('/account/about')"></list-item>
        </ul>
      </div>
    </div>
    <modal-advanced 
      v-if="showSaturationModal" 
      @close="closeSaturationModal"
      @accept="updateImageSaturationValue"
      confirmLabel="Save" >
      <p>Adjusting the saturation of images can make them easier on the eye. This can work great in combination with darkmode enabled</p>
      <div class="image-saturation-demo">
        <div class="img-wrapper">
          <img src="/test.png" style="filter: grayscale(0)">
          <span>No filters</span>
        </div>
        <div class="img-wrapper">
          <img src="/test.png" :style="`filter: grayscale(${localSaturationValue}%)`">
          <span>{{localSaturationValue}}% Gray</span>
        </div>
      </div>
      <input type="range" min="0" max="100" step="10" v-model="localSaturationValue">
    </modal-advanced>

    <modal-advanced 
      v-if="showModal" 
      @close="showModal = false" 
      header="modal header" 
      confirmLabel="label" 
      :confirmIsDestructive="true">
      <!-- <p>test</p>
      <button @click="showModal = false">more test</button> -->
    </modal-advanced>
  </div>
</template>

<script>
import AccountCard from '@/components/account/AccountCard';
import SwitchInput from '@/components/inputs/SwitchInput';

import IconBase from '@/components/icons/IconBase'
import IconArrowRight from '@/components/icons/IconArrowRight'

import ModalAdvanced from '@/components/modal/ModalAdvanced'

import ListItem from '@/components/list/ListItem'

export default {
  name: 'Account',
  data() {
    return {
      test: true,
      test2: true,
      stickyHeaders: true,
      showModal: false,
      showSaturationModal: false,
      localSaturationValue: this.$store.getters.localSettings.imageSaturation || 0
    }
  },
  components: {
    AccountCard, SwitchInput, IconBase, IconArrowRight, ModalAdvanced, ListItem
  },
  computed: {
    localSettings() {
      return this.$store.getters.localSettings
    },
    siteSettings() {
      return this.$store.getters.sitesettings
    },
    imageSaturationLabel() {
      return this.localSettings.imageSaturation === 0 ? 'Off' : this.localSettings.imageSaturation + '%';
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/');
        })
    },
    todo() {
      console.log('todo')
    },
    toggleDarkmode() { // https://web.dev/prefers-color-scheme/
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      metaThemeColor.setAttribute("content", this.localSettings.darkmode ? this.siteSettings.THEME_COLOR : this.siteSettings.THEME_COLOR_DARK);
      
      this.$store.dispatch('updateLocalSetting', {key: 'darkmode', val: !this.localSettings.darkmode})
    },
    toggleAnimations() {
      this.$store.dispatch('updateLocalSetting', {key: 'preferReducedMotion', val: !this.localSettings.preferReducedMotion})
    },
    updateImageSaturationValue() { // https://medium.com/dev-channel/re-colorization-for-dark-mode-19e2e17b584b
      this.$store.dispatch('updateLocalSetting', {key: 'imageSaturation', val: parseInt(this.localSaturationValue)})
      this.showSaturationModal = false;
    },
    closeSaturationModal() {
      this.showSaturationModal = false;
      this.localSaturationValue = this.localSettings.imageSaturation; // reset local value
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-logout {
  margin-top: 16px;
  padding: 20px;
  text-transform: capitalize;
  font-size: inherit;
  border-radius: 10px;
}
</style>
