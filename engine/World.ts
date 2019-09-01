import { System, Entity } from ".";

interface SomeConstructor<T extends Entity | System> {
    new(...args): T;
}

export default class World {
    constructor() {

    }

    private Systems: Array<System> = [];

    private EntityIdSequence: number = 0;
    public NextEntityId(): number {
        return this.EntityIdSequence++;
    }

    CreateEntity<T extends Entity>(type: SomeConstructor<T>, ...args: Parameters<T["Initialize"]>): T {
        // XXX we shouldn't have to do this?
        let entity = new type(this);

        entity.Initialize(...args);

        return entity;
    }

    RegisterSystem<T extends System>(type: SomeConstructor<T>) {
        if (this.Systems.some(s => s instanceof type))
            throw new Error('Duplicate system registered: ' + type.name);

        this.Systems.push(new type());
    }
}