<template>
  <a href="#" @click.prevent class="rich-link no-line-height">
    <ul class="avatar-list">
      <li><img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb" alt="User's name" width="100%" /></li>
      <li><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f" alt="User's name" width="100%" /></li>
      <li><img src="https://d3iw72m71ie81c.cloudfront.net/female-17.jpg" alt="User's name" width="100%" /></li>
      <li><img src="https://d3iw72m71ie81c.cloudfront.net/01233bfb-d920-4740-ad7b-5d529a1e6129-Alfian_Tinangon.jpg" alt="User's name" width="100%" /></li>
      <li><img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User's name" width="100%" /></li>
      <li><img src="https://d3iw72m71ie81c.cloudfront.net/female-24.jpeg" alt="User's name" width="100%" /></li>
      <li class="more">+6</li>
    </ul>
  </a>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
.jump-menu .panel {
  .avatar-list {
    list-style-type: none;
    margin-left: 30px;
    padding: 10px;

    li {
      display: inline-block;
      margin-left: -15px;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      overflow: hidden;

      &.more {
        margin-left: 0;
        font-size: 20px;
        line-height: 60px;
        text-align: center;
        width: auto;
      }
    }
  }
}
</style>