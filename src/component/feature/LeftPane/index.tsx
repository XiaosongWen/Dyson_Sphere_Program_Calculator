import React, {useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {drawerWidth} from "../../../util/constants";
import Typography from "@mui/material/Typography";
import {SelectProduct} from "../SelectProduct";
import {Item} from "../../../util/Model";
import {ProductList} from "../ProductList";

// import {}
interface Props  {
    open: boolean;
    toggleDrawer:  (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


export function LeftPane(props: Props) {
    const {open, toggleDrawer} = props;
    const [selectedProduct, setSelectedProduct] = useState<Item[]>([])

    const addProduct = (item: Item) => {
        if (selectedProduct.indexOf(item) === -1) {
            setSelectedProduct(selectedProduct => [...selectedProduct, item]);
        }
    }
    const removeProduct = (item: Item) => {
        setSelectedProduct(selectedProduct.filter(p => p.id !== item.id));
    }
    useEffect(()=>{
        console.log(selectedProduct)
    },[selectedProduct])
    return (
        <div>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Products
                    </Typography>

                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>

                <Divider />

                <SelectProduct addProduct={addProduct} />

                <Divider />

                <ProductList selectedProduct={selectedProduct} removeProduct={removeProduct}/>
            </Drawer>
        </div>
    );
};