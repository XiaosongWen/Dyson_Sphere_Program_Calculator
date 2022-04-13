import React from 'react';
import {Item} from "../../../util/Model";
import {Button, ButtonGroup} from "@mui/material";
import {ListItem} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Logo} from "../Logo";

interface Props {
    item: Item;
    removeProduct: (id:string) => void;
}

export function ShowProduct(props: Props) {
    const {item, removeProduct} = props;
    return (
        <ListItem>
            <IconButton aria-label="delete" onClick={() => removeProduct(item.id)}>
                <DeleteIcon />
            </IconButton>
            <Logo icon={item.icon} click={(a)=>{}}/>
        </ListItem>
    );
}