import React from 'react';
import {getTimeCountDown} from "../../common/local-storage";
import {Navigate, Outlet} from "react-router-dom";
import {TIME_COUNT_DOWN} from "../../constant/constant";

const CheckingSendOtp = () => {
    const _time = Number(Date.now() + TIME_COUNT_DOWN) - Number(getTimeCountDown());

    if (!getTimeCountDown() || _time > TIME_COUNT_DOWN + 1000) {
        return <Navigate to='sign_up'/>
    } else {
        return <Outlet/>
    }
};

export default CheckingSendOtp;
