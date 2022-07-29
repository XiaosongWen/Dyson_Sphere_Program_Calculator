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
    private icon: Icon;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
    setIcon(icon: Icon) {
        this.icon = icon;
    }
    getIcon() {
        return this.icon;
    }
}
export class Item{
    readonly category: string = "";
    readonly id: string = "";
    readonly name: string = "";
    readonly row: number;
    readonly stack : number;
    icon: Icon;

    constructor(category: string, id: string, name: string, row: number, stack: number) {
        this.category = category;
        this.id = id;
        this.name = name;
        this.row = row;
        this.stack = stack;
    }
    setIcon(icon: Icon) {
        this.icon = icon;
    }
}
export class RawMaterial extends Item {
    produceTime: number;

    constructor(category: string, id: string, name: string) {
        super(category, id, name, -1, -1);
    }
}
export class Fuel extends Item {
    readonly fuel_category: string;
    readonly fuel_value : number;

    constructor(category: string, id: string, name: string,
                row: number,
                stack: number, fuel_category: string, value: number) {
        super(category, id, name, row, stack);
        this.fuel_category = fuel_category;
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
    readonly out: Map<Item, number>;
    readonly time: number;
    readonly producers: Factory[];

    constructor(id: string, name: string, time : number) {
        this.id = id;
        this.name = name;
        this.in = new Map();
        this.out = new Map();
        this.time = time;
        this.producers = [];
    }
    addProducer(f: Factory) {
        this.producers.push(f);
    }
    addIn(item: Item, n: number) {
        this.in.set(item, n);
    }
    addOut(item: Item, n: number) {
        this.out.set(item, n);
    }
}
// limitations defaults

const iconMap = new Map<string, Icon>();
data['icons'].forEach(i => {
    const icon = new Icon(i.color, i.id, i.position);
    iconMap.set(icon.id, icon);
});

const categories = data['categories'];
export const AllCategories = categories.map(c => new Category(c.id, c.name));

AllCategories.forEach(c => c.setIcon(iconMap.get(c.id)!));

const items = data['items']
export const itemMap = new Map<string, Item>();
export const AllRawMaterial:RawMaterial[] = [];
export const AllItems = items.map( i => {
    let item: Item;
    if (i.fuel) {
        item = new Fuel(i.category, i.id, i.name,
            i.row as number, i.stack as number,
            i.fuel.category, i.fuel.value as number);
    }else if (i.factory) {
        item = new Factory(i.category,i.id, i.name, i.row as number, i.stack as number,
            i.factory.speed as number, i.factory.type as string, i.factory.usage as number,
            i.factory.drain as number, i.factory.modules as number);
    }else{
        item = new Item(i.category,i.id, i.name, i.row as number, i.stack as number);
    }
    item.setIcon(iconMap.get(item.id)!);
    itemMap.set(item.id, item);
    return item;
});

iconMap.forEach((icon, id) => {
    const item = AllItems.filter((i)=> i.id === id);
    if (item.length === 0) {
        const material = new RawMaterial("Raw Material", id, id);
        material.setIcon(icon);
        AllRawMaterial.push(material);
        itemMap.set(id, material);
    }
})

export const AllRecipes: Recipe[] = [];
export const OutMap = new Map<Item, Recipe[]>();

data['recipes'].forEach(r => {
    const recipe: Recipe = new Recipe(r.id, r.name, r.time);
    if (itemMap.get(r.id)!.category === "Raw Material"){
        const rawMaterial = itemMap.get(r.id)! as RawMaterial;
        rawMaterial.produceTime = recipe.time;
        recipe.addIn(itemMap.get(r.id)!, recipe.time);
    }
    if (r.in) {
        Object.entries(r.in).forEach(p => {
            recipe.addIn(itemMap.get(p[0])!, p[1] as number);
        })
    }
    if (r.out) {
        Object.entries(r.out).forEach(p => {
            recipe.addOut(itemMap.get(p[0])!, p[1] as number);
        })
    } else {
        recipe.addOut(itemMap.get(r.id)!, 1);
    }
    r.producers.forEach(f => {
        recipe.addProducer(itemMap.get(f) as Factory);
    })
    recipe.out.forEach((v: number, k: Item) => {
        if (!OutMap.has(k)) {
            const list: Recipe[] = [];
            OutMap.set(k, list);
        }
        OutMap.get(k)!.push(recipe);
    })
    
    AllRecipes.push(recipe);
});




