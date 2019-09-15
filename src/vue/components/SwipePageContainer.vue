<template>
  <div class="screen-container">
    <div v-for="(item, idx) in children" v-bind:key="item.id" class="screen">
      <vnodes :vnodes="item" :data-foo="idx" />
      <!-- <component v-bind:is="item" @name="onPageName(idx, event)" /> -->
    </div>
    <footer>
      <bottom-nav v-model="pageIdx" :pageNames="pageNames"></bottom-nav>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { default as BottomNav } from './BottomNav.vue'

@Component({
  components: { BottomNav }
})
export default class SwipePageContainer extends Vue {

  created() {
    
  }

  mounted() {
    
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
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    .screen {
      flex: 0 0 100vw;
      min-height: 100%;

      scroll-snap-align: start;
    }
  }
</style>