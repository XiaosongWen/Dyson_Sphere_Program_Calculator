import React from 'react';
import {Header} from "../../component/general/Header";
import {SearchPane} from "../../component/general/SearchPane";
import data from "../../asset/dsp/data.json"
import hash from "../../asset/dsp/hash.json"
import {Avatar} from "@mui/material";
import {makeStyles} from "@material-ui/core";
import {Icon} from "../../component/general/Icon";
const  logoSprite = require("../../asset/dsp/icons.png");

type Props = {
    
};

const useStyles = makeStyles((theme ) => ({

}));
export function Home(props: Props) {
    const classes = useStyles();
    const categories = data['categories'];
    const defaults = data['defaults'];
    const icons = data['icons'];
    const items = data['items'];
    const limitations = data['limitations'];
    const recipes = data['recipes'];
    console.log(categories);
    console.log(defaults);
    return (
        <div>
            <Header></Header>
            <SearchPane></SearchPane>

            <Icon x={"0px"} y ={"0px"}></Icon>
            <Icon x={"-64px"} y ={"0px"}></Icon>
            <Icon x={"-64px"} y ={"-128px"}></Icon>
            <Icon x={"-192px"} y ={"0px"}></Icon>
            <Icon x={"-256px"} y ={"0px"}></Icon>

        </div>
    );
};