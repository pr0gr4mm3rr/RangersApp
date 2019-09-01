import Vue from 'vue'
import World from '../engine';
import Component, {EmptyComponent} from '../engine/Component'
import Entity, { EmptyEntity } from '../engine/Entity'
import System from '../engine/System'
import Settlement from './world/entities/Settlement'
import * as components from './pages'
import { ResourceType, Quality } from 'Assets/IndustryPrototypes';

addEventListener('load', () => {
    console.log('Here we go');
    document.body.classList.remove('loading');

    let world = window['world'] = new World();
    let someTown = window['ent'] = world.CreateEntity(Settlement, 0, 0);
    someTown.inventory.SetItemQuantity(ResourceType.Food, Quality.Low, 42);

    let vue = window['vue'] = new Vue({
        el: '#app',
        components,
        data() { return {
            summary: {
                loading: false,
                settlement: someTown
            },
            buildings: {
                loading: false
            }
        }}
    })
    console.log('done with stuff');
})

