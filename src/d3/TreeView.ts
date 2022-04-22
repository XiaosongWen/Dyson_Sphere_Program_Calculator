import React from 'react';
import {SelectedItem} from "../util/utils";
import * as d3 from "d3";
import {AllRecipes, Factory, Icon, Item} from "../model/Model";
import {Queue} from "../util/queue";
import {TreeLayout} from "d3-hierarchy";

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
const width = 1000 - margin.left - margin.right;
const height = 800- margin.top - margin.bottom;
interface Icon_Spec{
    ratio: number;
    original_width: number;
    original_height: number;
    current_width: number;
    current_height: number;
}
export class TreeDiagram {
    readonly treemap: TreeLayout<any>;
    readonly ref: React.RefObject<SVGSVGElement>;
    readonly height: number;
    readonly width: number;
    private spec: Icon_Spec;

    nodes:  d3.HierarchyNode<TreeNode>;

    constructor(ref: React.RefObject<SVGSVGElement>, i_w: number, i_h: number) {
        this.treemap = d3.tree().size([width, height]);
        this.ref = ref;
        this.height = height;
        this.width = width;
        this.spec = {
            ratio: 1,
            original_width: i_h,
            original_height: i_w,
            current_width: i_h,
            current_height: i_w,
        };
    }

    insertData(items: SelectedItem[]){
        const item = items[0];
        const node = new TreeNode(item.item);
        node.quantity = item.speed;
        const queue: Queue<TreeNode> = new Queue<TreeNode>();
        queue.enqueue(node);
        let count = 0;
        while (!queue.isEmpty) {
            const cur = queue.dequeue()!;
            count++;
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

        this.setRatio(count > 100 ? 0.5 : 1)
    }
    private setRatio(r: number) {
        this.spec.ratio = r;
        this.spec.current_height = this.spec.original_height * this.spec.ratio;
        this.spec.current_width = this.spec.original_width * this.spec.ratio;
        d3.select("#iconSprite")
            .attr("transform",
                "scale("+ this.spec.ratio + " " +  this.spec.ratio+") " +
                "translate(-832, -832)");
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
        const mouseout = () => {
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
            .attr('width', this.spec.current_width)
            .attr('height', this.spec.current_height)
            .attr("x", -70 * this.spec.ratio)
            .attr("y", -20 )
            .append("use")
            .attr('href', "#iconSprite")
            .attr('id', (d) => (d.data as TreeNode).item.id)
            .attr("transform", (d) => this.getPosition((d.data as TreeNode).item!.icon));

        node.filter((d) => (d.data as TreeNode).factory !== undefined)
            .append("text")
            .attr('x', -40 * this.spec.ratio)
            .attr("y", -20 )
            .style("text-anchor", "middle")
            .text((d) => (d.data as TreeNode).quantity);

        //add factory icon
        node.filter((d) => (d.data as TreeNode).factory !== undefined)
            .append("svg")
            .attr("class", 'factory')
            .attr('width', this.spec.current_width)
            .attr('height', this.spec.current_height)
            .attr("y", '-20px')
            .append("use")
            .attr('href', "#iconSprite")
            .attr('id', (d) => (d.data as TreeNode).factory.id)
            .attr("transform", (d) => this.getPosition((d.data as TreeNode).factory!.icon));

        node.filter((d) => (d.data as TreeNode).factory !== undefined)
            .append("text")
            .attr('x', 20)
            .attr("y", -20 )
            .style("text-anchor", "middle")
            .text((d) => Math.ceil((d.data as TreeNode).factory_n));
    }
    private getPosition(icon: Icon) {
        const pos = icon.position.split(" ");
        const x = (+pos[0].substring(0, pos[0].length - 2) + 832) * this.spec.ratio;
        const y = (+pos[1].substring(0, pos[1].length - 2) + 832) * this.spec.ratio;
        return "translate(" + x + "," + y + ")";
    }

}
