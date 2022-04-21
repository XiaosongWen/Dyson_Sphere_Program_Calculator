import React, {useState} from 'react';
import {Button, ButtonGroup} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {SelectDialog} from "../SelectDialog";
import {Item} from "../../../model/Model";

type Props = {
    addProduct: (item:Item) => void;
};

export function SelectProduct(props: Props) {
    const {addProduct} = props;

    const [searchGridOpen, setSearchGridOpen] = useState(false);

    const openSearchGrid = () => {
        setSearchGridOpen(true);
    }
    const closeSearchGrid = () => {
        setSearchGridOpen(false);
    }
    return (
        <>
            <ButtonGroup variant="outlined" orientation="vertical">
                <Button size="small"  startIcon={<AddIcon /> } onClick={openSearchGrid}>
                    Add a Product
                </Button>
                <Button size="small" >
                    Units per Minute
                </Button>
            </ButtonGroup>
            <SelectDialog open={searchGridOpen} closeSearchGrid={closeSearchGrid} addProduct={addProduct}/>
        </>

    );
};