import React from 'react';
import {Avatar} from "@mui/material";
import {makeStyles} from "@material-ui/core";

const  logoSprite = require("../../../asset/dsp/icons.png");

interface Props {
    x: string;
    y: string;
};
const useStyles = makeStyles(() => ({
    icons: {
        backgroundImage: `url(${logoSprite})`,
        backgroundRepeat: "no-repeat",
        display: 'flex',
        height:64,
        width:64,
    },
}));
export function Icon(props: Props) {
    const {x, y} = props;
    const classes = useStyles({x, y});
    return (
        <div>
            <Avatar
                sx={{ width: 64, height: 64}}
                variant="square" >
                <div
                    className = {classes.icons}
                    style={{backgroundPosition : x, backgroundPositionY:y}}>
                </div>
            </Avatar>
        </div>
    );
};