import { Grid, ListItem, makeStyles} from '@material-ui/core';
import { Divider } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Factory, OutMap, Recipe } from '../../../model/Model';
import { SelectedItem } from '../../../util/utils';
import { ChooseItem } from '../ChooseItem';
import { Logo } from '../Logo';

type Props = {
    displayItem: SelectedItem;
};

const useStyles = makeStyles((theme) => ({
    
}));

  
export function MyListItem(props: Props) {
    const {displayItem} = props
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [curRecipeIdx, setCurRecipeIdx] = useState<number>(0);
    const [producers, setProducers] = useState<Factory[]>([]);
    const [selectedFactoryIdx, setSelectedFactoryIdx] = useState<number>(0);
    const [childrenItems, setChildrenItems] = useState<number>();

    const classes = useStyles();

    const chooseFactory = (index: number) => {
        setSelectedFactoryIdx(index);
        
    }
    
    const chooseRecipe = () => {
        console.log("chooseRecipe");
    }
    
    
    const calculateNumofFactory = () => {
        let n = 0;
        if (recipes.length > 0){
            const recipe = recipes[curRecipeIdx];
            const factory = recipe.producers[selectedFactoryIdx];
            n = displayItem.speed * recipe.time / recipe.out.get(displayItem.item)!/factory.speed;
        }
        return n;
    }
    

    useEffect(()=> {
        console.log("display Item", displayItem);
        const curRecipes = OutMap.get(displayItem.item)!;
        setRecipes(curRecipes); 
        setProducers(curRecipes[selectedFactoryIdx].producers);
        console.log("curRecipes", curRecipes);
    }, [displayItem])

    const calculatePower = () => {
        let p = 0;
        if ( producers[selectedFactoryIdx]) {
            p = calculateNumofFactory() * producers[selectedFactoryIdx].usage;
        }
        return p;
    }
    return (
        
        <ListItem>
            <Grid container spacing={2} >
                <Grid item xs={4}>       
                    <Logo icon={displayItem.item.icon} click={chooseRecipe}/>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={1}>
                    <span>{displayItem.speed} {displayItem.unit}</span>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={2}> 
                    {calculateNumofFactory().toFixed(2)}
                    {
                        producers.length > 0 ?
                            <ChooseItem 
                                choose ={chooseFactory} 
                                itemList={producers}
                                selectedIdx={selectedFactoryIdx}
                            /> 
                            : ""
                    }
                   
                </Grid>
                <Divider orientation="vertical" flexItem />
                {calculatePower()}
            </Grid>
            {
                
            }
        </ListItem>
        
        
    );
};