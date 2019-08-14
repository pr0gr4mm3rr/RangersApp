import { Entity, Component } from "../../../engine";

export default class Person extends Entity {
    ComponentDefinitions(): Array<typeof Component> {
        throw new Error("Method not implemented.");
    }
    
}