import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/sign-in/sign-in";
import Home from "./pages/home/home";
import SignUp from "./pages/sign-up/sign-up";
import SendOtp from "./pages/send-otp/send-otp";
import PrivateUserRoutes from "./components/pirvate/private-routers";
import AdminRouters from "./components/pirvate/admin-routers";
import Admin from "./pages/admin/admin";
import MyToast from "./components/my-toast/my-toast";
import CheckingSignIn from "./components/pirvate/checking-sign-in";
import CheckingSendOtp from "./components/pirvate/checking-send-otp";
// import RetrieveAccessToken from "./pages/learn-bootstrap/retrieve-access-token";
import MyModal from "./components/my-modal/my-modal";
import {getUserId} from "./common/local-storage";
import {socket} from "./socket/socket";

function App() {

    useEffect(() => {
        // nếu khôg đăng nhap socket bi disconnect
        if (!getUserId()) socket.disconnect()
    }, []);

    return (
        <>
            <Routes>
                <Route element={<PrivateUserRoutes role={['user', 'manager', 'admin']}/>}>
                    <Route index path='/' element={<Home/>}/>
                    <Route index path='/user_id/:user_id/conversation_id/:conversation_id' element={<Home/>}/>
                    <Route index path='/:conversation_id' element={<Home/>}/>
                </Route>
                <Route element={<AdminRouters/>}>
                    <Route path='/admin' element={<Admin/>}/>
                </Route>
                <Route element={<CheckingSignIn/>}>
                    <Route path='/sign_in' element={<SignIn/>}/>
                    <Route path='/sign_up' element={<SignUp/>}/>
                    <Route element={<CheckingSendOtp/>}>
                        <Route path='/send_otp' element={<SendOtp/>}/>
                    </Route>
                </Route>
                {/*<Route path='/retrieve-access-token' element={<RetrieveAccessToken/>}/>*/}
                <Route path='*' element={<>page not found</>}/>
            </Routes>
            <MyToast/>
            <MyModal/>
        </>
    );
}

export default App;
