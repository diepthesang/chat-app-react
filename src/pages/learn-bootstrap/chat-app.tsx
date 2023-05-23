import React, {useEffect, useRef, useState} from 'react';
import {socket,} from "../../socket/socket";
import 'react-chat-elements/dist/main.css'
import {getBearerAccessToken, getBearerRefreshToken, getReceiverId, getUserId} from "../../common/local-storage";
import {MessageBox} from "react-chat-elements";
import MyAvatar from "../../components/my-avatar";
import {Button, Form, InputGroup, Row} from "react-bootstrap";
import {mainColor} from "../../common/color";
import {useParams} from "react-router-dom";
import {Chat} from "../../api/chat/chat";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch} from "react-redux";
import {toggleUserOnline} from "../../state-management/features/user-online/user-online.slice";
import {validateMessage} from "../../validation/message-validation";
import {MessageType} from "../../types/message.type";
import {toast} from "react-toastify";


const ChatApp = (props: any) => {

    const TIME_DELAY_FETCH_MORE_MESSAGES = 500;

    const msg = useRef({text: '', conversationId: ''});
    const {conversation_id} = useParams();
    const bottomRef = useRef(null);
    const scrollingRef = useRef(null);
    const lengthListMessage = useRef(0);
    const [messages, setMessages] = useState([]);
    const listMessage = useRef([]);
    const [msgFormState, setMsgFormState] = useState('');
    const [unAuthorized, setUnAuthorized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [endMessage, setEndMessage] = useState(false);
    const dispatch = useDispatch();

    const fetchMoreMessages = async (messages: { conversationId: string, skipMessages: number | string }) => {
        try {
            return await Chat.fetchMessagesByConversationBeSkipped({
                conversationId: messages.conversationId,
                skipMessages: messages.skipMessages
            });
        } catch (error) {
            console.log({error_fetchMoreMessage: error})
        }
    }

    // gui tin nhan
    const emitEventChat = async (message: MessageType) => {
        try {
            const _messageValue = await validateMessage(message);
            if (!_messageValue || Object.keys(_messageValue).length === 0) return
            msg.current = _messageValue;
            socket.emit('chat' as any, msg.current, (response: any) => {
                console.log({response_emit_chat: response})
                // hien toast
                if(response) toast.warn('Unable to send message');
            });
        } catch (error) {
            console.log({error_emitEventChat: error});
            toast.warn((error as any).message)
        }
    }

    const handlePressKeyEnter = async (event: any) => {
        if (event.key === 'Enter') {
            await emitEventChat({
                text: msgFormState,
                conversationId: `${conversation_id}`,
                receiverId: getReceiverId() as string
            });
            setMsgFormState('');
        }
    }

    const handleSendBtn = async () => {
        await emitEventChat({
            text: msgFormState,
            conversationId: `${conversation_id}`,
            receiverId: getReceiverId() as string
        });
        setMsgFormState('');
    }

    const handleOnChangeMsgForm = (event: React.ChangeEvent<any>) => {
        return setMsgFormState(event.target.value);
    };

    const fetchMoreMessagesWheneverScrollTop = async () => {
        try {
            setTimeout(async () => {
                const _messages = await fetchMoreMessages({
                    conversationId: conversation_id as string,
                    skipMessages: lengthListMessage.current
                });
                // khi tai het message thi setEndMessage(true) va nguoc lai
                _messages?.data.message.length === 0 ? setEndMessage(true) : setEndMessage(false);
                listMessage.current = [...listMessage.current, ..._messages?.data.message] as never[];
                // cap nhat do dai cua listMessage
                lengthListMessage.current = listMessage.current.length;
                // convert listMessage to component to render
                convertMessagesDataToMessageBoxComponent(listMessage.current);
            }, TIME_DELAY_FETCH_MORE_MESSAGES)
        } catch (error) {
            console.log({error_fetchMoreMessagesWheneverScrollTop: error});
        }

    }

    const convertMessagesDataToMessageBoxComponent = (messages: any) => {
        console.log({messages})
        // const reverseMessages = messages.slice().reverse();
        const _msg = messages.map((item: any) => {
            if (item.sender.id === `${getUserId()}`) {
                return <MessageBox
                    key={item.id}
                    renderAddCmp={
                        () => {
                            return <div style={{float: 'right', marginRight: '10px'}}>
                                <MyAvatar diameter={'30px'} urlAvt={item.sender.avtImgPath}/>
                            </div>
                        }
                    }
                    styles={{backgroundColor: '#E5EFFF'}}
                    position='right'
                    title={item.sender.firstName + ' ' + item.sender.lastName}
                    type='text'
                    text={item.text}
                    date={item.createdAt}
                    replyButton={true}
                    {...(props)}
                />
            } else {
                return <MessageBox
                    key={item.id}
                    renderAddCmp={
                        () => {
                            return (<div style={{float: 'left'}}>
                                <MyAvatar diameter={'30px'} urlAvt={item.sender.avtImgPath}/>
                            </div>)
                        }
                    }
                    position='left'
                    title={item.sender.firstName + ' ' + item.sender.lastName}
                    type='text'
                    text={item.text}
                    date={item.createdAt}
                    replyButton={true}
                    {...(props)}
                />
            }

        });
        setMessages(_msg as any);
        return _msg
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`<><><><><><><> socket is connected - ${socket.id}  <><><><><><><>`);
            console.log({socket_connected: socket});
            console.log({sendBuffer: socket.sendBuffer})
            dispatch(toggleUserOnline({isUserOnline: true}))
        });

        socket.on('connect_error', (error: any) => {
            console.log({connect_error: error})
        })

        socket.on('client_disconnected', (clientInformation: any) => {
            console.log({clientInformation})
        })

        // _socket.of

        socket.on('chat' as any, (message: any) => {
            console.log('receiver nhan message ______', [message]);
            // tranh viec tin nhan load khong dung cuoc hoi thoai
            if (message.conversation.id !== conversation_id) return;
            listMessage.current = [...[message], ...listMessage.current] as never[];
            lengthListMessage.current = listMessage.current.length;

            //  convert listMessage to component
            convertMessagesDataToMessageBoxComponent(listMessage.current);
        });

        socket.on('error', async (exception) => {
            try {
                // handle exception 'jwt expired'
                if (exception === 'jwt expired') socket.emit('refresh_token' as any, getBearerRefreshToken());
            } catch (error) {
                console.log({error_socket_on_error: error})
            }
        });

        socket.on('refresh_token' as any, (accessToken: string) => {
            try {
                console.log({'new_access_Token': accessToken})
                // save access_token to localStorage
                localStorage.setItem('access_token', `Bearer ${accessToken}`);
                (socket.auth as any).token = getBearerAccessToken();
                // bat buoc fai ngat ket noi sau khi co token moi
                socket.disconnect().connect();
            } catch (error) {
                console.log({error_socket_on_refreshToken: error})
            }
        });

        socket.onAny((event, ...args) => {
            if (event === 'refresh_token') socket.emit('chat' as any, msg.current)
        });

        socket.prependAnyOutgoing((event, ...args) => {
            console.log({'prependAnyOutgoing...args': args});
            if (event === 'chat') msg.current = args[0];
        });

        return () => {
            socket.off('chat' as any);
            socket.off('error' as any);
            socket.off('refresh_token' as any);
        }
    }, [conversation_id]);

    useEffect(() => {
        if (!conversation_id) return;
        setTimeout(async () => {
                const messages = await fetchMoreMessages({
                    conversationId: conversation_id as string,
                    skipMessages: lengthListMessage.current
                });
                listMessage.current = [...listMessage.current, ...messages?.data.message] as never[];
                lengthListMessage.current = listMessage.current.length;
                convertMessagesDataToMessageBoxComponent(listMessage.current);
            },
            TIME_DELAY_FETCH_MORE_MESSAGES)

    }, [conversation_id])

    useEffect(() => {
        (bottomRef.current as any).scrollIntoView({behavior: "smooth"});
    }, [listMessage.current]);

    return (
        <div style={{backgroundColor: '#DEE1E9'}} ref={scrollingRef}>
            <div
                id="scrollableDiv"
                style={{
                    height: '76vh',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    marginTop: '10px',
                    paddingBottom: '8px',
                }}
            >
                <div ref={bottomRef}></div>
                <InfiniteScroll
                    style={{display: 'flex', flexDirection: 'column-reverse'}}
                    inverse={true}
                    dataLength={listMessage.current.length}
                    next={fetchMoreMessagesWheneverScrollTop}
                    hasMore={!endMessage}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    scrollableTarget="scrollableDiv"
                >
                    {messages}
                </InfiniteScroll>
            </div>
            <Row>
                <InputGroup className="mb-1" style={{marginTop: '32px'}}>
                    <Form.Control
                        style={{marginRight: '4px'}}
                        placeholder="typing..."
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handleOnChangeMsgForm}
                        onKeyDown={handlePressKeyEnter}
                        value={msgFormState}
                    />
                    <Button style={{backgroundColor: mainColor}} onClick={handleSendBtn}>Send</Button>
                </InputGroup>
            </Row>
        </div>
    )
};

export default ChatApp;