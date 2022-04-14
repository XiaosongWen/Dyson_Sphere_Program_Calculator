import React from 'react';
import {IconGroup} from "../IconGroup";

import {AllCategories, Category} from "../../../model/Model";

interface Props {
    categories: Category[];
    chooseCategory: (c:Category) => void;
}

export function CategoryList(props: Props) {
    const {categories, chooseCategory} = props;
    const icons = categories.map(c => c.getIcon());
    const click = (name:string) => {
        chooseCategory(AllCategories.filter(c => c.id === name)[0]);
    }
    return (
       <IconGroup icons={icons} click={click} />
    );
}