import React from 'react';
import SearchBar from "./search-bar";
import UserMessageBar from "./user-message-bar";
import {Row} from "react-bootstrap";

const LeftSideLayout = () => {

    return (
        <div>
            <Row>
                <SearchBar/>
            </Row>
            <Row>
                <UserMessageBar/>
            </Row>
        </div>
    );
};

export default LeftSideLayout;
