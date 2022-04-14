import React, {useEffect} from 'react';
import Paper from "@mui/material/Paper";
import {Grid} from "@mui/material";
import {Item} from "../../../model/Model";
import {buildGraph} from "../../../util/utils";

interface Props {
    selectedProduct: Item[];
}

export function GraphView(props: Props) {
    const {selectedProduct} = props;
    useEffect(() => {
        if (selectedProduct.length > 0) {
            const graph = buildGraph(selectedProduct);
            console.log(graph);
        }
    },[selectedProduct]);

    return (
        <Grid item xs={12}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                {
                    selectedProduct.map(i=>i.name)
                }
            </Paper>
        </Grid>
    );
}