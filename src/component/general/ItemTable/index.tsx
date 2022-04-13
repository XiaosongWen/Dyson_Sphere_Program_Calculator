import React, {useEffect, useState} from 'react';

import {IconGroup} from "../IconGroup";

import {Icon, AllICons, AllItems} from "../../../util/Model";

interface Props {
    itemList: string[];
    chooseItem: (c:string) => void;
}


export function ItemTable(props: Props) {
    const {itemList, chooseItem}= props;
    const [iconList, setIconList] = useState<Icon[][]>([]);

    useEffect(()=> {
        let list = [];
        let row = 0;
        while (true) {
            // eslint-disable-next-line no-loop-func
            const tmp = AllItems.filter(i => i.row === row && itemList.includes(i.id)).map(i => i.id);
            if (tmp.length === 0) {
                break;
            }
            list.push(AllICons.filter(i => tmp.includes(i.id)));
            row++;
        }
        setIconList(list);
    }, [itemList]);
    return (
        <div>
            {
                iconList.map((list, index) => {
                    return <IconGroup key={index} icons={list} select={chooseItem} />
                })
            }
        </div>
    );
}