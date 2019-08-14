import { Entity, XMath, Component } from 'Engine/index';
import { InventoryComp, PopulationComp, StaticWorldLocationComp } from 'Game/components';

export default class Settlement extends Entity {
    ComponentDefinitions() {
        return [
            StaticWorldLocationComp,
            InventoryComp,
            PopulationComp
        ];
    }

    get location(): StaticWorldLocationComp { return this.getComponent(StaticWorldLocationComp); }
    get inventory(): InventoryComp { return this.getComponent(InventoryComp); }
    
    Initialize(x: number, y: number) {
        this.location.location = new XMath.Vec2(x, y);
    }
}