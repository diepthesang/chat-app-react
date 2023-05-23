import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import LeftSideLayout from "../left-side-layout";
import CenterLayout from "../center-layout";
import RightSideLayout from "../right-side-layout";
import {useSelector} from "react-redux";
import {RootState} from "../../../state-management/store";
import {mainBackgroundColor, mainColor} from "../../../common/color";

const Body = () => {
    const enableUserInfo = useSelector((state: RootState) => state.enableUserInfo.value);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} sm={12} md={4} lg={3}
                     style={{
                         backgroundColor: mainColor,
                         borderRight: `2px solid ${mainBackgroundColor}`
                     }}>
                    <LeftSideLayout/>
                </Col>
                <Col lg={enableUserInfo ? 7 : 9} md={8}
                     className={'d-none d-md-block d-lg-block'}
                     style={{
                         backgroundColor: 'white',
                         borderRight: `2px solid ${mainBackgroundColor}`
                     }}>
                    <CenterLayout/>
                </Col>
                {
                    enableUserInfo
                    &&
                    <Col lg={2}
                         className={'d-none  d-lg-block'}
                         style={{backgroundColor: 'yellow',}}>
                        <RightSideLayout/>
                    </Col>
                }
            </Row>
        </Container>
    );
};

export default Body;
