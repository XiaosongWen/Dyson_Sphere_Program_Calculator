import React from 'react';
import {Box, Button, ButtonGroup, Grid, makeStyles, Paper, styled} from "@mui/material";

type Props = {

};


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function SearchPane(props: Props) {

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid container xs={8}>
                    <Paper>xs=8</Paper>
                </Grid>
                <Grid container xs={4}>
                    <Paper>xs=4</Paper>
                </Grid>
                <Grid container xs={4}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                    </ButtonGroup>
                </Grid>
                <Grid  container xs={8}>
                    <Paper>xs=8</Paper>
                </Grid>
            </Grid>
        </Box>

    );
};