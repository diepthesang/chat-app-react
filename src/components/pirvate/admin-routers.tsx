import {useRoleCache} from "../../api/cache/cache";
import {Navigate, Outlet} from "react-router-dom";
import Loading from "../loading/loading";
import React from "react";

const AdminRouters = () => {
    const {data, error,} = useRoleCache();

    if (data) {
        console.log('data::::', data);
        if (data.data.message.role === 'admin') {
            return <Outlet/>
        }
    }
    if (error) {
        console.log('err:::', error)
        return <Navigate to='/sign_in'/>
    }
    return <Loading/>
};

export default AdminRouters;