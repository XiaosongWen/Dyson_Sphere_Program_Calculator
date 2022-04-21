import {Factory, Item, itemMap, AllRecipes} from "../model/Model"
import {Queue} from "./queue";

export const getItem = (id:string) => itemMap.get(id);

export enum ProductionSpeedUnit {
    UNIT_PER_SECOND = "unit/sec",
    UNIT_PER_MINUTE = "unit/min",
    UNIT_PER_HOUR = "unit/hr",
}
export class SelectedItem {
    item: Item;
    speed: number;
    unit: ProductionSpeedUnit;

    constructor(item: Item, speed: number, unit?:ProductionSpeedUnit) {
        this.item = item;
        this.speed = speed;
        this.unit = unit ? unit : ProductionSpeedUnit.UNIT_PER_MINUTE;
    }

}
// export const buildGraph = (items:Item[]) =>{
//     const target = recipeMap.get(items[0].id);
//     const list = [];
// }



export class K_VObject {
    key: string;
    value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}
