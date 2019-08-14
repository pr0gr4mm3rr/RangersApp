import { Component } from '../../../engine'
import Vec2 from '../../../engine/math/Vec2'

export default class StaticWorldLocationComp extends Component {
    Serialize(): object {
        throw new Error("Method not implemented.");
    }    
    
    Deserialize(data: object) {
        throw new Error("Method not implemented.");
    }

    public location: Vec2;
}

StaticWorldLocationComp.RegisterSelf();