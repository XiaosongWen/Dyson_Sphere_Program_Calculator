import React from 'react';
import {IconGroup} from "../IconGroup";

import data from "../../../asset/dsp/data.json";

interface Props {
    categoriesNames: string[];
    chooseCategory: (c:string) => void;
}

export function CategoryList(props: Props) {
    const {categoriesNames, chooseCategory} = props;
    const icons = data['icons'];
    const categoriesIcons = icons.filter(i => categoriesNames.includes(i.id));

    return (
       <IconGroup icons={categoriesIcons} select={chooseCategory} />
    );
}