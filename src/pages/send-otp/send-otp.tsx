import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import CountDownTime from "../../components/count-down-time.tsx/count-down-time";
import {Link, useNavigate} from "react-router-dom";
import {FormSendOtpType} from "../../types/form-send-otp.type";
import {useMutation} from "@tanstack/react-query";
import {Auth} from "../../api/auth/auth";
import {toast} from "react-toastify";
import Loading from "../../components/loading/loading";

const SendOtp = () => {

    const initFormState: FormSendOtpType = {
        OTP: '',
    }
    const [formState, setFormState] = useState<FormSendOtpType>(initFormState);
    const navigate = useNavigate();

    const {
        isLoading,
        mutate,
        error,
        data,
        isError,
        isSuccess,
        reset
    } = useMutation({
        mutationFn: async (body: FormSendOtpType) => {
            return await Auth.sendOtp<FormSendOtpType>(body);
        },
    });

    if (isError) {
        console.log('___error::::')
        let _error = error as any;

        const _listMsgErr = _error.response?.data.message;
        if (Array.isArray(_listMsgErr)) {
            console.log('isMsgErr:::', _listMsgErr)
            _listMsgErr?.forEach((item: string) => toast.warn(item));
        }

        if (_listMsgErr === 'Unauthorized') {
            console.log('err___Unauthorized:::')
            // navigate('/sign-up')
            navigate('/sign_up')
        }
    }

    if (isSuccess) {
        console.log('____data_send_otp:::', data)
        toast.success(data.data.message);
        localStorage.setItem('time_count_down', "0");
        // navigate('/')
        navigate('/sign_in')
    }

    if (isLoading) return <Loading/>

    const handleSendOtpBtn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate(formState);
    };

    const handleOnChange = (name: keyof FormSendOtpType) => {
        return (event: React.ChangeEvent<any>) => {
            setFormState({...formState, [name]: event.target.value})
            if (error || data) return reset();
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <Form method='post' style={{backgroundColor: 'white', padding: 20, borderRadius: 4}}>
                <h1 style={{textAlign: 'center'}}>Send OTP</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>OTP code</Form.Label>
                    <Form.Control type="email" placeholder="Otp code"
                                  onChange={handleOnChange('OTP')}/>
                    <Form.Text className="text-muted">
                        Send a otp code with 6 numbers <CountDownTime/>
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" style={{width: '100%'}}
                        onClick={(event: React.FormEvent<any>) => handleSendOtpBtn(event)}
                >
                    Send
                </Button>
                <div style={{textAlign: 'center'}}><Link to='/sign_up'>Back</Link></div>
            </Form>
        </div>
    );
};

export default SendOtp;
