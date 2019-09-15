import { Component, Entity } from "Engine/index";
import { UniqueItem } from 'Game/entities'
import { ResourceType, Resource, Quality } from "Assets/IndustryPrototypes";
import Vue from "vue";

// Regretably this must be separate, otherwise they are all readonly
type GenericKey = keyof typeof ResourceType;
type QualityKey = keyof typeof Quality;
type GenericDictionary = {[item in GenericKey]?: {[quality in QualityKey]?: number}}

export default class InventoryComp extends Component {
    constructor(entity: Entity) {
        super(entity);
    }
    
    Serialize(): object {
        return {
            Generics: this.Generics,
            Uniques: Entity.SerializeReference(this.Uniques)
        }
    }

    Deserialize(data: object) {
        throw new Error("Method not implemented.");
    }

    GetItemQuantity(item: ResourceType, quality: Quality): number {
        let itemKey = ResourceType[item];
        let qualityKey = Quality[quality];

        if (!this.Generics.hasOwnProperty(itemKey))
            return 0;

        if (!this.Generics[itemKey].hasOwnProperty(qualityKey))
            return 0;

        return this.Generics[itemKey][qualityKey];
    }

    /**
     * Sets the specified quanity of the specified item/quality in this inventory
     * @param item Item Type to update
     * @param quality Item Quality to update
     * @param value New item amount
     */
    SetItemQuantity(item: ResourceType, quality: Quality, value: number) {
        let itemKey = ResourceType[item];
        let qualityKey = Quality[quality];

        if (!this.Generics.hasOwnProperty(itemKey)) {
            Vue.set(this.Generics, itemKey, {});
        }

        if (value < 0)
            throw new Error('Tried setting a negative amount in an inventory');

        Vue.set(this.Generics[itemKey], qualityKey, value);
    }

    /**
     * Adds the specified quantity of the specified item/quality to this inventory
     * @param item Item Type to add
     * @param quality Item Quality
     * @param value Amount to add, may be negative to remove
     */
    AddItemQuanity(item: ResourceType, quality: Quality, value: number) {
        let itemKey = ResourceType[item];
        let qualityKey = Quality[quality];

        if (!this.Generics.hasOwnProperty(itemKey))
            Vue.set(this.Generics, itemKey, {});

        if (!this.Generics[itemKey].hasOwnProperty(qualityKey))
        Vue.set(this.Generics[itemKey], qualityKey, 0);

        // Do not allow negative amounts
        if (this.Generics[itemKey][qualityKey] + value < 0)
            throw new Error('Tried removing too much of an item from an inventory')

        this.Generics[itemKey][qualityKey] += value;
    }

    private Generics: GenericDictionary = {};
    public Uniques: Array<UniqueItem> = [];
}

InventoryComp.RegisterSelf();