import React from 'react';
import {Dropdown, DropdownButton} from "react-bootstrap";
import {getReceiverId} from "../../common/local-storage";
import {Friend} from "../../api/friend/friend";

const MyDropdown = () => {

    const handleBlockUser = async () => {
        try {
            await Friend.blockUser(getReceiverId() as string)
        } catch (error: any) {
            console.log({error_handleBlockUser: error.message})
        }
    }

    return (
        <DropdownButton id="dropdown-basic-button" title="" size='sm'>
            <Dropdown.Item href="#/action-1" onClick={handleBlockUser}>
                Block
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Cancel</Dropdown.Item>
        </DropdownButton>
    );
};

export default MyDropdown;
