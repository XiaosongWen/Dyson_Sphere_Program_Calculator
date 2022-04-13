import React, {useEffect, useState} from 'react';

import {Icon} from "../../../util/constants"
import data from "../../../asset/dsp/data.json";
import {IconGroup} from "../IconGroup";

interface Props {
    itemList: string[];
    chooseItem: (c:string) => void;
}

const icons = data['icons'];
const allItems = data['items']

export function ItemTable(props: Props) {
    const {itemList, chooseItem}= props;
    const [iconList, setIconList] = useState<Icon[][]>([]);

    useEffect(()=> {
        let list = [];
        let row = 0;
        while (true) {
            // eslint-disable-next-line no-loop-func
            const tmp = allItems.filter(i => i.row === row && itemList.includes(i.id)).map(i => i.id);
            if (tmp.length === 0) {
                break;
            }
            list.push(icons.filter(i => tmp.includes(i.id)));
            row++;
        }
        setIconList(list);
    }, [itemList]);
    return (
        <div>
            {
                iconList.map((list) => {
                    return <IconGroup icons={list} select={chooseItem} />
                })
            }
        </div>
    );
}