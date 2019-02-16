<template>
  <div>
    <div class="container--content icons">
      <div v-for="(icon, index) in iconNames" :key="icon" class="icon-container">
        <span>{{icon}}</span>
        <icon-base :iconName="icon">
          <component :is="iconComponents[index]"></component>
        </icon-base>
      </div>
    </div>
  </div>
</template>

<script>
import icons from '../../components/icons'
import IconBase from '../../components/icons/IconBase.vue'
export default {
  name: 'ExampleIcons',
  components: {
    IconBase
  },
  computed: {
    iconNames() {
      return Object.keys(icons)
    },
    iconComponents() {
      return Object.values(icons)
    }
  }

}
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  flex-wrap: wrap;

  .icon-container {
    width: calc(25% - 16px);
    height: 100px;
    background-color: lightgray;
    margin: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;

    @media screen and (max-width: 760px) {
      width: 100%;
      margin: 8px 0;
    }
  }
}
</style>
