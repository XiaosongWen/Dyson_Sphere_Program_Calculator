import React, {useState} from 'react';
import {Header} from "../../component/general/Header";
import {Box, Grid} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {LeftPane} from "../../component/general/LeftPane";
import {GraphView} from "../../component/feature/GraphView";
import {TreeView} from "../../component/feature/TreeView";

type Props = {
    
};

export function Home(props: Props) {
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
}