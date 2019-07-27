<template>
  <li class="options-list__item" :class="{'disabled': disabled}" tabindex="0">
    <div class="description">
      <p class="description__title">{{title}}</p>
      <p class="description__subtitle">{{subtitle}}</p>
    </div>
    <div class="action">
      {{actionLabel}}
      <icon-base iconName="go to option" width="24" height="24" v-if="type === 'arrow'">
        <icon-arrow-right />
      </icon-base>
      <switch-input :value="value" @input="$emit('update')" :disabled="false" v-else-if="type === 'switch'"/>
      <input :checked="value" type="checkbox" v-else-if="type === 'check'">
      <template v-else>{{type}}</template>
    </div>
  </li>
</template>

<script>
import IconBase from '@/components/icons/IconBase'
import IconArrowRight from '@/components/icons/IconArrowRight'
import SwitchInput from '@/components/inputs/SwitchInput'

export default {
  name: 'ListItem',
  components: {
    IconBase,
    IconArrowRight,
    SwitchInput
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'replace me'
    },
    subtitle: {
      type: String,
      default: ''
    },
    actionLabel: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'action' // arrow | switch | check
    },
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
