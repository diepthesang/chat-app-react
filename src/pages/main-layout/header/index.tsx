import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import MyAvatar from "../../../components/my-avatar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../state-management/store";
import {changeEnableSearchModal} from "../../../state-management/features/search-friends/search-friends.slice";
import MyBtn from "../../../components/my-btn";
import {BiSearchAlt2} from "@react-icons/all-files/bi/BiSearchAlt2";
import MyNotification from "../../../components/my-notification";
import {mainColor} from "../../../common/color";
import {TiMessageTyping} from "@react-icons/all-files/ti/TiMessageTyping";

const Header = () => {


    const enableSearchModal = useSelector((state: RootState) => state.enableSearchModal.value);
    const dispatch = useDispatch()

    const handleCloseSearchModal = () => dispatch(changeEnableSearchModal({isEnableModal: true}));

    const handleBtnNotification = () => ''

    const handleBtnAvatar = () => ''

    const iconSearch = () => <BiSearchAlt2 style={{width: 30, height: 30}}/>

    const iconNotification = () => <MyNotification/>

    const iconAvatar = () => <MyAvatar diameter={'40px'}/>

    return (
        <Container fluid style={{borderBottom: '2px solid #EAEDF0', backgroundColor: mainColor}}>
            <Row style={{padding: 8}}>
                <Col xs={6} sm={8} md={9} lg={9} xl={10}>
                    <div style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        float: "left",
                        // backgroundColor: 'red',
                        // justifyItems: 'center'
                    }}>
                        <TiMessageTyping style={{width: 40, height: 40}}/>
                        <div>Mess-send-girls</div>
                    </div>
                </Col>
                <Col xs={6} sm={4} md={3} lg={3} xl={2}>
                    <Row>
                        <Col>
                            <MyBtn fn={handleCloseSearchModal} icon={iconSearch}/>
                        </Col>
                        <Col>
                            <MyBtn fn={handleBtnNotification} icon={iconNotification}/>
                        </Col>
                        <Col>
                            <MyBtn fn={handleBtnAvatar} icon={iconAvatar}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
