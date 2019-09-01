import { Entity } from ".";

interface ComponentRegistryEntry {
    Name: string;
    Id: number;
    Constructor: typeof Component;
}

let Registry: {[key: string]: ComponentRegistryEntry} = {};
let NextKey = 0;

export interface SerializedComponent {
    Name: string;
    Data: object;
}

export default abstract class Component {

    constructor(private readonly entity: Entity) {
        
    }
    
    abstract Serialize(): any;

    abstract Deserialize(data: any);
    

    //#region Static Methods
    static CreateMask(components: Array<typeof Component>): bigint {
        let mask = 0n;

        for (let comp of components) {
            if (!Registry[comp.name])
                throw new Error(`Component ${comp.name} is not in the registry, did you call .RegisterSelf?`);

            mask = mask | (1n << BigInt(Registry[comp.name].Id));
        }

        return mask;
    }
    
    /**
     * Register a type in the Component type registry.
     * This MUST be called for each Component sub-class,
     * preferably just after definition.
     * @example
     * class FooComponent extends Component {
     *  // Component definition
     * }
     * 
     * FooComponent.RegisterSelf();
     */
    static RegisterSelf() {
        Registry[this.name] = {
            Name: this.name,
            Id: NextKey++,
            Constructor: this
        }
    }
    //#endregion Static Methods
}

// Just a sample implementation
export class EmptyComponent extends Component {
    static get compName() { return 'EmptyComponent'; }
    
    Serialize(): object {
        return {
            // Nothing
        }
    }    
    
    Deserialize(data: object) {
        // Nothing
    }

    
}

EmptyComponent.RegisterSelf();