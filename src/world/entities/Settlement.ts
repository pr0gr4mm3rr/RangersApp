import { Entity, XMath, Component } from 'Engine/index';
import { InventoryComp, PopulationComp, StaticWorldLocationComp, IndustryComp } from 'Game/components';

export default class Settlement extends Entity {
    ComponentDefinitions() {
        return [
            StaticWorldLocationComp,
            InventoryComp,
            PopulationComp,
            IndustryComp
        ];
    }

    get location(): StaticWorldLocationComp { return this.getComponent(StaticWorldLocationComp); }
    get inventory(): InventoryComp { return this.getComponent(InventoryComp); }
    get industry(): IndustryComp { return this.getComponent(IndustryComp); }
    
    Initialize(x: number, y: number) {
        this.location.location = new XMath.Vec2(x, y);
    }
}