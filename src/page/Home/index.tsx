import React from 'react';
import {Header} from "../../component/general/Header";
import {SearchPane} from "../../component/general/SearchPane";
import data from "../../asset/dsp/data.json"
import hash from "../../asset/dsp/hash.json"
import {Avatar} from "@mui/material";
import {makeStyles} from "@material-ui/core";
import "./index.css"
const  logos = require("../../asset/dsp/icons.png");

type Props = {
    
};

const useStyles = makeStyles(() => ({
    icons: {
        background: "0px 0px",
    },
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
            <div className="home"></div>
            <Avatar
                alt="Remy Sharp"
                className = {classes.icons}
                src={logos}
                sx={{ width: 200, height: 200 }} />
            {/*<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />*/}
            {/*<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />*/}
        </div>
    );
};