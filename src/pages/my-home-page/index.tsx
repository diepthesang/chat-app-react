import React from 'react';
import Header from "../main-layout/header";
import MyBody from "../../layout/my-body";
import MyFooter from "../../layout/my-footer";

const MyHomePage = () => {
    return (
        <div>
            <Header/>
            <MyBody/>
            <MyFooter/>
        </div>
    );
};

export default MyHomePage;
