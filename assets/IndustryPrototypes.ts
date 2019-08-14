type OneOrMore<T> = T | Array<T>;
type OneOrRange<T> = OneOrMore<T> | { dir: Direction, val: T } 

enum BoolOp {
    And, Or
}

interface BoolExpression<T> {
    op: BoolOp;
    clauses: Array<T | BoolExpression<T>>;
}

type BoolExpressionOrAll<T> = BoolExpression<T> | Array<T>;

export interface Industry {
    name: string;
    description: string;

    // Production
    inputs: OneOrMore<Resource>;
    outputs: OneOrMore<Resource>;

    // Requirements
    /** Natural resources that need to be available for this industry */
    naturalSources: BoolExpressionOrAll<NaturalResource>;
    /** Resources required to construct or expand this industry */
    construction: OneOrMore<Resource>;
    /** Technology/concepts required to develop this industry */
    developmentTech: OneOrMore<Technology>;
    /** Technology/concepts required to maintain this industry */
    maintainenceTech: OneOrMore<Technology>;


    // Incentives for various expansions/subtractions
    /** Incentives to develop or expand this industry */
    incentives?: OneOrMore<Incentive>;
    /** Incentives to abandon this industry, temporarily */
    abandonIncentives?: OneOrMore<Incentive>;
    /** Incentives to scrap this industry, aside from just regaining material */
    scrapIncentives?: OneOrMore<Incentive>;
}

export enum IncentiveType {
    ResourceCondition,
    
}

export interface IncentiveBase {
    type: IncentiveType;
}

export enum Direction {
    Below,
    AtOrBelow,
    Equal,
    AtOrAbove,
    Above
}

export enum FuzzyDirection {
    /** At least a little less than some amount */
    LessThan,
    /** At least as much as a little less than, but not exceeding a bit more */
    About,
    /** Exceeding a bit more than some amount */
    MoreThan
}

/** Amount of something an entity has, relative to some set standard */
export enum FuzzyAmount {
    None, Low, Adequate, Much, Excessive
}

/** What is the fuzzy amount in relation to */
export enum FuzzyRelation {
    /** Fuzzy amount is absolute */
    Absolute,
    /** Fuzzy amount is per capita */
    Capita
}

export interface ResourceConditionIncentive extends IncentiveBase {
    type: IncentiveType.ResourceCondition;
    resources: Array<IncentiveResource>;
}

export type Incentive = ResourceConditionIncentive;

export enum NaturalResource {
    Pond,
    Lake,
    Ocean,
    River
}

export enum TechnologyType {
    ToolUse,
    WoodWorking,
    WaterStorage
}

export interface Technology {
    type: TechnologyType,
    quality: Quality
}

export enum ResourceType {
    Labor,
    Water,
    Wood,
    Food
}

// Should these be split?
// e.g. we can have low, medium, high quality goods
// and manual, engineering, etc quality labor
export enum Quality {
    Any,
    Low,
    Medium,
    High,

    Manual,
    Engineering,
    Supervisory,
    Diplomatic
}

export interface Resource {
    type: ResourceType;
    quality: OneOrRange<Quality>;
    /** kg per capacity hour */
    amount: number;
}

export interface IncentiveResource extends Resource {
    direction: FuzzyDirection;
    condition: FuzzyAmount;
    relatedTo: FuzzyRelation;
}

let prototypes: { [key: string]: Industry } = {
    PondWater: {
        name: "Pond Water Gathering",
        description: "Manually gathered, relatively unclean water.",

        construction: {
            type: ResourceType.Wood,
            quality: Quality.Low,
            amount: 5
        },
        naturalSources: [NaturalResource.Pond],
        inputs: {
            type: ResourceType.Labor,
            quality: Quality.Manual,
            amount: 1
        },
        outputs: {
            type: ResourceType.Water,
            quality: Quality.Low,
            amount: 10
        },

        developmentTech: [
            { type: TechnologyType.ToolUse, quality: Quality.Low },
            { type: TechnologyType.WoodWorking, quality: Quality.Low },
            { type: TechnologyType.WaterStorage, quality: Quality.Low }
        ],
        maintainenceTech: [
            { type: TechnologyType.WaterStorage, quality: Quality.Low }
        ],
        // Incentivized by less than any water reserves, where low is 2 days supply per capita
        incentives: [
            {
                type: IncentiveType.ResourceCondition,
                resources: [
                    {
                        direction: FuzzyDirection.LessThan,
                        condition: FuzzyAmount.Low,
                        quality: Quality.Any,
                        type: ResourceType.Water,
                        amount: 8,
                        relatedTo: FuzzyRelation.Capita
                    }
                ]
            }
        ]
    },

    ShoreFishing: {
        name: "Basic fishing",
        description: "Fishing from the shoreline.",
        inputs: {
            type: ResourceType.Labor,
            quality: Quality.Manual,
            amount: 1
        },
        outputs: {
            type: ResourceType.Food,
            quality: Quality.Low,
            amount: 4
        },
        construction: {
            type: ResourceType.Wood,
            amount: 5,
            quality: Quality.Low
        },
        developmentTech: [
            { type: TechnologyType.ToolUse, quality: Quality.Low },
            { type: TechnologyType.WoodWorking, quality: Quality.Low}
        ],
        maintainenceTech: [],
        naturalSources: { op: BoolOp.Or, clauses: [
            NaturalResource.Pond,
            NaturalResource.River,
            NaturalResource.Lake
        ]}
    }
}

export default prototypes;