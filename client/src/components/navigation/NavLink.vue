<template>
  <li class="nav-link" :class="classes">
    <div class="nav-link-header">
      <a v-if="route.action"
        href="" 
        @click.prevent.stop="route.action"
        :title="route.title">{{route.label || route.title}}</a>

      <router-link v-else-if="useRouterLink"
        :to="route.path"
        :target="route.target"
        :rel="rel"
        :title="route.title">{{route.label || route.title}}</router-link>
        
      <a v-else 
        :href="route.path"
        :target="route.path"
        :rel="rel"
        :title="route.title">{{route.label || route.title}}</a>

      <span v-if="route.badge" :class="['nav-link__badge', `nav-link__badge--${route.badge.type || 'default'}`]">{{route.badge.label}}</span>

      <button v-if="route.children" @click="toggleChildren" class="nav-link__expander btn-icon" :class="{'expanded': showChildren}">
        <icon-base>
          <icon-arrow-right />
        </icon-base>
      </button>
    </div>

    <transition name="nav-children" 
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end">
      <ul v-if="route.children && showChildren">
        <li class="nav-link back-button">
          <div class="nav-link-header">
            <a href="" @click.prevent="toggleChildren">Back</a>
          </div>
        </li>
        <li class="nav-link parent-link">
          <div class="nav-link-header">
            <a v-if="route.action"
              href="" 
              @click.prevent.stop="route.action"
              :title="route.title">{{route.label || route.title}}</a>

            <router-link v-else-if="useRouterLink"
              :to="route.path"
              :target="route.target"
              :rel="rel"
              :title="route.title">{{route.label || route.title}}</router-link>
              
            <a v-else 
              :href="route.path"
              :target="route.path"
              :rel="rel"
              :title="route.title">{{route.label || route.title}}</a>
          </div>
        </li>
        <navlink @toggleChildren="handleEmit" v-for="child in route.children" :key="child.label" :useRouterLink="useRouterLink" :route="child" :depth="depth + 1" :expandAllChildren="expandAllChildren"/>
      </ul>
    </transition>
  </li>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconArrowRight from '@/components/icons/IconArrowRight';

export default {
  name: 'navlink',
  components: {
    IconBase,
    IconArrowRight
  },
  props: {
    depth: {
      type: Number
    },
    useRouterLink: {
      type: Boolean,
      default: true
    },
    expandAllChildren: {
      type: Boolean,
      default: false
    },
    route: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showChildren: this.expandAllChildren
    }
  },
  computed: {
    rel() {
      if (this.route.useSecureTargetBlank === false && this.route.target === '_blank') {
        return this.route.rel;
      } else if (this.route.target === '_blank') {
        return this.$route.rel ? this.route.rel + ' noopener noreferrer' : 'noopener noreferrer';
      }

      return this.route.rel;
    },
    classes() {
      return {
        'has-children': this.route.children && this.route.children.length > 0,
        'children-visible': this.showChildren,
        [this.route.class]: this.route.class,
        ['nav-link--depth-' + this.depth]: true
      }
    }
  },
  methods: {
    toggleChildren() {
      if (this.expandAllChildren) {
        this.showChildren = true;
        return;
      }
      this.showChildren = !this.showChildren;

      this.$emit('toggleChildren', this.showChildren, this.$el)
    },
    handleEmit(val, el) {
      if (val) {
        el.parentNode.classList.add('test2')
      } else {
        el.parentNode.classList.remove('test2')
      }
    },
    start(el) {
      console.log(el)
      el.style.height = `${el.scrollHeight}px`
    },
    end(el) {
      console.log(el)
      el.style.height = ''
    }
  }
}
</script>
