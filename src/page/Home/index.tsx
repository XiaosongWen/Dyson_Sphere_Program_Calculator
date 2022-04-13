import React, {useState} from 'react';
import {Header} from "../../component/general/Header";
import data from "../../asset/dsp/data.json"
import hash from "../../asset/dsp/hash.json"
import {makeStyles} from "@material-ui/core";
import {Icon} from "../../component/general/Icon";
import {Box, Grid} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {LeftPane} from "../../component/general/LeftPane";
import {GraphView} from "../../component/feature/GraphView";
import {TreeView} from "../../component/feature/TreeView";




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

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
            <Box sx={{ display: 'flex' }}>
                <Header open={open} toggleDrawer={toggleDrawer}></Header>
                <LeftPane open={open} toggleDrawer={toggleDrawer}></LeftPane>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3} xs={12}>
                            <GraphView/>
                            <TreeView />
                        </Grid>
                    </Container>
                </Box>
            </Box>
    );

    //         <Icon x={"0px"} y ={"0px"}></Icon>
    //         <Icon x={"-64px"} y ={"0px"}></Icon>
    //         <Icon x={"-64px"} y ={"-128px"}></Icon>
    //         <Icon x={"-192px"} y ={"0px"}></Icon>
    //         <Icon x={"-256px"} y ={"0px"}></Icon>

};