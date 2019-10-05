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

      <a2hs-button class="a2hs-demo">
        <cta-button-icon @click.native="test">
          <template slot="text">add to home screen</template>
          <template slot="icon">
            <icon-base iconName="CTA" width="18" height="18">
              <icon-a2-h-s />
            </icon-base>
          </template>
        </cta-button-icon>
      </a2hs-button>

      <br>
      <br>
      <a href="https://developers.google.com/web/fundamentals/app-install-banners/promoting-install-mobile">https://developers.google.com/web/fundamentals/app-install-banners/promoting-install-mobile</a>
      <br>
      <br>

      <transition name="slide-up">
        <a2hs-button tag="div" class="a2hs-demo2" v-if="showDemo">
          <div class="text">
            <img src="test.png" alt="">
            <div>
              <b>Learn about that thing sooner!</b>
              <p>Our app is fast, small, and works offline.</p>
            </div>
          </div>
          <div class="buttons">
            <button class="btn btn--transparent-white" @click.stop="showDemo = false">Not now</button>
            <button class="btn btn--inverted">Install</button>
          </div>
        </a2hs-button>
      </transition>

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

      <br>
      <br>
      <h2>ContextMenuButton</h2>
      <p>opens out in a direction depending on which quarter of the viewport, the button was clicked on</p>
      <br>
      <p>The first card opens as a bottom sheet on mobile</p>
      <br>
      <div class="demo-context-menu">
        <div class="demo-card card">
          <context-menu-button class="btn-icon" :actions="contextMenuActions" :mobileBottomSheet="true" @crap="handleCrap"/>
        </div>
        <div class="demo-card card">
          <context-menu-button class="btn-icon" :actions="contextMenuActions" @crap="handleCrap"/>
        </div>
        <div class="demo-card card">
          <context-menu-button class="btn-icon" :actions="contextMenuActions" @crap="handleCrap"/>
        </div>
        <div class="demo-card card">
          <context-menu-button class="btn-icon" :actions="contextMenuActions" @crap="handleCrap"/>
        </div>
      </div>
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

import ContextMenuButton from '@/components/contextMenu/ContextMenuButton'

export default {
  name: 'ExampleButtons',
  components: {
    'cta-button-icon': CTAButtonWithIcon,
    IconBase,
    IconBeachAccess,
    IconA2HS,
    'a2hs-button': A2HSButton,
    ContextMenuButton
  },
  data() {
    return {
      showDemo: true,
      contextMenuActions: [
        {
          label: 'test1',
          emit: 'crap'
        },
        {
          label: 'test2'
        },
        {
          label: 'test3'
        },
      ]
    }
  },
  methods: {
    test() {
      console.log('test .native', getUAObject())
    },
    handleCrap() {
      console.log('crap handled')
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/base/variables";

.a2hs-demo {
  border: 0;
  outline: 0;
  background: transparent;
}

.a2hs-demo2 {
  padding: 16px;
  background: #007bff;
  color: rgb(250,250,250);
  cursor: pointer;
  border-radius: 8px;
  
  .text {
    display: flex;
    font-size: 1.2rem;

    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 16px;
      border: 3px solid #fff;
    }
    p {
      opacity: .8;
      margin-bottom: 20px;
      font-size: 1.1rem;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
}

.demo-context-menu {
  height: 80vh;
  margin-bottom: 100vh;
  position: relative;

  .demo-card {
    position: absolute;
    &:nth-child(1) {
      top: 0;
      left: 0;
    }
    &:nth-child(2) {
      top: 0;
      right: 0;
    }
    &:nth-child(3) {
      bottom: 0;
      left: 0;
    }
    &:nth-child(4) {
      bottom: 0;
      right: 0;
    }
  }
}
</style>
