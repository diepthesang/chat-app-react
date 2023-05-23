import React from 'react';
import Countdown from "react-countdown";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const CountDownTime = () => {
    const navigate = useNavigate();

    const Completion = () => <span>Time out!</span>;

    const renderer = ({
                          seconds,
                          completed
                      }: { seconds: any, completed: any }) => {
        if (completed) {
            return <Completion/>;
        } else {
            return <span>{seconds} s</span>;
        }
    };

    return (
        <div>
            <Countdown onComplete={() => {
                console.log('vi khong gia hang dk time count down')
                toast.error('Không thể xác thực otp')
                return navigate('/sign_up')
            }} date={Number(localStorage.getItem('time_count_down'))}
                       renderer={renderer}/>
        </div>
    );
};

export default CountDownTime;
