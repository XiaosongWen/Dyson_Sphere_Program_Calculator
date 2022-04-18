import React, {useState} from 'react';
import {Header} from "../../component/feature/Header";
import {Box, Grid} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {LeftPane} from "../../component/feature/LeftPane";
import {GraphView} from "../../component/feature/GraphView";
import {TreeView} from "../../component/feature/TreeView";
import {Item} from "../../model/Model";


type Props = {

};

export function Home(props: Props) {
    const [open, setOpen] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Item[]>([]);

    const updateSelectedList = (list: Item[]) => {
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
                    selectedProduct={selectedProduct}></LeftPane>

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
                            <GraphView selectedProduct={selectedProduct}/>
                            <TreeView selectedData={selectedProduct}/>
                    </Grid>
                </Box>
            </Box>
    );
}