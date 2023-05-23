import React, {useState} from 'react';
import {useMediaQuery} from 'react-responsive'
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import SearchInput from "../components/search-input";

const Desktop = ({children}: any) => {
    const isDesktop = useMediaQuery({minWidth: 992})
    return isDesktop ? children : null
}
const Tablet = ({children}: any) => {
    const isTablet = useMediaQuery({minWidth: 768, maxWidth: 991})
    return isTablet ? children : null
}
const Mobile = ({children}: any) => {
    const isMobile = useMediaQuery({maxWidth: 767})
    return isMobile ? children : null
}
const Default = ({children}: any) => {
    const isNotMobile = useMediaQuery({minWidth: 768})
    return isNotMobile ? children : null
}
const MyLayout = () => {
    const [isSearch, setIsSearch] = useState(false);

    const handleBtnSearch = () => {
        setIsSearch(!isSearch)
    }

    const searchInput = (): any =>
        <InputGroup className="mb-3">
            {/*<InputGroup.Text id="basic-addon1">@</InputGroup.Text>*/}
            <Form.Control
                size='sm'
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </InputGroup>


    return (
        <div>
            <Desktop>Desktop or laptop
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <SearchInput/>
                            </div>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                            icon1
                        </Col>
                    </Row>
                </Container>
            </Desktop>
            <Tablet>Tablet</Tablet>
            <Mobile>Mobile
                <Container>
                    <Row>
                        <Col>
                            <div style={{backgroundColor: 'red', cursor: 'pointer'}}
                                 onClick={handleBtnSearch}
                            >
                                <p>icon search</p>
                            </div>
                            {
                                isSearch
                                &&
                                <div style={{
                                    top: 0,
                                    left: 0,
                                    position: 'absolute',
                                    width: 100,
                                    height: 300,
                                    backgroundColor: 'orange'
                                }}>
                                    <SearchInput/>
                                </div>
                            }
                        </Col>
                        <Col>
                            icon1
                        </Col>
                        <Col>
                            icon1
                        </Col>
                    </Row>
                </Container>
            </Mobile>
            <Default>Not mobile (desktop or laptop or tablet)</Default>
        </div>
    )
};

export default MyLayout;
