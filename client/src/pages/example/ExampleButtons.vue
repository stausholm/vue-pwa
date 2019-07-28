<template>
  <div>
    <div class="container--content">
      <h2>CTA button with icon</h2>
      <cta-button-icon @click.native="test">
        <template slot="text">amazing cta text</template>
        <template slot="icon">
          <icon-base iconName="CTA" width="18" height="18">
            <icon-beach-access />
          </icon-base>
        </template>
      </cta-button-icon>
      
      <br>
      <br>

      <cta-button-icon class="demo-a2hs-wrapper">
        <template slot="text">
          <a2hs-button class="demo-a2hs btn"/>
        </template>
        <template slot="icon">
          <icon-base iconName="CTA" width="18" height="18">
            <icon-a2-h-s />
          </icon-base>
        </template>
      </cta-button-icon>

      <br>
      <br>
      <h2>button classes</h2>
      <br>

      <button class="btn">btn</button>
      <button class="btn btn--secondary">btn btn--secondary</button>
      <button class="btn btn--transparent">btn btn--transparent</button>
      <button class="btn btn--transparent-white">btn btn--transparent-white</button>
      <button class="btn btn--outline">btn btn--outline</button>
      <button class="btn btn--outline-white">btn btn--outline-white</button>
      <button class="btn btn--disabled">btn btn--disabled</button>
      <button class="btn btn--danger">btn btn--danger</button>
      <button class="btn btn--inverted">btn btn--inverted</button>
      <button class="btn btn--large">btn btn--large</button>
      <button class="btn btn--small">btn btn--small</button>
      <button class="btn btn--responsive">btn btn--responsive</button>
    </div>
  </div>
</template>

<script>
import CTAButtonWithIcon from '@/components/buttons/CTAButtonWithIcon';
import IconBase from '@/components/icons/IconBase';
import IconBeachAccess from '@/components/icons/IconBeachAccess';
import IconA2HS from '@/components/icons/IconA2HS';

import {getUAObject} from '@/utils/browserSpecs';

import A2HSButton from '@/components/A2HS/A2HSbutton';

export default {
  name: 'ExampleButtons',
  components: {
    'cta-button-icon': CTAButtonWithIcon,
    IconBase,
    IconBeachAccess,
    IconA2HS,
    'a2hs-button': A2HSButton,
  },
  methods: {
    test() {
      console.log('test .native', getUAObject())
    },
  }
}
</script>

<style lang="scss">
.demo-a2hs {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: left;
  background-color: transparent;

  &-wrapper {
    position: relative;
  }
  svg {
    display: none;
  }
}
</style>
