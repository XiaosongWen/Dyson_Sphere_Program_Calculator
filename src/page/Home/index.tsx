import React, {useState} from 'react';
import {Header} from "../../component/feature/Header";
import {Box, Grid} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {LeftPane} from "../../component/feature/LeftPane";
import {TreeView} from "../../component/feature/TreeView";
import {SelectedItem} from "../../util/utils";

export function Home() {
    const [open, setOpen] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<SelectedItem[]>([]);

    const updateSelectedList = (list: SelectedItem[]) => {
        setSelectedProduct(list);
    }
    const updateProduct = (p: SelectedItem) => {
        console.log("updateProduct", p)
        const list = selectedProduct.map((i) => {
            if (i.item.id === p.item.id) {
                i.unit = p.unit;
                i.speed = p.speed;
            }
            return i;
        })
        setSelectedProduct(list);
    }
    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
            <Box sx={{ display: 'flex' }}>
                <Header open={open} toggleDrawer={toggleDrawer}></Header>
                <LeftPane
                    open={open}
                    toggleDrawer={toggleDrawer}
                    updateSelectedList={updateSelectedList}
                    updateProduct={updateProduct}
                    selectedProduct={selectedProduct} />

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Grid container  spacing={2}>
                            {/*<GraphView selectedProduct={selectedProduct}/>*/}
                            <TreeView selectedData={selectedProduct}/>
                    </Grid>
                </Box>
            </Box>
    );
}