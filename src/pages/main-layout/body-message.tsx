import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ChatApp from "../learn-bootstrap/chat-app";
import {useMediaQuery} from "react-responsive";

const BodyMessage = () => {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
    return (
        <Container>
            <Row>
                <Col lg={7} style={{backgroundColor: 'gray', borderRight: '4px solid #393A3B'}}>
                    <Row style={{borderBottom: '1px solid #393A3B'}}>
                        <Col lg={2}>
                            <div
                                style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '8px',
                                    marginBottom: '8px'
                                }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: "50%",
                                    backgroundColor: 'blue',

                                }}>
                                </div>
                                <p>
                                    usernames
                                </p>
                            </div>
                        </Col>
                        <Col lg={10}>
                            <div className='float-end'>
                                heheh
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <ChatApp props={{} as any}/>
                    </Row>
                </Col>
            </Row>
        </Container>

    );
};

export default BodyMessage;
