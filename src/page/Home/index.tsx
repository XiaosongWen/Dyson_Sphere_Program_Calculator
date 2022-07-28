import React, {useState} from 'react';
import {Header} from "../../component/feature/Header";
import {Box, Tab, Tabs} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {LeftPane} from "../../component/feature/LeftPane";
import {TreeView} from "../../component/feature/TreeView";
import {SelectedItem} from "../../util/utils";
import {GraphView} from "../../component/feature/GraphView";
import { TableView } from '../../component/feature/TableView';

enum DiagramType {
    TREE = "Tree Diagram",
    GRAPH = "Network Graph",
    SANKEY = "Sankey Diagram",
    TABLE = "Table Diagram",
}
export function Home() {
    const [open, setOpen] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<SelectedItem[]>([]);
    const [vis, setVis] = useState<DiagramType>(DiagramType.TABLE);

    const handleChooseVis = (event: React.SyntheticEvent, newValue: DiagramType) => {
        setVis(newValue);
    };

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
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={vis}
                        onChange={handleChooseVis}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value={DiagramType.TABLE} label={DiagramType.TABLE} />
                        <Tab value={DiagramType.TREE} label={DiagramType.TREE} />
                        <Tab value={DiagramType.GRAPH} label={DiagramType.GRAPH} />
                        <Tab value={DiagramType.SANKEY} label={DiagramType.SANKEY} />       
                    </Tabs>
                </Box>
                <TableView selectedData={selectedProduct} display={vis !== DiagramType.TABLE ? "None": "block"} />
                <TreeView selectedData={selectedProduct} display={vis !== DiagramType.TREE ? "None": "block"} />
                {vis !== DiagramType.GRAPH ? ("") :
                    <GraphView selectedProduct={selectedProduct}/>
                }
                
            </Box>
        </Box>
    );
}