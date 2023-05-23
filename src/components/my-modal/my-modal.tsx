import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../state-management/store";
import {changeEnableSearchModal} from "../../state-management/features/search-friends/search-friends.slice";
import {User} from "../../api/user/user";
import {toast} from "react-toastify";
import {getReceiverId, getUserId} from "../../common/local-storage";
import {Group} from "../../api/group/group";
import {getConversationId} from "../../state-management/features/conversation/conversation.slice";
import {getReceiver} from "../../state-management/features/get-receiver/get-receiver.slice";
import {Friend} from "../../api/friend/friend";
import MyDropdown from "../my-dropdown/My-dropdown";

const MyModal = () => {

    enum enumRelation {
        'ADD_FRIEND' = 'Add friend',
        'CANCEL_FRIEND_REQUEST' = 'Cancel'
    }

    const initialUserInfo = {
        id: '',
        email: '',
        fullName: '',
        avtImgPath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAUvIj8tIlcc6MemlkLaXGlOLNplzf-3euA&usqp=CAU'
    }
    const enableSearchModal = useSelector((state: RootState) => state.enableSearchModal.value);
    const dispatch = useDispatch();
    const [emailState, setEmailState] = useState('');
    const [userInfoState, setUserInfoState] = useState(initialUserInfo);
    const [errState, setErrState] = useState('');
    const [statusAddFriendState, setStatusAddFriendState] = useState('Add friend');
    const [receiverId, setReceiverId] = useState('');
    const [isShowButtonAddFriend, setIsShowButtonAddFriend] = useState(true);

    const handleClose = () => dispatch(changeEnableSearchModal({isEnableModal: false}));


    const handleOnChangeInputSearchFriend = async (event: any) => {
        setErrState('');
        const _email = event.target.value;
        console.log({_email})
        setEmailState(_email);
    };

    const findUserByEmail = async (email: string) => {
        try {
            return await User.findUserByEmail(email);
        } catch (error: any) {
            console.log({error_findUserByEmail: error.response.data.message});
            setErrState((error as any).response.statusText);
            setUserInfoState({...initialUserInfo});
            toast.warn((error as any).response.data.message);
        }
    };

    // send request add friend
    const addFriend = async (userId: string) => {
        try {
            const response = await Friend.addFriend(userId);
            setStatusAddFriendState(enumRelation.CANCEL_FRIEND_REQUEST)
            toast.success(response.data.message);
        } catch (error: any) {
            console.log({error_addFriend: error});
            toast.error(error.response.data.message)
        }
    }

    const cancelFriendRequest = async (userId: string) => {
        try {
            const response = await Friend.cancelFriendRequest(userId);
            setStatusAddFriendState(enumRelation.ADD_FRIEND)
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }


    const saveReceiverIdToLocalStorage = (userId: string) => localStorage.setItem('receiver_id', userId);

    const fetchUsersRelationshipStatus = async (userId: string) => {
        try {
            return await Friend.fetchFriendRelationshipStatus(userId);
        } catch (error: any) {
            console.log({error_fetchFriendRelationshipStatus: error})
            if (error.response.data.message === 'Not Found') {
                setIsShowButtonAddFriend(true)
                setStatusAddFriendState('Add friend');
            }

            if (error.response.data.message === 'Not Acceptable') setIsShowButtonAddFriend(false);
        }
    }

    // handle btn search
    const handleBtnSearch = async (event: any) => {
        event.preventDefault();
        const responseUser: any = await findUserByEmail(emailState);

        // luu thong tin vao local storage
        saveReceiverIdToLocalStorage((responseUser as any).data.message.id);

        setUserInfoState(responseUser.data.message);
        setReceiverId(responseUser.data.message.id);

        // get status friend
        const status: any = await fetchUsersRelationshipStatus(`${getReceiverId()}`);
        console.log({responseStatus: status});
        // hien nut btn add_friend

        if (status.data.message === 'pending') {
            setIsShowButtonAddFriend(true)
            setStatusAddFriendState('Cancel')
        }
        if (status.data.message === 'friend') {
            setIsShowButtonAddFriend(true)
            setStatusAddFriendState('Friend')
        }
    }

    // handle btn add friend
    const handleBtnAddFriend = () => {
        console.log({handleBtnAddFriend: statusAddFriendState})
        if (statusAddFriendState === 'Add friend') return addFriend(getReceiverId() as string)
        if (statusAddFriendState === 'Cancel') return cancelFriendRequest(getReceiverId() as string)

    }


    const handleBtnChat = async () => {
        try {
            localStorage.setItem('receiver_id', userInfoState.id);
            dispatch(getReceiver({receiverId: `${userInfoState.id}`}));
            const data = await Group.getConversationForGroupTwoMembers(userInfoState.id);
            if (!data || Object.keys(data).length === 0) return;
            const conversationId = data?.data.message[0].conversation_id;
            dispatch(getConversationId(conversationId));
            localStorage.setItem('last_conversation_id', conversationId);
            dispatch(changeEnableSearchModal({isEnableModal: false}));
            // chuyen trang
            setTimeout(() => {
                window.location.href = `/${conversationId}`
            }, 500)
        } catch (error) {
            console.log('__err_Group.getConversationForGroupTwoMembers_', error)
        }
    }

    // handle drop down
    const handleBtnDropdown = async () => {
        console.log('handle drop down');

    }

    useEffect(() => {
        setErrState('');
    }, []);

    return (
        <div>
            <Modal show={enableSearchModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Find friends</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col lg={9}>
                                    <Form.Group className="" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter your friend'name"
                                                      onChange={handleOnChangeInputSearchFriend}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="primary" type="submit" onClick={handleBtnSearch}>
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                {userInfoState.id !== '' &&
                    <Container>
                        <Row style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }}>
                            <Col xxl={2} style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                            }}>
                                <img
                                    style={{borderRadius: '50%'}}
                                    src={userInfoState.avtImgPath || initialUserInfo.avtImgPath}
                                    alt="" width={50} height={50}
                                />
                            </Col>
                            <Col xxl={5} style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                cursor: 'pointer'
                            }}>
                                <Container>
                                    <Row>
                                        {userInfoState.fullName}
                                    </Row>
                                    <Row>
                                        {userInfoState.email}
                                    </Row>
                                </Container>
                            </Col>
                            <Col xxl={5}>
                                {/*<Container>*/}
                                <Row>
                                    <Col xxl={6}
                                         style={{
                                             alignItems: 'center',
                                             display: 'flex',
                                             justifyContent: 'center',
                                         }}>
                                        {
                                            isShowButtonAddFriend
                                            &&
                                            <Button variant="primary" size='sm' onClick={handleBtnAddFriend}
                                                    style={{textAlign: 'center', display: 'inline'}}>
                                                {statusAddFriendState}
                                            </Button>
                                        }
                                    </Col>
                                    <Col xxl={3}
                                         style={{
                                             alignItems: 'center',
                                             display: 'flex',
                                             // justifyContent: 'center',
                                         }}>
                                        {
                                            userInfoState.id !== getUserId() &&
                                            <Button variant="primary" size='sm' type="submit"
                                                    onClick={handleBtnChat}>
                                                Chat
                                            </Button>}
                                    </Col>
                                    <Col xxl={3} style={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        // justifyContent: 'center',
                                    }}>
                                        {/*<MyBtn fn={handleBtnDropdown} icon={HiOutlineDotsVertical}/>*/}
                                        <MyDropdown/>
                                    </Col>
                                </Row>
                                {/*</Container>*/}
                            </Col>
                        </Row>
                    </Container>
                }
                <ul>
                    {errState !== '' && <li>{errState}</li>}
                </ul>
            </Modal>
        </div>
    );
};

export default MyModal;
