export const drawerWidth: number = 320;

export interface Icon{
    "color": string;
    "id": string;
    "position": string;
}
export interface Category{
    "id": string;
    "name": string;
}
export interface Item{
    "category": string,
    "id": string,
    "name": string,
    "row": number,
    "stack": number
}
export interface Recipe{
    "id": string,
    "name": string,
    "in": object,
    "time": number,
    "producers": string[]
}
// limitations defaults
