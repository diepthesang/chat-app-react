import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {Auth} from "../../api/auth/auth";
import {toast} from "react-toastify";
import Loading from "../../components/loading/loading";
import {FormSignInType} from "../../types/form-sign-in.type";

const SignIn = () => {
    const initFormState: FormSignInType = {email: '', textPassword: ''}
    const [formState, setFormState] = useState<FormSignInType>(initFormState);
    const navigate = useNavigate();

    const {
        isLoading,
        mutate,
        error,
        data,
        reset,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: async (body: FormSignInType) => {
            return await Auth.signIn<FormSignInType>(body);
        },
    });


    if (isError) {
        let _error = error as any;
        console.log('___isErr___', error)
        const _listMsgErr = _error.response?.data.message;

        if (Array.isArray(_listMsgErr)) {
            console.log('isMsgErr:::', _listMsgErr)
            _listMsgErr?.forEach((item: string) => toast.warn(item));
        }

        if (_listMsgErr === 'Unauthorized') {
            toast.warn(_listMsgErr as string)
        }
    }

    if (isSuccess) {
        console.log('____data_send_otp:::', data)
        toast.success("Login success");
        localStorage.setItem('access_token', `Bearer ${data.data.message.access_token}`)
        localStorage.setItem('refresh_token', `Bearer ${data.data.message.refresh_token}`)
        localStorage.setItem('role', data.data.message.role)
        localStorage.setItem('user_id', data.data.message.userId)
        window.location.href = '/';
    }

    if (isLoading) return <Loading/>

    const handleSignInBtn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate(formState);
        console.log('formState::;', formState)
    };

    const handleOnChange = (name: keyof FormSignInType) => {
        return (event: React.ChangeEvent<any>) => {
            setFormState({...formState, [name]: event.target.value})
            if (isError || isSuccess) return reset();
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
            <Form style={{backgroundColor: 'white', padding: 20, borderRadius: 4}}>
                <h1 style={{textAlign: 'center'}}>Sign in</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                                  onChange={handleOnChange('email')}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  onChange={handleOnChange('textPassword')}/>
                </Form.Group>
                <Button variant="primary" type="submit" style={{width: '100%'}}
                        onClick={(event: React.MouseEvent<any>) => handleSignInBtn(event)}>
                    Sign in
                </Button>
                <p style={{textAlign: 'center'}}>I do not have account <Link to='/sign_up'>Sign up</Link></p>
            </Form>
        </div>
    );
};

export default SignIn;
