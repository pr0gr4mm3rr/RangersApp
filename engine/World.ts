import { System, Entity } from ".";

interface Constructor<T> {
    new(...args): T;
}

export default class World {
    constructor() {

    }

    private Systems: Array<System> = [];

    private Entities: Array<Entity> = [];
    private EntityIdSequence: number = 0;
    public NextEntityId(): number {
        return this.EntityIdSequence++;
    }

    CreateEntity<T extends Entity>(type: Constructor<T>, ...args: Parameters<T["Initialize"]>): T {
        let entity = new type(this);

        entity.Initialize(...args);
        this.Entities.push(entity);

        return entity;
    }

    RegisterSystem<T extends System>(type: Constructor<T>) {
        if (this.Systems.some(s => s instanceof type))
            throw new Error('Duplicate system registered: ' + type.name);

        this.Systems.push(new type());
    }
}