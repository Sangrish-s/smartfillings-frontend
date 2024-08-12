/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */

import React, {FC} from 'react';
import {LayoutType} from "@/utils/type/layout.type";
import SeoHead from "@/components/seo/head";
import AppHeader from "@/layouts/app/components/header";

const AppLayout: FC<LayoutType> = (props) => {
    const {seo, children} = props

    return (
        <div>
            <SeoHead {...seo}/>
            <AppHeader/>
            {children}
        </div>
    );
};

export default AppLayout;