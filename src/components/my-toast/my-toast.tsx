import React from 'react';
import {ToastContainer} from "react-toastify";

const MyToast = () => {
    return (
        <div>
            <ToastContainer hideProgressBar={true} limit={5}/>
        </div>
    );
};

export default MyToast;
