import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import MyAvatar from "../../components/my-avatar";
import {FaPhoneAlt} from "@react-icons/all-files/fa/FaPhoneAlt";
import {BsFillCameraVideoFill} from "@react-icons/all-files/bs/BsFillCameraVideoFill";
import {useDispatch} from "react-redux";
import {changeEnableUserInfo} from "../../state-management/features/enable-user-info/enable-user-info.slice";
import MyBtn from "../../components/my-btn";
import {AiFillInfoCircle} from "@react-icons/all-files/ai/AiFillInfoCircle";
import {mainBackgroundColor} from "../../common/color";
import {socket} from "../../socket/socket";
import {getReceiverId} from "../../common/local-storage";
import {User} from "../../api/user/user";
import moment from "moment";

const UserInfoCenterLayout = () => {

    const [isUserOnline, setIsUserOnline] = useState(false);

    const [userInfo, setUserInfo] = useState({fullName: '', avtImgPath: ''});
    const [offlineAt, setOfflineAt] = useState('');

    // const isUserOnline = useSelector((state: RootState) => state.toggleUserOnline.value);

    const dispatch = useDispatch()
    const handleBtnUserInfo = () => {
        console.log('userInfo')
        dispatch(changeEnableUserInfo())
    };

    const handleBtnVideoCall = () => ''

    const handleBtnPhoneCall = () => ''

    const iconUserInfo = () => <AiFillInfoCircle style={{width: 20, height: 20}}/>

    const iconVideoCall = () => <BsFillCameraVideoFill style={{width: 20, height: 20}}/>

    const iconPhoneCall = () => <FaPhoneAlt style={{width: 20, height: 20}}/>

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('user_state' as any);
        })
        socket.on('user_state' as any, (userState: any) => {
            try {
                console.log({list_user_online: userState})
                userState.forEach((user: any) => {
                    if (user.state === 'online' && user.userId === getReceiverId()) {
                        setOfflineAt('');
                        setIsUserOnline(true);
                        return;
                    }

                    if (user.state === 'offline' && user.userId === getReceiverId()) {
                        console.log({client_delete_at: user.client_deleted_at})
                        const now = moment();
                        const pastTime = moment(user.offlineAt);
                        const diff = now.diff(pastTime, 'minutes');
                        const formattedDiff = moment.duration(diff, "minutes").humanize(true);
                        setOfflineAt(`${formattedDiff}`);
                        setIsUserOnline(false)
                        return;
                    }
                })

                // usersOnline.some((user: any) => {
                //
                //     return (user.client_client_id === getReceiverId() && user.client_deleted_at === null)
                // })

            } catch (error) {
                console.log({error_socket_on_user_online: error});
            }
        })

    }, [isUserOnline]);

    useEffect(() => {
        User.fetchUserByUserId(getReceiverId() as string)
            .then(data => {
                console.log({fullName: data.data.message.fullName})
                setUserInfo({
                    fullName: data.data.message.fullName,
                    avtImgPath: data.data.message.avtImgPath
                })
            })
            .catch(error => {
                console.log({error_fetchUserByUserId: error})
            })
    }, []);

    return (
        <div>
            <Row style={{borderBottom: `2px solid ${mainBackgroundColor}`, padding: 8}}>
                <Col xxl={8} xl={9} lg={7} md={7} sm={9} xs={7}
                     style={{
                         display: 'inline-flex',
                         alignItems: 'center'
                     }}>
                    <MyAvatar diameter={'50px'} urlAvt={`${userInfo.avtImgPath}`}/>
                    <Row>
                        <Col xs={12}
                             style={{
                                 display: 'inline-flex',
                                 alignItems: 'center'
                             }}>
                            <p style={{
                                paddingLeft: 8,
                                margin: 'auto',
                                marginLeft: 4,
                            }}>
                                {userInfo.fullName}
                            </p>
                            <div style={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                backgroundColor: isUserOnline ? '#0FE710' : 'red',
                                marginLeft: 10,
                                marginRight: 12
                            }}/>
                            <div style={{
                                color: '#7E838C',
                                fontSize: '14px'
                            }}>{offlineAt ? `offline ${offlineAt}` : ''}</div>

                        </Col>
                    </Row>
                </Col>
                <Col xxl={4} xl={3} md={5} lg={5} sm={3} xs={5}
                     style={{
                         justifyContent: 'center',
                         display: 'flex',
                         alignItems: 'center',
                     }}>
                    <Row>
                        <Col>
                            <MyBtn fn={handleBtnPhoneCall} icon={iconPhoneCall}/>
                        </Col>
                        <Col>
                            <MyBtn fn={handleBtnVideoCall} icon={iconVideoCall}/>
                        </Col>
                        <Col>
                            <MyBtn fn={handleBtnUserInfo} icon={iconUserInfo}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default UserInfoCenterLayout;
