import { System, Entity } from "../../../engine";
import { IndustryComp, InventoryComp, PopulationComp } from "../components";

export default class IndustrySystem extends System {
    protected IsEntityApplicable(entity: Entity): boolean {
        return this.HasComponents(entity, [
            IndustryComp,
            InventoryComp,
            PopulationComp
        ]);
    }    
    
    ProcessEntity(entity: Entity) {
        let industries = entity.getComponent<IndustryComp>(IndustryComp);
    }

    
}