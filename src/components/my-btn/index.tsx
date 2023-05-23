import React, {useState} from 'react';
import {mainBackgroundColor} from "../../common/color";

const MyBtn = ({fn, icon}: { fn: Function, icon: Function }) => {

    const [isMouseEnter, setIsMouseEnter] = useState(false);

    return (
        <div style={{
            backgroundColor: isMouseEnter ? mainBackgroundColor : '',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            cursor: 'pointer',
            width: 44,
            height: 44
        }}
             onClick={() => fn()}
             onMouseEnter={() => {
                 console.log('mouse')
                 setIsMouseEnter(true)
             }}
             onMouseLeave={() => {
                 console.log('move')
                 setIsMouseEnter(false)
             }}
        >
            {icon()}
        </div>
    );
};

export default MyBtn;
