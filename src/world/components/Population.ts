import { Component } from "../../../engine";

interface GeneralPopulation {
    Manual: number;
    Engineers: number;
    Diplomats: number;
    Supervisors: number;
}

export default class PopulationComp extends Component {
    Serialize(): object {
        throw new Error("Method not implemented.");
    }    
    
    Deserialize(data: object) {
        throw new Error("Method not implemented.");
    }

    public GeneralPopulation: GeneralPopulation = {
        Diplomats: 0,
        Engineers: 0,
        Manual: 10,
        Supervisors: 0
    }
}