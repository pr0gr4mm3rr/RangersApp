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

@Component
export default class SummaryScreen extends Vue {
    @Prop() settlement!: Settlement;
}
</script>