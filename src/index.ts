import Vue from 'vue'
import World from '../engine';
import Settlement from './world/entities/Settlement'
import * as components from './vue'
import { ResourceType, Quality } from 'Assets/IndustryPrototypes';
import { Workbox } from 'workbox-window'

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

console.log('Listening for updates');

let wb = new Workbox('sw.js');
wb.register();
wb.addEventListener('installed', evt => {
    // Hide install button if visible
    let installBtn = document.getElementById('install-btn')
    installBtn.classList.remove('active');

    if (evt.isUpdate) {
        console.log('Updating time?', evt);
        // Show update button, reload on click
        let btn = document.getElementById('update-btn');
        btn.classList.add('active');
        btn.addEventListener('click', () => window.location.reload());
    }
})