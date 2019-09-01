import { Component } from "Engine/index";
import IndustryPrototypes from 'Assets/IndustryPrototypes'

interface Industry {
    Capacity: number;
    Workers: number;
}

type IndustryType = keyof typeof IndustryPrototypes;

export default class IndustryComp extends Component {
    Serialize(): any {
        return {
            Industries: this.Industries
        }
    }    
    
    Deserialize(data: any) {
        this.Industries = data.Industries;
    }

    Industries: { [key in IndustryType]?: Industry } = {};

    /**
     * Upgrades an industry and returns the new capacity
     * @param key Industry to upgrade
     * @param amount Additional capacity
     */
    UpgradeIndustry(key: IndustryType, amount: number = 1): number {
        if (amount <= 0)
            throw new Error('Upgrading industry by an invalid amount');
        
        if (!this.Industries.hasOwnProperty(key))
            this.Industries[key] = {
                Capacity: 0,
                Workers: 0
            }

        return this.Industries[key].Capacity += amount;
    }

    /**
     * Downgrades an industry and returns the new capacity
     * @param key Industry to upgrade
     * @param amount Additional capacity
     */
    DowngradeIndustry(key: IndustryType, amount: number = 1) {
        if (amount <= 0)
        throw new Error('Upgrading industry by an invalid amount');
    
        if (!this.Industries.hasOwnProperty(key))
            this.Industries[key] = {
                Capacity: 0,
                Workers: 0
            }

        if (this.Industries[key].Capacity - amount < 0)
            throw new Error('Downgrading industry by more capacity than exists');

        
        return this.Industries[key].Capacity -= amount;
    }
}

IndustryComp.RegisterSelf();