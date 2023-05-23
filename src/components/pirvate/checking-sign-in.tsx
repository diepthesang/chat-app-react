import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {getBearerRefreshToken, getRole} from "../../common/local-storage";

const CheckingSignIn = () => {
    if (getBearerRefreshToken() && getRole()) {
        return <Navigate to='/' replace={true}/>
    } else {
        return <Outlet/>
    }
};

export default CheckingSignIn;
