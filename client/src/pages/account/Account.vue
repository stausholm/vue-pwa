<template>
  <div>
    <div v-if="isLoggedIn">
      <div class="container--content">
        <account-card/>
        <button @click="logout" class="btn btn--responsive btn-logout">Sign out</button>
      </div>
      <div class="container options-container" :class="{'sticky-header': stickyHeaders}">
        <b class="header-small">Settings</b>
        <b class="list-header">List header</b>
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
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
    </div>
    <div class="container--content" v-else>
      <sign-in-sign-up/>
    </div>
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
import SignInSignUp from '@/components/account/SignInSignUp';
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
      showModal: false
    }
  },
  components: {
    AccountCard, SignInSignUp, SwitchInput, IconBase, IconArrowRight, ModalAdvanced, ListItem
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
          this.$router.push('/');
        })
    },
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
