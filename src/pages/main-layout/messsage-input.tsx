import React from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {mainColor} from "../../common/color";

const MessageInput = () => {
    return (
        <InputGroup className="mt-2">
            <Form.Control
                style={{marginRight: '4px'}}
                placeholder="typing..."
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
            <Button style={{backgroundColor: mainColor}}>Send</Button>
        </InputGroup>
    );
};

export default MessageInput;
