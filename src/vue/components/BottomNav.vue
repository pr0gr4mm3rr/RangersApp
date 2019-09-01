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
      Leave
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  nav {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;

    

    .nav-item {
      height: 100%;
      flex: 0 0 80px;
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