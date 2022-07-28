import { Grid, ListItem, makeStyles, Typography } from '@material-ui/core';
import { Divider } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { AllRecipes } from '../../../model/Model';
import { SelectedItem } from '../../../util/utils';
import { Logo } from '../Logo';

type Props = {
    displayItem: SelectedItem;
};

const useStyles = makeStyles((theme) => ({
    cell: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));


export function MyListItem(props: Props) {

    const {displayItem} = props
    const classes = useStyles();

    const handleClick = () => {
        console.log(123);
    }
    
    
    useEffect(()=> {
        console.log("displayItem", displayItem);
        
    }, [displayItem])
    return (
        
            <ListItem>
                <Grid container spacing={3} >
                    <Grid item xs className={classes.cell} >       
                        <Logo icon={displayItem.item.icon} click={handleClick}/>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs> 
                    {/* <Typography variant="h6">{displayItem.quantity}</Typography> */}
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs> 
                    {/* <Typography variant="h6">{displayItem.factory_n}</Typography> */}
                    {/* <Logo icon={displayItem.factory.icon} click={handleClick}/> */}
                    </Grid>
                </Grid>
            </ListItem>
        
    );
};