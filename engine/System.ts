import Entity from './Entity'
import Component from './Component';

export default abstract class System {

    //#region Registration

    private entities: Array<Entity> = [];

    /**
     * Registers the provided entity with this system,
     * if this system can process it
     * @param entity Entity to add
     */
    TestAndRegisterEntity(entity: Entity) {
        if (this.IsEntityApplicable(entity))
            this.entities.push(entity);
    }

    /**
     * Given an entity, should this system process it?
     * @param entity Entity to test
     */
    protected abstract IsEntityApplicable(entity: Entity): boolean;

    /**
     * Test an entity to check if it contains all of the specified components
     * @param entity Entity to test
     * @param components Components the entity must have
     */
    protected HasComponents(entity: Entity, components: Array<typeof Component>): boolean {
        let mask: bigint = Component.CreateMask(components);

        return (entity.ComponentMask & mask) === mask;
    }

    //#endregion Registration

    //#region Processing

    /**
     * Perform one tick of processing
     */
    public Process() {
        this.BeforeProcessStart();

        for (let entity of this.entities)
            this.ProcessEntity(entity);

        this.AfterProcessFinish();
    }

    /**
     * Called before processing of entities begins, overridable
     */
    protected BeforeProcessStart() { }

    /**
     * Called after processing of entities is complete, overridable
     */
    protected AfterProcessFinish() { }

    /**
     * Process a registered entity, called for each
     * registered entity as part of the Process stage
     * @param entity Entity to process
     */
    abstract ProcessEntity(entity: Entity);

    //#endregion Processing
}