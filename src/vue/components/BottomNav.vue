<template>
  <footer>
    <nav>
      <div class="nav-item" :class="{ selected: idx === value }" v-for="(item, idx) in pageNames" v-bind:key="idx" @click="selectPage(idx, item)">{{ item }}</div>
    </nav>
  </footer>
</template>

<style lang="scss" scoped>
  /* Touchscreen */
  @media (hover: none) and (pointer: coarse) {
    footer {
      height: calc(var(--nav-height) / 2);
    }
  }

  /* Desktop */
  @media (hover: hover) and (pointer: fine) {
    footer {
      height: var(--nav-height);
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: var(--rusty);
    height: var(--footer-height);
    box-shadow: 1px -1px 1px var(--accent-transparent);

    nav {
      display: flex;
      flex-direction: row;

      height: 100%;

      .nav-item {
        height: 100%;
        flex: 1 0 80px;
        box-shadow: 1px 0px 1px var(--dark);

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        margin-left: 1px;

        &.selected {
          --start: 4px;
          --stop: 10px;

          background:
            linear-gradient(to right,  var(--sandy), var(--start), transparent, var(--stop), transparent),
            linear-gradient(to left,   var(--sandy), var(--start), transparent, var(--stop), transparent),
            linear-gradient(to top,    var(--sandy), var(--start), transparent, var(--stop), transparent),
            linear-gradient(to bottom, var(--sandy), var(--start), transparent, var(--stop), transparent);
        }
      }
    }
  }
</style>

<script lang="ts">
  import Vue from "vue";
  import { Component, Prop } from "vue-property-decorator";

  @Component({})
  export default class BottomNav extends Vue {
    @Prop({ type: Array, required: true })
    pageNames: Array<string>;

    @Prop({ type: Number, default: 0 })
    value: number;

    selectPage(idx, item) {
      this.$emit('input', idx);
    }
  }
</script>