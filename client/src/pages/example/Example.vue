<template>
  <div>
    <div class="container--content">
      <h1>this is example yo</h1>
      <cta-button-icon @click.native="test">
        <template slot="text">amazing cta text</template>
        <template slot="icon">
          <icon-base iconName="CTA" width="18" height="18">
            <icon-beach-access />
          </icon-base>
        </template>
      </cta-button-icon>
      <button @click="testNotification">test notification</button>
      <button @click="testNotification2">test notification warning</button>
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
      <search-bar />
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
    </div>
  </div>
</template>

<script>
import CTAButtonWithIcon from '@/components/buttons/CTAButtonWithIcon';
import IconBase from '@/components/icons/IconBase';
import IconBeachAccess from '@/components/icons/IconBeachAccess';
import SearchBar from '@/components/search/SearchBar';

export default {
  name: 'Example',
  components: {
    'cta-button-icon': CTAButtonWithIcon,
    IconBase,
    IconBeachAccess,
    SearchBar
  },
  methods: {
    testNotification() {
      this.$store.dispatch('changeNotification', {content: 'some content', duration: 2000})
    },
    testNotification2() {
      this.$store.dispatch('changeNotification', {content: 'some warning content that is very long, what will happen now huh', duration: 2000, alert: 'warning'})
    },
    test() {
      console.log('test .native')
    }
  }
}
</script>
