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

                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                    </ButtonGroup>


        </Box>

    );
};