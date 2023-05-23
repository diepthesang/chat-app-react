import React from 'react';
import {Row} from "react-bootstrap";
import UserInfoCenterLayout from "./user-info-center-layout";
import ChatApp from "../learn-bootstrap/chat-app";

const CenterLayout = () => {
    return (
        <div>
            <Row>
                <UserInfoCenterLayout/>
            </Row>
            <Row>
                <ChatApp props={{} as any}/>
            </Row>
        </div>
    );
};

export default CenterLayout;
