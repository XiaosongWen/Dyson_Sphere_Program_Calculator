import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { buildList, SelectedItem, TreeNode } from '../../../util/utils';
import {Grid} from "@mui/material";
import { MyList } from '../../common/MyList';

type Props = {
    selectedData: SelectedItem[];
    display: string;
};

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

  
export function TableView(props: Props) {
    const {selectedData, display} = props;
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(()=> {
    }, [selectedData])
   
    
    return (
        <Grid item xs={12} display = {display}>
            <MyList displayList={selectedData} />
            
            {/* {
                list.forEach((item: TreeNode)=> 
                    
                )
            } */}
                {/* <ListItem button>
                    <ListItemIcon>
                        sendicon
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        drafticon
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        inboxIcon
                    </ListItemIcon>
                <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    
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
        </Grid>
    );
};