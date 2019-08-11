import World from './world/World';

addEventListener('load', () => {
    document.body.classList.remove('loading');

    let world = window['world'] = new World();
})

