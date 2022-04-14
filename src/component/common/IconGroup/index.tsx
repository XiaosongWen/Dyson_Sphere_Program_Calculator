import React from 'react';
import {Logo} from "../Logo";
import {ButtonGroup} from "@mui/material";
import {makeStyles} from "@material-ui/core";

import {Icon} from "../../../model/Model"

interface Props {
    icons: Icon[];
    click: (s: string) => void;
}
const useStyles = makeStyles(() => ({
    icons: {
        // alignItems:'left',
        // border:"5px solid",
        backgroundColor:'grey',
    },
}));

export function IconGroup(props: Props) {
    const {icons, click} = props;
    const classes = useStyles();
    return (
        <ButtonGroup className={classes.icons} >
            {
                icons.map((i) =>
                    <Logo key={i.id} icon={i} click={click}/>
                )
            }
        </ButtonGroup>
    );
}