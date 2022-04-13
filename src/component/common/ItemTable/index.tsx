import React, {useEffect, useState} from 'react';

import {IconGroup} from "../IconGroup";

import {Icon, AllItems, Item, AllCategories} from "../../../util/Model";

interface Props {
    itemList: Item[];
    chooseItem: (item:Item) => void;
}


export function ItemTable(props: Props) {
    const {itemList, chooseItem}= props;
    const [iconList, setIconList] = useState<Icon[][]>([]);

    useEffect(()=> {
        let list = [];
        let row = 0;
        //TODO: need refactry
        const itemName = itemList.map(i=> i.id);
        while (true) {
            // eslint-disable-next-line no-loop-func
            const tmp = AllItems.filter(i => i.row === row && itemName.includes(i.id)).map(i => i.icon);
            if (tmp.length === 0) {
                break;
            }
            list.push(tmp);
            row++;
        }
        setIconList(list);
    }, [itemList]);

    const click = (name: string) => {

        chooseItem(AllItems.filter(i => i.id === name)[0]);

    }
    return (
        <div>
            {
                iconList.map((list, index) => {
                    return <IconGroup key={index} icons={list} click={click} />
                })
            }
        </div>
    );
}