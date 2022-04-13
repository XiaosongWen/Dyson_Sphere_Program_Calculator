import React from 'react';
import {Icon} from "../Icon";
import {ButtonGroup} from "@mui/material";
import {makeStyles} from "@material-ui/core";

interface icon{
    "color": string;
    "id": string;
    "position": string;
}

interface Props {
    icons: icon[];
    select: (s: string) => void;
}
const useStyles = makeStyles(() => ({
    icon: {
        alignItems:'left',
        border:"5px solid",
        backgroundColor:'black',
    },
}));

export function IconGroup(props: Props) {
    const {icons, select} = props;
    const classes = useStyles();
    return (
        <ButtonGroup className={classes.icon}>
            {
                icons.map((c) =>
                    <Icon key={c.id} position={c.position} name={c.id} select={select}/>
                )
            }
        </ButtonGroup>
    );
}