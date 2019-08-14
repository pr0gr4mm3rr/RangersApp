import { Entity, Component } from '../../../engine'

export default class UniqueItem extends Entity {
    ComponentDefinitions(): Array<typeof Component> {
        return [];
    }

}