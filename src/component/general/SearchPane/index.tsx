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
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={4}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid>
        </Box>

    );
};