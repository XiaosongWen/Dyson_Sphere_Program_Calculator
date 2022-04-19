import React, {createRef, useEffect} from 'react';
import Paper from "@mui/material/Paper";
import {Grid} from "@mui/material";
import {Item} from "../../../model/Model";

import * as d3 from 'd3';
import "./index.css";
import {buildTree, TreeNode} from "../../../util/utils"

interface Props {
    selectedData: Item[];
}

const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
};
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

export function TreeView(props: Props) {
    const ref: React.RefObject<SVGSVGElement> = createRef()
    const {selectedData} = props;
    const treemap = d3.tree().size([width, height]);

    useEffect(() => {
        d3.select(ref.current).selectAll('*').remove();
        if (selectedData.length > 0) {
            drawTree(buildTree(selectedData));
        }
    },[selectedData])

    const drawTree = (data: TreeNode) => {
        // console.log(data);
        const nodes = d3.hierarchy(data);
        const treeNodes  = treemap(nodes);

        const svg = d3.select(ref.current);
        svg.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
        const g = svg.append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        const link = g.selectAll(".link")
            .data( treeNodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) {
                return "M" + d.x + "," + d.y
                    + "C" + d.x + "," + (d.y + d.parent!.y) / 2
                    + " " + d.parent!.x + "," +  (d.y + d.parent!.y) / 2
                    + " " + d.parent!.x + "," + d.parent!.y;
            });

        let node = g.selectAll(".node")
            .data(treeNodes.descendants())
            .enter().append("g")
            .attr("class", (d) =>
                 "node" + (d.children ? " node--internal" : " node--leaf"))
            .attr("transform", (d) =>
                 "translate(" + d.x + "," + d.y + ")");

        //add item icon
        node.append("svg")
            .attr("id",
                (d)=> (d.data as TreeNode).item.id + "item")
            .attr('width', 64)
            .attr('height', 64)
            .attr("x", -70)
            .attr("y", -20)
            .append("image")
            .attr('xlink:href', require("../../../asset/dsp/icons.png"))
            .attr('width', 832)
            .attr('height', 832)
            .attr("transform", (d) => {
                const pos = (d.data as TreeNode).item.icon.position.split(" ");
                const x = pos[0].substring(0, pos[0].length - 2);
                const y = pos[1].substring(0, pos[1].length - 2);
                return "translate(" + x + "," + y + ")";
            })
        node.filter((d) => (d.data as TreeNode).factory !== undefined)
            .append("text")
            .attr('x', -40)
            .attr("y", -20 )
            .style("text-anchor", "middle")
            .text((d) => (d.data as TreeNode).quantity);
            // .text((d) =>
            //     (d.data as TreeNode).item.id + ": " + (d.data as TreeNode).n);
        node.filter((d) => (d.data as TreeNode).factory === undefined)
            .append("text")
            .attr('x', -40)
            .attr("y", -20 )
            .style("text-anchor", "middle")
            .text((d) => (d.data as TreeNode).quantity);
        //add factory icon
        node.filter((d) => (d.data as TreeNode).factory !== undefined)
            .append("svg")
            .attr("id",
                (d)=> (d.data as TreeNode).item.id + 'factory')
            .attr('width', "64px")
            .attr('height', "64px")
            // .attr("x", '1px')
            .attr("y", '-20px')
            .append("image")
            .attr('xlink:href', require("../../../asset/dsp/icons.png"))
            .attr('width', "832px")
            .attr('height', "832px")
            .attr("transform", (d) => {
                const pos = (d.data as TreeNode).factory!.icon.position.split(" ");
                const x = pos[0].substring(0, pos[0].length - 2);
                const y = pos[1].substring(0, pos[1].length - 2);
                return "translate(" + x + "," + y + ")";
            })
        node.filter((d) => (d.data as TreeNode).factory !== undefined)
            .append("text")
            .attr('x', 20)
            .attr("y", -20 )
            .style("text-anchor", "middle")
            .text((d) => (d.data as TreeNode).factory_n);
    }
    return (
        <Grid item xs={8}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                }}
            >
                <svg width="500" height="800" ref={ref} />
            </Paper>
        </Grid>
    );
}