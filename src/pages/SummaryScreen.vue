<template>
    <div>
        <p>Hello there!</p>

        <table>
            <tr>
                <td>{{ settlement.inventory.Generics.Food }}</td>
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