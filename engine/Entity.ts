import Component, { SerializedComponent, EmptyComponent } from "./Component";
import World from "./World";

export interface SerializedEntity {
    Id: number;
    TypeName: string;
    Components: { [ComponentName: string]: SerializedComponent }
}

export default abstract class Entity {
    constructor(
        protected readonly world: World
    ) {
        this.componentDefinitions = this.ComponentDefinitions();
        this.ComponentMask = Component.CreateMask(this.componentDefinitions);

        this.Id = world.NextEntityId();

        this.Components = {};
        for (let def of this.componentDefinitions) {
            // XXX should there be a way to do this?
            // Can't simply assume def is a child-class that we can see
            this.Components[def.name] = new (def as any)(this);
        }
    }

    // Overridable, args needed for ambiguity in World.ts
    Initialize(...args: Array<any>) {

    }

    getComponent<T extends Component>(def: typeof Component): T {
        return this.Components[def.name] as T;
    }

    private componentDefinitions: Array<typeof Component>;
    abstract ComponentDefinitions(): Array<typeof Component>;

    public readonly ComponentMask: bigint;
    public readonly Components: { [ComponentName: string]: Component }
    public readonly Id: number;

    Serialize(): SerializedEntity {
        let Components: { [ComponentName: string]: SerializedComponent } = {};

        for (let Name in this.Components) {
            Components[Name] = {
                Name,
                Data: this.Components[Name].Serialize()
            }
        }

        return {
            Id: this.Id,
            TypeName: this.constructor.name,
            Components
        }
    }

    static SerializeReference(entity: Entity | Array<Entity>): number | Array<number> {
        if (entity instanceof Array)
            return entity.map(e => e.Id);
        else
            return entity.Id;
    }
}

export class EmptyEntity extends Entity {
    ComponentDefinitions(): Array<typeof Component> {
        return [EmptyComponent];
    }    

    get empty(): EmptyComponent { return this.getComponent(EmptyComponent); }
}