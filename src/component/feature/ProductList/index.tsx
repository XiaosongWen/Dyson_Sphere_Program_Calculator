import React from 'react';
import {Item} from "../../../model/Model";
import {ShowProduct} from "../ShowProduct";

import List from "@mui/material/List";
import {SelectedItem} from "../../../util/utils";

interface Props {
    selectedProduct:SelectedItem[];
    updateProduct: (p: SelectedItem) => void;
    removeProduct: (item:Item) => void;
}

export function ProductList(props: Props) {
    const {selectedProduct, updateProduct, removeProduct} = props;

    return (
        <List>
        {
            selectedProduct.map(product =>
                <ShowProduct
                    key={product.item.id}
                    product={product}
                    updateProduct={updateProduct}
                    removeProduct={removeProduct}/>)
        }
        </List>
    );
}