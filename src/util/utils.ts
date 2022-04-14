import {Item, itemMap, recipeMap} from "../model/Model"

export const getItem = (id:string) => itemMap.get(id);

export const buildGraph = (items:Item[]) =>{
    const target = recipeMap.get(items[0].id);
    const list = [];


}