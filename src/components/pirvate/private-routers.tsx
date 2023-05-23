import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {getBearerRefreshToken, getRole} from "../../common/local-storage";

type RoleType = string[];

const PrivateRoutes = ({role}: { role: RoleType }) => {
    const isExistRole = role.some((element: string) => element === getRole());
    if (isExistRole && getBearerRefreshToken()) {
        return <Outlet/>
    } else {
        return <Navigate to='/sign_in' replace={true}/>
    }
};

export default PrivateRoutes;
