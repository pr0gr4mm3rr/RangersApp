<template>
  <div class="page">
    <swipe-page-container>
      <summary-screen class="screen" ref="Town" :settlement="settlement" data-nav-name="Town" />
      <buildings-screen class="screen" ref="Industry" :settlement="settlement" data-nav-name="Industry" />
      <div class="screen" ref="People" data-nav-name="People">People</div>
      <div class="screen" ref="Leave" data-nav-name="Depart">Time to go</div>
    </swipe-page-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

import { SummaryScreen, BuildingsScreen } from './screens'
import { SwipePageContainer, BottomNav } from '../components'
import { Settlement } from '../../world/entities';

@Component({
  components: { SwipePageContainer, SummaryScreen, BuildingsScreen, BottomNav }
})
export default class TownPage extends Vue {

  @Prop({ required: true }) settlement!: Settlement;

  data() {
    return {
      screens: ['Town', 'Industry', 'People', 'Leave'],
      currentScreen: 'Town'
    }
  }

  mounted() {
    this.$watch('currentScreen', (newValue: string, oldValue: string) => {
      let el = this.$refs[newValue] as Element;
      el.scrollIntoView();
    });
  }

}
</script>