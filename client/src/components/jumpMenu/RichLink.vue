<template>
  <a href="#" class="rich-link" :class="{'smalltext': smallText}">
    <span class="link-image" v-if="icon">
      <icon-base>
        <component :is="icon"></component>
      </icon-base>
    </span>
    <span class="link-image" v-else>
      {{iconText}}
    </span>
    <p class="link-title" v-if="smallText">
      <span class="caption">{{smallText}}</span>
      <span>{{text}}</span>
    </p>
    <span class="link-title" v-else>{{text}}</span>
  </a>
</template>

<script>
import IconBase from '@/components/icons/IconBase';

export default {
  name: 'RichLink',
  components: {
    IconBase
  },
  props: {
    smallText: {
      type: String
    },
    text: {
      type: String,
      required: true
    },
    icon: {
      type: Object
    },
    iconText: {
      type: String
    }
  }
}
</script>

<style lang="scss">
$btn-bg-color: rgba(0,0,0, .07);
.jump-menu .panel {
  .rich-link {
    padding-left: 0;
    margin-bottom: 2px;

    &.smalltext {
      .link-title {
        display: inline-block;
        font-size: .8em;
      }
    }

    .link-image {
      display: inline-block;
      width: 60px; 
      height: 60px;
      margin: 0 10px 2px 0;
      vertical-align: middle;
      text-align: center;
      background-color: $btn-bg-color;
      
      > .icon {
        line-height: 60px;
      }
    }

    .link-title {
      > * {
        display: block;
        line-height: initial;
        margin: 1px 0;
      }

      .caption {
        color: $btn-bg-color;
      }
    }

    &:hover, 
    &:focus {
      .caption {
        color: rgba(255, 255, 255, .5);
      }
    } 

    &.no-line-height {
      line-height: initial;
    }
  }
}
</style>