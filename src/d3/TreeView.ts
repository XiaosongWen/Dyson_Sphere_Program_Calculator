import React from 'react';
import {SelectedItem} from "../util/utils";
import * as d3 from "d3";
import {AllRecipes, Factory, Item} from "../model/Model";
import {Queue} from "../util/queue";
import {TreeLayout} from "d3-hierarchy";

const  logoSprite = require("../asset/dsp/icons.png");

class TreeNode {
    readonly item: Item;
    readonly children: TreeNode[] = [];
    quantity: number = 0;
    factory: Factory;
    factory_n: number = 0;
    constructor(item: Item) {
        this.item = item;
    }
}
const margin = {
    top: 50,
    bottom: 40,
    left: 50,
    right: 50,
};
const width = 1600 - margin.left - margin.right;
const height = 800- margin.top - margin.bottom;

export class TreeDiagram {
    readonly treemap: TreeLayout<any>;
    readonly ref: React.RefObject<SVGSVGElement>;
    readonly height: number;
    readonly width: number;
    nodes:  d3.HierarchyNode<TreeNode>;
    constructor(ref: React.RefObject<SVGSVGElement>) {
        this.treemap = d3.tree().size([width, height]);
        this.ref = ref;
        this.height = height;
        this.width = width;
    }

    insertData(items: SelectedItem[]){
        const item = items[0];
        const node = new TreeNode(item.item);
        node.quantity = item.speed;
        const queue: Queue<TreeNode> = new Queue<TreeNode>();
        queue.enqueue(node);
        while (!queue.isEmpty) {
            const cur = queue.dequeue()!;
            if (cur.item.category !== "Raw Material") {
                const recipe = AllRecipes.filter((r) => {
                    let produceTarget = false;
                    r.out.forEach((n, item) => {
                        if (item.id === cur.item.id) {
                            produceTarget = true;
                        }
                    });
                    return produceTarget;
                })[0];
                cur.factory = recipe.producers[0];
                cur.factory_n = cur.quantity / (60 / recipe.time);
                let output = 1;
                recipe.out.forEach((n, item) => {
                    if (item.id === cur.item.id) {
                        output = n;
                    }
                })
                if (recipe.in) {
                    recipe.in.forEach((input, item) => {
                        const c = new TreeNode(item);
                        if (item.category === "Raw Material"){
                            c.quantity = cur.quantity / (60 / input);
                        }else {
                            c.quantity = cur.quantity * (input / output);
                        }
                        cur.children.push(c);
                        queue.enqueue(c);
                    })
                }
            }
        }
        this.nodes = d3.hierarchy(node);
    }
    drawTree(){
        const treeNodes  = this.treemap(this.nodes);

        const svg = d3.select(this.ref.current);
        svg.attr("width", this.width + margin.left + margin.right)
            .attr("height", this.height + margin.top + margin.bottom);
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

        const tooltip = d3.select("#treeViewToolTip")
            .attr("class", "tooltip")

        const mouseover = (d:any) => {
            tooltip.text(d.target.id);
            return tooltip.style("visibility", "visible");
        }
        const mousemove = (d:any) => {
            return tooltip.style("top", (d.clientY +20)+ "px")
                .style("left",(d.clientX+20)+"px");
        }
        const mouseout = (d:any) => {
            return tooltip.style("visibility", "hidden");
        }

        let node = g.selectAll(".node")
            .data(treeNodes.descendants())
            .enter().append("g")
            .attr("class", (d) =>
                "node" + (d.children ? " node--internal" : " node--leaf"))
            .attr("transform", (d) =>
                "translate(" + d.x + "," + d.y + ")")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseout", mouseout)
        //add item icon
        node.append("svg")
            .attr("class", "item")
            .attr('width', 64)
            .attr('height', 64)
            .attr("x", -70)
            .attr("y", -20)
            .append("image")
            .attr('xlink:href', logoSprite)
            .attr('id', (d) => (d.data as TreeNode).item.id)
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

        //add factory icon
        node.filter((d) => (d.data as TreeNode).factory !== undefined)
            .append("svg")
            .attr("class", 'factory')
            .attr('width', 64)
            .attr('height', 64)
            .attr("y", '-20px')
            .append("image")
            .attr('xlink:href', logoSprite)
            .attr('width', 832)
            .attr('height', 832)
            .attr('id', (d) => (d.data as TreeNode).factory.id)
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
            .text((d) => Math.ceil((d.data as TreeNode).factory_n));
    }
}
