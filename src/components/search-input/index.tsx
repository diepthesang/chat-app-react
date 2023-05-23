import React from 'react';
import {Form, InputGroup} from "react-bootstrap";

const SearchInput = () => {
    return (
        <InputGroup className="mb-3">
            <Form.Control
                size='sm'
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </InputGroup>

    );
};

export default SearchInput;
