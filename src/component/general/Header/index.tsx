import React from 'react';
import {Toolbar} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {drawerWidth} from "../../../util/constants";

interface Props  {
    open: boolean;
    toggleDrawer:  (event: React.MouseEvent<HTMLButtonElement>) => void;
};

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export function Header(props: Props) {
    const {open, toggleDrawer} = props;

    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                // sx={{
                //     pr: '24px', // keep right padding when drawer closed
                // }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dyson Sphere Program Calculator
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsNoneIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}