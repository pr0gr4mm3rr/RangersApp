import { Component } from "../../../engine";

interface Industry {
    Name: string;
    
}

export default class IndustryComp extends Component {
    Serialize(): object {
        throw new Error("Method not implemented.");
    }    
    
    Deserialize(data: object) {
        throw new Error("Method not implemented.");
    }

    
}