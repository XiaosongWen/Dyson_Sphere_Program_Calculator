import React from 'react';
import {makeStyles} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import {Icon} from "../../../util/Model"

const  logoSprite = require("../../../asset/dsp/icons.png");

interface Props {
    icon: Icon,
    select: (s: string) => void;
}
const useStyles = makeStyles(() => ({
    icon: {
        backgroundImage: `url(${logoSprite})`,
        // backgroundColor: "black",
        backgroundRepeat: "no-repeat",
        // display: 'flex',
        height:64,
        width:64,
        border:"1px solid",
    },
}));
export function Logo(props: Props) {
    const {icon, select} = props;
    const classes = useStyles();

    const clickIcon = (e: any) => {
        select(e.target.value);
    }

    return (
            <IconButton
                onClick={clickIcon}
                value = {icon.id}
                className = {classes.icon}
                style={{
                    backgroundPosition : icon.position,
                }}
            >
            </IconButton>

    );
}