import React from 'react';
import {Col, Row} from "react-bootstrap";
import Avatar from "../../components/my-avatar";
import {Desktop} from "../../common/device-reponsive";

const UserInfoLayout = () => {
    return (
        <Desktop>
            <Col lg={12} style={{backgroundColor: 'green'}}>
                <Row style={{padding: '12px 0'}}>
                    <Col lg={12} style={{backgroundColor: 'red', display: 'flex', justifyContent: 'center'}}>
                        <Avatar
                            diameter={'100px'}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} style={{backgroundColor: 'red', display: 'flex', justifyContent: 'center'}}>
                        <p>user name</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} style={{backgroundColor: 'red', display: 'flex', justifyContent: 'center'}}>
                        <p>active now</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}
                         style={{
                             backgroundColor: 'red',
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center'
                         }}>
                        <p>icon1</p>
                    </Col>
                    <Col lg={4}
                         style={{
                             backgroundColor: 'red',
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center'
                         }}>
                        <p>icon 2</p>
                    </Col>
                    <Col lg={4}
                         style={{
                             backgroundColor: 'red',
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center'
                         }}>
                        <p>icon 3</p>
                    </Col>
                </Row>
            </Col>
        </Desktop>
    );
};

export default UserInfoLayout;
