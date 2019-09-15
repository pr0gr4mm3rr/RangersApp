<template>
  <nav>
    <div class="nav-item" v-for="(item, idx) in pageNames" v-bind:key="idx">
      {{ item }}
    </div>
  </nav>
</template>

<style lang="scss" scoped>

    /* Touchscreen */
    @media (hover: none) and (pointer: coarse) {
      nav {
        height: calc(var(--nav-height) / 2);
      }
    }

    /* Desktop */
    @media (hover: hover) and (pointer: fine) {
      nav {
        height: var(--nav-height);
      }
    }

  nav {
    display: flex;
    flex-direction: row;
    width: 100%;

    

    .nav-item {
      height: 100%;
      flex: 1 0 80px;
      box-shadow: 1px 0px 1px var(--dark);

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  
</style>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  
})
export default class BottomNav extends Vue {
    @Prop({ type: Array, required: true })
    pageNames: Array<string>;
}
</script>