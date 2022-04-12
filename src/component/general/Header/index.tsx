import React from 'react';
import {AppBar, makeStyles, Toolbar} from "@material-ui/core";
type Props = {
    
};
const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#400CCC",
        height:60,
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
}));
export function Header(props: Props) {
    const classes = useStyles();

    const displayDesktop = () => {
        return <Toolbar className={classes.logo}>Dyson Sphere Program Calculator</Toolbar>;
    };

    return (
        <header>
            <AppBar className={classes.header}>{displayDesktop()}</AppBar>
        </header>
    );
};