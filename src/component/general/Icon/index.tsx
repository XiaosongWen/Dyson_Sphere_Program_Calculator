import React, {useRef} from 'react';
import {Avatar, Button} from "@mui/material";
import {makeStyles} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

const  logoSprite = require("../../../asset/dsp/icons.png");

interface Props {
    position: string;
    name: string;
    select: (s: string) => void;
}
const useStyles = makeStyles(() => ({
    icons: {
        backgroundImage: `url(${logoSprite})`,
        // backgroundColor: "black",
        backgroundRepeat: "no-repeat",
        // display: 'flex',
        height:64,
        width:64,
    },
}));
export function Icon(props: Props) {
    const {position, name, select} = props;
    const classes = useStyles();

    const clickIcon = (e: any) => {
        select(e.target.value);
    }

    return (
            <IconButton
                onClick={clickIcon}
                value = {name}
                className = {classes.icons}
                style={{backgroundPosition : position}}
            >
            </IconButton>

    );
}