import React from 'react';
import {Col, Form, InputGroup, Row} from "react-bootstrap";

const SearchBar = () => {
    return (
        <div>
            <Row>
                <Col xs={6} sm={8} md={9} lg={4} xl={4} xxl={5}
                     style={{
                         fontSize: '24px',
                         fontWeight: 'bold',
                         color: '#081C36'
                     }}>
                    Chats
                </Col>
            </Row>
            <Row className="justify-content-md-center " style={{marginBottom: '12px'}}>
                <Col>
                    <InputGroup size='sm'>
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Col>
            </Row>
        </div>
    );
};

export default SearchBar;
