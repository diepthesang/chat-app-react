import React from 'react';
import {ChatItem} from "react-chat-elements";
import {Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getConversationId} from "../../state-management/features/conversation/conversation.slice";
import {RootState} from "../../state-management/store";
import {Msg} from "../../state-management/features/get-list-msg/get-list-msg.slice";
import {useNavigate} from "react-router-dom";

const UserMessageBar = (props: any) => {

    const dispatch = useDispatch();
    const listMsg: Msg[] = useSelector((state: RootState) => state.getListMsg.value);
    const navigate = useNavigate();

    const handleTabListMessage = (conversationId: string) => {
        dispatch(getConversationId(conversationId));
    };

    // useEffect(() => {
    //     socket().connect();
    //     setTimeout(() => {
    //         socket().emit('listMsgUser', '');
    //         socket().on('listMsgUser', (_listMsg: any) => {
    //             console.log('_listMsg:::', _listMsg);
    //             dispatch(getListMsg(_listMsg));
    //         });
    //     }, 1000);
    //     // return () => {
    //     //     socket.off('listMsgUser');
    //     //     socket.disconnect();
    //     // }
    // }, []);

    return (
        <Col>
            <div style={{
                height: '80vh',
                overflow: 'scroll',
                marginLeft: -10,
                marginRight: -11,
                overflowX: 'hidden'
            }}>
                {listMsg.map((item?: any) => {
                    return <div
                        key={item.id}
                    >
                        <ChatItem
                            className={'margin-message-item'}
                            avatar={item.avt_img_path || 'https://bharatflux.com/wp-content/uploads/2020/04/IMG-20200404-WA0003.jpg'}
                            alt="kursat_avatar"
                            title={item.first_name + ' ' + item.last_name}
                            subtitle={item.text}
                            date={item.created_at}
                            unread={2}
                            onClick={() => {
                                console.log('conversationId', item.conversation_id);
                                handleTabListMessage(item.conversation_id as string);
                                navigate(`/${item.conversation_id}`);
                            }}
                            {...(props)}
                        />
                    </div>

                })}
            </div>
        </Col>
    );
};

export default UserMessageBar;
