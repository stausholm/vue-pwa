<template>
  <svg 
    :width="width" 
    :height="height"
    role="presentation"
    viewBox="0 0 32 32">
    <title lang="en">File icon</title>
    <g>
      <g :fill="outlineColor">
        <rect fill="none" width="32" height="32"/>
        <polygon :fill="fillColor" points="27.5 31 4.5 31 4.5 1 19.5 1 27.5 9 27.5 31"/>
        <path d="M28,31.5H4V.5H19.71L28,8.79Zm-23-1H27V9.21L19.29,1.5H5Z"/>
        <polygon points="27.5 9.5 19 9.5 19 1 20 1 20 8.5 27.5 8.5 27.5 9.5"/>
        <rect x="7.5" y="14.5" width="17" height="1"/>
        <rect x="7.5" y="26.5" width="17" height="1"/>
        <rect x="7.5" y="23.5" width="17" height="1"/>
        <rect x="7.5" y="20.5" width="17" height="1"/>
        <rect x="7.5" y="17.5" width="17" height="1"/>
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
    }
  }
}
</script>
