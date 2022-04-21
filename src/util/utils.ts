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

export class TreeNode {
    readonly item: Item;
    readonly children: TreeNode[] = [];
    quantity: number = 0;
    factory: Factory;
    factory_n: number = 0;
    constructor(item: Item) {
        this.item = item;
    }
}


export const buildTree = (items:SelectedItem[]) => {
        const item = items[0];
        const node = new TreeNode(item.item);
        node.quantity = item.speed;
        const queue: Queue<TreeNode> = new Queue<TreeNode>();
        queue.enqueue(node);
        while (!queue.isEmpty) {
            const cur = queue.dequeue()!;
            if (cur.item.category !== "Raw Material") {
                const recipe = AllRecipes.filter((r) => {
                    let produceTarget = false;
                    r.out.forEach((n, item) => {
                        if (item.id === cur.item.id) {
                            produceTarget = true;
                        }
                    });
                    return produceTarget;
                })[0];
                cur.factory = recipe.producers[0];
                cur.factory_n = cur.quantity / (60 / recipe.time);
                let output = 1;
                recipe.out.forEach((n, item) => {
                    if (item.id === cur.item.id) {
                        output = n;
                    }
                })
                if (recipe.in) {
                    recipe.in.forEach((input, item) => {
                        const c = new TreeNode(item);
                        if (item.category === "Raw Material"){
                            c.quantity = cur.quantity / (60 / input);
                        }else {
                            c.quantity = cur.quantity * (input / output);
                        }
                        cur.children.push(c);
                        queue.enqueue(c);
                    })
                }
            }
        }
        return node;
}

export class K_VObject {
    key: string;
    value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}
