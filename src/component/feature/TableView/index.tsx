import * as React from 'react';
import { useEffect, useState } from 'react';
import { SelectedItem } from '../../../util/utils';
import {Grid} from "@mui/material";
import { MyList } from '../../common/MyList';
import Paper from "@mui/material/Paper";
import { Divider } from '@material-ui/core';

type Props = {
    selectedData: SelectedItem[];
    display: string;
};

export function TableView(props: Props) {
    const {selectedData, display} = props;
    const [show, setShow] = useState(false);

    useEffect(()=> {
        setShow(selectedData.length>0);
    }, [selectedData])   
    
    return (
        <Grid item xs={12} display = {display}>
            {/* Header */}
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                }}
                className = "TreeViewPaper"
            >
            
            <Grid container spacing={2} >
                <Grid item xs={5}>   Item   </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={1}>  Production/s </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={2}>    Factories </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={2}>    Power </Grid>
            </Grid>
                {show? <MyList displayList={selectedData} /> : ""}
                
                {/* <Collapse in={open} timeout="auto" unmountOnExit>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    
                </Collapse> */}
            </Paper>
        </Grid>
    );
};