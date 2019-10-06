<template>
  <article>
    <section class="section-flex">
      <div class="block full">
        <button @keydown.esc.stop>
          <icon-base class="icon">
            <icon-casino />
          </icon-base>
          Home
        </button>
      </div>
      <div class="block third">
        <button class="hover-text">
          <icon-base class="icon">
            <icon-casino />
          </icon-base>
          <span>dashboard</span>
        </button>
      </div>
      <div class="block third">
        <button class="hover-text">
          <icon-base class="icon">
            <icon-casino />
          </icon-base>
          <span>dashboard</span>
        </button>
      </div>
      <div class="block third">
        <button class="hover-text">
          <icon-base class="icon">
            <icon-casino />
          </icon-base>
          <span>dashboard</span>
        </button>
      </div>
    </section>
    <hr>
    <section class="section-flex">
      <div class="block full">
        <h3>
          My pinned stuff
          <button>
            <icon-base class="icon">
              <icon-edit />
            </icon-base>
          </button>
        </h3>
      </div>
      <div class="block full">
        <rich-link text="yoyo"/>
      </div>
      <div class="block full">
        <rich-link text="yoyo" :icon="icon"/>
      </div>
      <div class="block full">
        <rich-link text="yoyo"/>
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
import IconBase from '@/components/icons/IconBase';
import IconCasino from '@/components/icons/IconCasino';
import IconEdit from '@/components/icons/IconEdit';
import RichLink from '../RichLink'

export default {
  name: 'Panel1',
  components: {
    IconBase,
    IconCasino,
    IconEdit,
    RichLink
  },
  data() {
    return {
      icon: IconCasino
    }
  }
}
</script>