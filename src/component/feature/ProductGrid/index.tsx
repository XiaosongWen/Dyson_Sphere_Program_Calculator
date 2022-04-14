import React, {useEffect, useState} from 'react';

import {Box} from "@mui/material";
import Paper from "@mui/material/Paper";

import {ItemTable} from "../../common/ItemTable";
import {CategoryList} from "../../common/CategoryList";

import {AllCategories, AllItems, Category, Item} from "../../../model/Model";

interface Props {
    addProduct: (item:Item) => void;
    closeSearchGrid:  () => void;
}

export function ProductGrid(props: Props) {
    const {addProduct, closeSearchGrid} = props;
    const [category, setCategory] = useState<Category>();
    const [displayItems, setItems] = useState<Item[]>([])

    const chooseCategory= (c:Category)=>{
        setCategory(c);
    }
    const chooseItem= (item: Item)=>{
        addProduct(item);
        closeSearchGrid();
    }
    useEffect(()=> {
        const filteredItemNames = AllItems.filter(i => i.category === category?.id);
        setItems(filteredItemNames);
    }, [category])
    return (
        <Box >
            <Paper elevation={3}>
                <CategoryList categories={AllCategories} chooseCategory={chooseCategory}/>
                <ItemTable itemList={displayItems}  chooseItem={chooseItem} />
            </Paper>
        </Box>
    );
}