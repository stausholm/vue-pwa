<template>
  <svg 
    :width="width" 
    :height="height"
    role="presentation"
    viewBox="0 0 32 32">
    <title lang="en">{{label}} file icon</title>
    <g>
      <g :fill="outlineColor">
        <rect fill="none" width="32" height="32"/>
        <polygon :fill="fillColor" points="26.32 10.55 16 10.55 5.68 10.55 1.5 14.62 1.5 17.58 16 17.58 30.5 17.58 30.5 14.62 26.32 10.55"/>
        <path d="M31,18.08H1V14.41l4.47-4.36H26.53L31,14.41Zm-29-1H30V14.83l-3.88-3.78H5.88L2,14.83Z"/>
        <polygon :fill="fillColor" points="27.5 31 4.5 31 4.5 1 19.5 1 27.5 9 27.5 31"/>
        <path d="M28,31.5H4V.5H19.71L28,8.79Zm-23-1H27V9.21L19.29,1.5H5Z"/>
        <polygon points="27.5 9.5 19 9.5 19 1 20 1 20 8.5 27.5 8.5 27.5 9.5"/>
        <rect :fill="fillColor" x="1.5" y="15" width="29" height="12"/>
        <path d="M31,27.5H1v-13H31Zm-29-1H30v-11H2Z"/>
        <text class="file-icon__label" transform="translate(7.65 24)">{{label}}</text>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 32
    },
    height: {
      type: [Number, String],
      default: 32
    },
    fillColor: {
      type: String,
      default: '#ffffff'
    },
    outlineColor: {
      type: String,
      default: 'currentColor'
    },
    label: {
      type: String,
      default: 'file'
    }
  }
}
</script>
