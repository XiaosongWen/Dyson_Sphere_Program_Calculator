import React from 'react';
import Paper from "@mui/material/Paper";
import {Grid} from "@mui/material";

interface Props {

};

export function TreeView(props: Props) {
    return (
        <Grid item xs={12}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                TreeView
            </Paper>
        </Grid>
    );
};