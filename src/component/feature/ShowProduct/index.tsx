import React from 'react';
import {Item} from "../../../model/Model";
import {ListItem} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Logo} from "../../common/Logo";

interface Props {
    item: Item;
    removeProduct: (item:Item) => void;
}

export function ShowProduct(props: Props) {
    const {item, removeProduct} = props;
    return (
        <ListItem>
            <IconButton aria-label="delete" onClick={() => removeProduct(item)}>
                <DeleteIcon />
            </IconButton>
            <Logo icon={item.icon} click={(a)=>{}}/>
        </ListItem>
    );
}