import data from "../asset/dsp/data.json";

export class Icon{
    readonly color: string =  "";
    readonly id: string = "";
    readonly position: string = "";

    constructor(color: string, id: string, position: string) {
        this.color = color;
        this.id = id;
        this.position = position;
    }
}

export class Category{
    readonly id: string = "";
    readonly name: string = "";

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
export class Item{
    readonly category: string = "";
    readonly id: string = "";
    readonly name: string = "";
    readonly row: number;
    readonly stack : number;


    constructor(category: string, id: string, name: string, row: number, stack: number) {
        this.category = category;
        this.id = id;
        this.name = name;
        this.row = row;
        this.stack = stack;
    }
}
export class Fuel extends Item {
    readonly fuel_category: string;
    readonly fuel_value : number;

    constructor(category: string, id: string, name: string,
                row: number,
                stack: number, fuel_category: string, value: number) {
        super(category, id, name, row, stack);
        this.fuel_category = category;
        this.fuel_value = value;
    }
}
export class Factory extends Item{
    readonly speed: number;
    readonly type: string;
    readonly usage: number;
    readonly drain: number;
    readonly modules: number;

    constructor(category: string, id: string, name: string, row: number, stack: number, speed: number, type: string, usage: number, drain: number, modules: number) {
        super(category, id, name, row, stack);
        this.speed = speed;
        this.type = type;
        this.usage = usage;
        this.drain = drain;
        this.modules = modules;
    }
}
export class Recipe{
    readonly id: string ;
    readonly name: string ;
    readonly in: Map<Item, number>;
    readonly time: number;
    readonly producers: Factory[];

    constructor(id: string, name: string, time : number) {
        this.id = id;
        this.name = name;
        this.in = new Map();
        this.time = time;
        this.producers = [];
    }
}
// limitations defaults

const categories = data['categories'];
export const AllCategories = categories.map(c => new Category(c.id, c.name));

const icons = data['icons']
export const AllICons = icons.map(i => new Icon(i.color, i.id, i.position));

const items = data['items']
export const AllItems = items.map( i => {
    if (i.fuel) {
        return new Fuel(i.category, i.id, i.name,
            i.row as number, i.stack as number,
            i.fuel.category, i.fuel.value as number);
    }
    if (i.factory) {
        return new Factory(i.category,i.id, i.name, i.row as number, i.stack as number,
            i.factory.speed as number, i.factory.type as string, i.factory.usage as number, i.factory.drain as number, i.factory.modules as number);
    }
    return new Item(i.category,i.id, i.name, i.row as number, i.stack as number)
});

