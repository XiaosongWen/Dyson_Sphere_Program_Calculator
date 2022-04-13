import React, {useEffect, useState} from 'react';

import {Box} from "@mui/material";
import Paper from "@mui/material/Paper";

import {ItemTable} from "../../general/ItemTable";
import {CategoryList} from "../../general/CategoryList";

import {AllCategories, AllItems} from "../../../util/Model";

interface Props {
    
}

export function ProductGrid(props: Props) {
    const categoriesNames = AllCategories.map( c => c.id);
    const [category, setCategory] = useState("");
    const[displayItems, setItems] = useState<string[]>([])

    const chooseCategory= (c:string)=>{
        setCategory(c);
    }
    const chooseItem= (c:string)=>{
        console.log("selecting", c);
    }
    useEffect(()=> {
        const filteredItemNames = AllItems.filter(i => i.category === category).map( c => c.id);
        setItems(filteredItemNames);
    }, [category])
    return (
        <Box >
            <Paper elevation={3}>
                <CategoryList categoriesNames={categoriesNames} chooseCategory={chooseCategory}/>
                <ItemTable itemList={displayItems}  chooseItem={chooseItem}/>
            </Paper>
        </Box>
    );
}