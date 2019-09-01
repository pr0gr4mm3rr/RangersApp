<template>
  <nav>
    <div class="nav-item">
      Town
    </div>
    <div class="nav-item">
      Industries
    </div>
    <div class="nav-item">
      People
    </div>
    <div class="nav-item">
      Leaves
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

@Component
export default class SummaryScreen extends Vue {
    
}
</script>