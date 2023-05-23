import React from 'react';
import {Desktop, Mobile, Tablet} from "../../common/device-reponsive";

const MyFooter = () => {
    return (
        <div>
            <Desktop>
                des-footer
            </Desktop>
            <Tablet>
                tab-footer
            </Tablet>
            <Mobile>
                mobile-footer
            </Mobile>
        </div>
    );
};

export default MyFooter;
