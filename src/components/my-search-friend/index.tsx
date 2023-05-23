import React from 'react';
import {AiOutlineSearch} from "@react-icons/all-files/ai/AiOutlineSearch";

const MySearchFriend = ({fn}: { fn: Function }) => {
    return (
        <AiOutlineSearch
            style={{width: 30, height: 30, cursor: "pointer"}}
            onClick={() => fn()}

        />
    );
};

export default MySearchFriend;
