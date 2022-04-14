import React, {RefObject, useEffect,createRef} from 'react';
import Paper from "@mui/material/Paper";
import {Grid} from "@mui/material";
import {Item} from "../../../model/Model";
// import {buildGraph} from "../../../util/utils";

import * as d3 from 'd3';

interface Props {
    selectedProduct: Item[];
}

export function GraphView(props: Props) {
    const ref: RefObject<SVGSVGElement> = createRef()
    const {selectedProduct} = props;

    useEffect(() => {
        // draw();
        const arr = selectedProduct.map(i => Math.random()*50);
        buildGraph(arr);
    },[selectedProduct])

    // const {selectedProduct} = props;
    // useEffect(() => {
    //     if (selectedProduct.length > 0) {
    //         // const graph = buildGraph(selectedProduct);
    //         // console.log(graph);
    //     }
    // },[selectedProduct]);
    const buildGraph = (data: Array<number>) => {
        const width = 200,
            scaleFactor = 10,
            barHeight = 20;

        const graph = d3.select(ref.current)
            .attr("width", width)
            .attr("height", barHeight * data.length);
        const bar = graph.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                return "translate(0," + i * barHeight + ")";
            });

        bar.append("rect")
            .attr("width", function(d) {
                return d * scaleFactor;
            })
            .attr("height", barHeight - 1);

        bar.append("text")
            .attr("x", function(d) { return (d*scaleFactor); })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d; });

    }

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
                {/*{*/}
                {/*    selectedProduct.map(i=>i.name)*/}
                {/*}*/}
                {/*<BarChart data={data}/>*/}
                <div className="HelloD3">
                    <svg width="500" height="500"  ref={ref}>
                    </svg>
                </div>


            </Paper>
        </Grid>
    );
}