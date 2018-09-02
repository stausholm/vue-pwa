<template>
  <div>
    <div class="container--content">
      <h1>this is example</h1>
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
    </div>
  </div>
</template>

<script>
import CTAButtonWithIcon from '@/components/buttons/CTAButtonWithIcon';
import IconBase from '@/components/icons/IconBase';
import IconBeachAccess from '@/components/icons/IconBeachAccess';

export default {
  name: 'Example',
  components: {
    'cta-button-icon': CTAButtonWithIcon,
    IconBase,
    IconBeachAccess
  },
  methods: {
    testNotification() {
      this.$store.dispatch('changeNotification', {content: 'some content', duration: 2000})
    },
    testNotification2() {
      this.$store.dispatch('changeNotification', {content: 'some warning content', duration: 2000, alert: 'warning'})
    },
    test() {
      console.log('test')
    }
  }
}
</script>
