<template>
    <div>
        <p>Hello there!</p>

        <table>
            <tr v-for="(amount, item) in settlement.inventory.Generics" :key="item">
                <th>{{ item }}</th>
                <td>{{ amount }}</td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Settlement } from 'Game/entities'
import { ResourceType, Quality } from 'Assets/IndustryPrototypes';

@Component({
    
})
export default class SummaryScreen extends Vue {
    @Prop({required: true}) settlement!: Settlement;

    mounted() {
        setInterval(() => {
            this.settlement.inventory.AddItemQuanity(ResourceType.Water, Quality.Low, 1)
        }, 250)
    }
}
</script>