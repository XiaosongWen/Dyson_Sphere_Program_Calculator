import React, {createRef, useEffect} from 'react';
import Paper from "@mui/material/Paper";
import {Grid} from "@mui/material";

import * as d3 from 'd3';
import "./index.css";
import {SelectedItem} from "../../../util/utils"
import { TreeDiagram } from '../../../d3/TreeView';

interface Props {
    selectedData: SelectedItem[];
}
const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
};
const width = 1200 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

export function TreeView(props: Props) {
    const ref: React.RefObject<SVGSVGElement> = createRef()
    const {selectedData} = props;
    useEffect(() => {
        d3.select(ref.current).selectAll('*').remove();
        if (selectedData.length > 0) {
            const treeMap = new TreeDiagram(width, height, ref);
            treeMap.insertData(selectedData);
            treeMap.drawTree();
        }
    },[ref, selectedData])
    return (
        <Grid item xs={12}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                }}
                className = "TreeViewPaper"
            >
                <svg width="100%" height="100%" ref={ref} />
            </Paper>
        </Grid>
    );
}