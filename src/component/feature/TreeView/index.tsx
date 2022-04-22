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
const  logoSprite = require("../../../asset/dsp/icons.png");

export function TreeView(props: Props) {
    const ref: React.RefObject<SVGSVGElement> = createRef()
    const {selectedData} = props;
    useEffect(() => {
        d3.select(ref.current).selectAll('*').remove();
        if (selectedData.length > 0) {
            const treeMap = new TreeDiagram(ref, 64, 64);
            treeMap.insertData(selectedData);
            treeMap.drawTree();
        }
    },[ref, selectedData])
    return (
        <Grid item xs={8}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                }}
                className = "TreeViewPaper"
            >
                <div id="treeViewToolTip"></div>
                <svg width="0" height = "0">
                    <image id="iconSprite" href ={logoSprite} transform="translate(-832, -832)"/>
                </svg>
                <svg width="100%" height="100%" ref={ref}/>
            </Paper>
        </Grid>
    );
}