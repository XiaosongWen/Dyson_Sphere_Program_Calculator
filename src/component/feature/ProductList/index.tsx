import React from 'react';
import {Item} from "../../../util/Model";
import {ShowProduct} from "../ShowProduct";

import List from "@mui/material/List";

interface Props {
    selectedProduct:Item[];
    removeProduct: (item:Item) => void;
}

export function ProductList(props: Props) {
    const {selectedProduct, removeProduct} = props;

    return (
        <List>
        {
            selectedProduct.map(item => <ShowProduct key={item.id} item={item} removeProduct={removeProduct}/>)
        }
        </List>
    );
}