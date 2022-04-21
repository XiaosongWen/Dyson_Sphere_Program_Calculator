import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {drawerWidth} from "../../../util/constants";
import Typography from "@mui/material/Typography";
import {SelectProduct} from "../SelectProduct";
import {Item} from "../../../model/Model";
import {ProductList} from "../ProductList";
import {SelectedItem} from "../../../util/utils";

interface Props  {
    open: boolean;
    toggleDrawer:  (event: React.MouseEvent<HTMLButtonElement>) => void;
    updateProduct: (p: SelectedItem) => void;
    updateSelectedList: (list: SelectedItem[]) => void;
    selectedProduct: SelectedItem[];
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
    const {open, toggleDrawer, updateSelectedList, updateProduct, selectedProduct} = props;
    const addProduct = (item: Item) => {
        if ((selectedProduct.filter((p)=> p.item.id === item.id)).length === 0) {
            const newList: SelectedItem[] = [...selectedProduct, new SelectedItem(item, 60)];
            updateSelectedList(newList);
        }
    }
    const removeProduct = (item: Item) => {
        updateSelectedList(selectedProduct.filter(p => p.item.id !== item.id));
    }
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

                <SelectProduct addProduct={addProduct}  />

                <Divider />

                <ProductList selectedProduct={selectedProduct} removeProduct={removeProduct} updateProduct={updateProduct}/>
            </Drawer>
        </div>
    );
};