import React, {useState} from 'react';
import {DropDownButtonGroup} from "../../common/DropDownButtonGroup";
import {Logo} from "../../common/Logo";

import {
    Button, IconButton, Dialog, DialogTitle,
    DialogActions, DialogContent, DialogContentText,
    ListItem, TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import {K_VObject, ProductionSpeedUnit, SelectedItem} from "../../../util/utils";
import {Item} from "../../../model/Model";

interface Props {
    product: SelectedItem;
    updateProduct: (p: SelectedItem) => void;
    removeProduct: (item:Item) => void;
}

export function ShowProduct(props: Props) {
    const {product, removeProduct, updateProduct} = props;
    const [speed, setSpeed] = useState(product.speed);
    const [unit, setUnit] = useState<ProductionSpeedUnit>(product.unit);
    const [open, setOpen] = useState(false);


    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(+e.target.value);
    }
    const handleUnitChange = (i:string) => {
        console.log("handleUnitChange", i)
        type LogLevelStrings = keyof typeof ProductionSpeedUnit
        setUnit(ProductionSpeedUnit[i as LogLevelStrings]);
    }

    const handleConfirm = () => {
        if (speed !== product.speed || unit !== product.unit) {
            updateProduct(new SelectedItem(product.item, speed, unit))
        }
        handleClose();
    }

    return (
        <ListItem>
            <IconButton aria-label="delete" onClick={() => removeProduct(product.item)}>
                <DeleteIcon />
            </IconButton>
            <Logo icon={product.item.icon} click={handleClick} />
            <Dialog onClose={handleClose} open={open} maxWidth={'xs'} fullWidth style ={{ height: "800px"}}>
                <DialogTitle>Set Production Speed</DialogTitle>
                <DialogContent dividers={true} >
                    <DialogContentText >
                        Produce <Logo icon={product.item.icon} click={() => void 0} /> at &nbsp;
                    </DialogContentText>
                    <TextField
                        id="outlined-number"
                        type="number"
                        defaultValue={speed}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size = "small"
                        style = {{ width: "80px" }}
                        margin = "dense"
                        onChange = {handleSpeedChange}
                    />
                    <DropDownButtonGroup
                        options={Object.entries(ProductionSpeedUnit).map(([k, v])=> new K_VObject(k, v))}
                        selectedIdx = {Object.values(ProductionSpeedUnit).indexOf(unit)}
                        makeSelect = {handleUnitChange}
                        customized={{
                            disabled:[0]
                            }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus> Confirm </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
}