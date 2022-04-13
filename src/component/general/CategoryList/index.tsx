import React from 'react';
import {IconGroup} from "../IconGroup";

import {AllICons} from "../../../util/Model";

interface Props {
    categoriesNames: string[];
    chooseCategory: (c:string) => void;
}

export function CategoryList(props: Props) {
    const {categoriesNames, chooseCategory} = props;

    const categoriesIcons = AllICons.filter(i => categoriesNames.includes(i.id));

    return (
       <IconGroup icons={categoriesIcons} select={chooseCategory} />
    );
}