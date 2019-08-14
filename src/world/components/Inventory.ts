import { Component, Entity } from "Engine/index";
import { UniqueItem } from 'Game/entities'
import { ResourceType } from "Assets/IndustryPrototypes";

export default class InventoryComp extends Component {
    Serialize(): object {
        return {
            Generics: this.Generics,
            Uniques: Entity.SerializeReference(this.Uniques)
        }
    }

    Deserialize(data: object) {
        throw new Error("Method not implemented.");
    }

    

    public Generics = {...ResourceType};
    public Uniques: Array<UniqueItem>;
}