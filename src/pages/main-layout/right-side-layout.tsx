import React from 'react';
import UserInfoLayout from "./user-info-layout";
import {Container, Row} from "react-bootstrap";

const RightSideLayout = () => {
    return (
        <Container>
            <Row>
                <UserInfoLayout/>
            </Row>
        </Container>
    );
};

export default RightSideLayout;
