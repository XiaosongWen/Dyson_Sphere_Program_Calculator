import * as React from 'react';
import { SelectedItem, TreeNode } from '../../../util/utils';
import { MyListItem } from '../MyListItem';
type Props = {
    displayList: SelectedItem[];
};
export function MyList(props: Props) {
    const {displayList} = props;
    
    const renderList = () => {
        return (
            displayList.map((item, i) => <MyListItem displayItem={item} key={i}/>) 
        );
    }
    return (
        <>
        {
            displayList.length == 0 ? ("") : (
                renderList()
            )        
        }
        </>
    );
};