<template>
  <div class="screen-container" ref="container">
    <div v-for="(item, idx) in children" v-bind:key="item.id" class="screen" ref="screens">
      <vnodes :vnodes="item" :data-foo="idx" />
      <!-- <component v-bind:is="item" @name="onPageName(idx, event)" /> -->
    </div>
    
    <bottom-nav v-model="pageIdx" :pageNames="pageNames"></bottom-nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { default as BottomNav } from './BottomNav.vue'
import { debounce } from '../vutil'

@Component({
  components: { BottomNav }
})
export default class SwipePageContainer extends Vue {
  mounted() {
    this.$watch('pageIdx', (idx) => {
      let el = this.$refs.screens[idx];
      console.log(el);
      el.scrollIntoView({ behavior: 'smooth' });
    });

    this.scrollListener = debounce(this.watchScroll, 60, false);

    (this.$refs.container as HTMLElement).addEventListener('scroll', this.scrollListener);
  }

  destroyed() {
    (this.$refs.container as HTMLElement).removeEventListener('scroll', this.scrollListener);
  }

  scrollListener: (this: HTMLElement, event: Event) => any;

  watchScroll(event) {
    let x = event.target.scrollLeft;
    let page = Math.floor(x / (this.$refs.container as HTMLElement).clientWidth);
    
    this.pageIdx = page;
  }

  get pageNames(): Array<string> {
    return this.children.map(c => {
      if (c.data.attrs && c.data.attrs['data-nav-name'])
        return c.data.attrs['data-nav-name'];

      return '???';
    });
  }

  get children() {
    return this.$slots.default.filter(s => s.tag);
  }

  pageIdx: number = 0;
}
</script>

<style lang="scss" scoped>
  .screen-container {
    display: flex;
    width: 100vw;
    height: 100%;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    .screen {
      flex: 0 0 100vw;
      max-height: calc(100% - var(--footer-height));

      scroll-snap-align: start;
    }
  }
</style>