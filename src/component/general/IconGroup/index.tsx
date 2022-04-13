import React from 'react';
import {Logo} from "../Logo";
import {ButtonGroup} from "@mui/material";
import {makeStyles} from "@material-ui/core";

import {Icon} from "../../../util/constants"

interface Props {
    icons: Icon[];
    select: (s: string) => void;
}
const useStyles = makeStyles(() => ({
    icons: {
        // alignItems:'left',
        // border:"5px solid",
        backgroundColor:'grey',
    },
}));

export function IconGroup(props: Props) {
    const {icons, select} = props;
    const classes = useStyles();
    return (
        <ButtonGroup className={classes.icons} >
            {
                icons.map((c) =>
                    <Logo key={c.id} icon={c} select={select}/>
                )
            }
        </ButtonGroup>
    );
}