import React from 'react';
import Header from "./header";
import Body from "./body";
import {mainBackgroundColor} from "../../common/color";

const MainLayout = () => {


    return (
        <div style={{border: `2px solid ${mainBackgroundColor}`}}>
            <Header/>
            <Body/>
        </div>
    );
};

export default MainLayout;
