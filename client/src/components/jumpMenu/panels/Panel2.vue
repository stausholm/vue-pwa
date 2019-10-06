<template>
  <article>
    <section class="section-flex">
      <h2 class="panel-title">some people</h2>
    </section>
    <section class="section-flex">
      <div class="block full">
        <h3>people</h3>
      </div>
      <div class="block full">
        <avatar-list />
      </div>
      <div class="block full">
        <a href="#">et link</a>
      </div>
    </section>
    <hr>
    <section class="section-flex">
      <div class="block full">
        <h3>more people</h3>
      </div>
      <div class="block full">
        <avatar-list />
      </div>
      <div class="block full">
        <a href="#">endnu et link</a>
      </div>
    </section>
    <hr>
    <section class="section-flex">
      <div class="block full">
        <h3>about me</h3>
      </div>
      <div class="block full">
        <rich-link text="yoyo" smallText="small yoyo" iconText="32+"/>
      </div>
      <div class="block full">
        <rich-link text="yoyo"/>
      </div>
    </section>
  </article>
</template>

<script>
import AvatarList from '../AvatarList'
import RichLink from '../RichLink'

export default {
  name: 'Panel2',
  components: {
    AvatarList,
    RichLink
  }
}
</script>