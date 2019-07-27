<template>
  <router-link :to="to" v-if="type === 'internal'" class="block-link">
    <span class="slot">
      <slot></slot>
    </span>
    <icon-base>
      <icon-arrow-forward />
    </icon-base>
  </router-link>
  <a :href="to" v-else-if="type === 'external'" target="_blank" rel="noopener noreferrer" class="block-link">
    <span class="slot">
      <slot></slot>
    </span>
    <icon-base>
      <icon-open-in-new />
    </icon-base>
  </a>
  <a :href="to" v-else-if="type === 'file'" target="_blank" rel="noopener noreferrer" class="block-link">
    <span class="slot">
      <slot></slot>
    </span>
    <icon-base>
      <component :is="determineFileIcon()" />
    </icon-base>
  </a>
</template>

<script>
import IconBase from '@/components/icons/IconBase'
import IconArrowForward from '@/components/icons/IconArrowForward'
import IconAttachment from '@/components/icons/IconAttachment'
import IconFolder from '@/components/icons/IconFolder'
import IconOpenInNew from '@/components/icons/IconOpenInNew'
import IconImage from '@/components/icons/IconImage'

export default {
  name: 'BlockLink',
  components: {
    IconBase,
    IconArrowForward,
    IconAttachment,
    IconFolder,
    IconOpenInNew,
    IconImage
  },
  props: {
    type: {
      type: String,
      // required: true,
      default: 'internal'
    },
    to: {
      type: [String, Object],
      required: true
    }
  },
  methods: {
    determineFileIcon() {
      const isFolder = this.to.match(/\.(zip|7z|rar)$/i);
      const isImage = this.to.match(/\.(png|jpg|jpeg|gif|)$/i);
      if (isFolder) return IconFolder
      if (isImage) return IconImage
      return IconAttachment
    }
  }
}
</script>