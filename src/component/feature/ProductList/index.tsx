import React from 'react';
import {Item} from "../../../util/Model";
import {ShowProduct} from "../../general/ShowProduct";

import List from "@mui/material/List";

interface Props {
    selectedProduct:Item[];
    removeProduct: (id:string) => void;
}

export function ProductList(props: Props) {
    const {selectedProduct, removeProduct} = props;

    return (
        <List>
        {
            selectedProduct.map(item => <ShowProduct item={item} removeProduct={removeProduct}/>)
        }
        </List>
    );
}