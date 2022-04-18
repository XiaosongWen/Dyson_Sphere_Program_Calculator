// import React, {RefObject, useEffect,createRef} from 'react';
// import Paper from "@mui/material/Paper";
// import {Grid} from "@mui/material";
// import {Item} from "../../../model/Model";
// // import {buildGraph} from "../../../util/utils";
//
// import * as d3 from 'd3';
// import "./index.css";
// import data from "./data.json";
//
// interface Props {
//     selectedProduct: Item[];
// }
//
// const margin = {
//     top: 40,
//     bottom: 10,
//     left: 20,
//     right: 20,
// };
// const width = 800 - margin.left - margin.right;
// const height = 600 - margin.top - margin.bottom;
// const simulation = d3
//     .forceSimulation()
//     .force(
//         "link",
//         d3.forceLink().id((d:any) => d.id)
//     )
//     .force("charge", d3.forceManyBody())
//     .force("center", d3.forceCenter(width / 2, height / 2));
//
//
// // const dblclick = (d) {
// //     d3.select(this).classed("fixed", d.fixed = false);
// // }
// //
// // function dragstart(d) {
// //     d3.select(this).classed("fixed", d.fixed = true);
// // }
// const color = d3.scaleOrdinal(d3.schemeCategory10);
//
// export function GraphView(props: Props) {
//     const ref: RefObject<SVGSVGElement> = createRef()
//     const {selectedProduct} = props;
//
//
//     useEffect(() => {
//         // if (selectedProduct.length > 0) {
//             //         // const graph = buildGraph(selectedProduct);
//             //         // console.log(graph);
//             //     }
//         console.log("----------------------");
//         buildGraph();
//         console.log("----------------------");
//     },[selectedProduct])
//
//     const buildGraph = ()=> {
//         const svg = d3
//             .select(ref.current)
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", `translate(${margin.left}, ${margin.top})`);
//
//         const link = svg
//             .selectAll(".link")
//             .data(data.links)
//             .join((enter) =>{
//                 console.log("link", enter);
//                 return enter.append("line").attr("class", "link")
//             });
//         const node = svg
//             .selectAll(".node")
//             .data(data.nodes)
//             .join((enter) => {
//                 console.log("node", enter);
//                 const node_enter = enter.append("circle").attr("class", "node").attr("r", 10);
//                 // node_enter.append("title").text((d) => d.id);
//                 return node_enter;
//             });
//         node.style("fill", (d) => color(d.group + ""));
//
//         //
//         simulation.nodes(data.nodes);
//         simulation.force("link").links(data.links);
//
//         simulation.on("tick", () => {
//             link
//                 .attr("x1", (d:any) => d.source.x)
//                 .attr("y1", (d:any) => d.source.y)
//                 .attr("x2", (d:any) => d.target.x)
//                 .attr("y2", (d:any) => d.target.y);
//
//             node.attr("cx", (d:any) => d.x).attr("cy", (d:any) => d.y);
//         })
//     }
//
//     return (
//         <Grid item xs={12}>
//             <Paper
//                 sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     height: 240,
//                 }}
//             >
//                 {/*{*/}
//                 {/*    selectedProduct.map(i=>i.name)*/}
//                 {/*}*/}
//                 {/*<BarChart data={data}/>*/}
//
//                     <svg width="500" height="500"  id="mysvg" ref={ref} />
//             </Paper>
//         </Grid>
//     );
// }