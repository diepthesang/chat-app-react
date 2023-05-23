import React from 'react';
import {IoNotifications} from "@react-icons/all-files/io5/IoNotifications";

const MyNotification = () => {
    return (
        <div style={{
            position: 'absolute',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'red',
                position: "inherit",
                top: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <p style={{color: 'white', fontSize: '14px', margin: -100}}>99</p>
            </div>
            <IoNotifications style={{width: 38, height: 38, paddingTop: 8}}/>
        </div>
    );
};

export default MyNotification;
// style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}