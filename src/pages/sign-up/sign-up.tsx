import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {FormSignUpType} from "../../types/form-sign-up.type";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Auth} from "../../api/auth/auth";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate} from "react-router-dom";
import Loading from "../../components/loading/loading";
import {TIME_COUNT_DOWN} from "../../constant/constant";
import {FcGoogle} from "@react-icons/all-files/fc/FcGoogle";


const SignUp = () => {
    const initFormState: FormSignUpType = {
        email: '',
        textPassword: '',
        confirmTextPassword: ''
    }

    const [formState, setFormState] = useState<FormSignUpType>(initFormState);
    const navigate = useNavigate();

    const {
        mutate,
        error,
        data,
        reset,
        isLoading,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: async (body: FormSignUpType) => {
            return await Auth.signUp<FormSignUpType>(body);
        },
    });
    //
    if (isError) {
        console.log('___isError:::', isError)
        let _error = error as any;
        const _listMsgErr = _error.response?.data.message;
        _listMsgErr?.forEach((item: string) => toast.warn(item));
    }

    if (isSuccess) {
        console.log('_____isSuccess:::', isSuccess)
        localStorage.setItem('access_token', `Bearer ${data.data.access_token}`)
        toast.success(data.data.message);
        localStorage.setItem('time_count_down', `${Date.now() + TIME_COUNT_DOWN}`)
        navigate('/send-otp')
    }

    if (isLoading) return <Loading/>

    function signUpGoogleQuery() {
        console.log('____run retrieve access token')
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useQuery(['sign-up-google'], {
            queryFn: async () => await Auth.signUpGoogle(),
            cacheTime: Infinity,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchIntervalInBackground: false
        });
    }

    const handleSignUpBtn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate(formState);
    };

    const handleOnChange = (name: keyof FormSignUpType) => {
        return (event: React.ChangeEvent<any>) => {
            setFormState({...formState, [name]: event.target.value})
            if (error || data) return reset();
        }
    };

    const handleSignUpGoogleBtn = () => {
        console.log('btn signUp google')
        // signUpGoogleQuery();
        // redirect('http://localhost:8080/auth/google/callback');
        // window.location.replace('http://localhost:8080/auth/google/callback/');
        Auth.signUpGoogle().then((data) => {
            console.log('_data___::', data)
        }).catch((error) => {
            console.log('error:::', error)
        });

        navigate('/sign_in');
    }


    return <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column'
    }}>
        <Form method='post' style={{backgroundColor: 'white', padding: 20, borderRadius: 4, marginBottom: 4}}>
            <h1 style={{textAlign: 'center'}}>Sign up</h1>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password"
                              onChange={handleOnChange('confirmTextPassword')}/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{width: '100%'}}
                    onClick={(event: React.FormEvent<any>) => handleSignUpBtn(event)}
            >
                Sign up
            </Button>
            <p style={{textAlign: 'center'}}>I already have an account <Link to='/sign-in'>Sign in</Link></p>
            <div style={{textAlign: 'center', cursor: 'pointer'}} onClick={handleSignUpGoogleBtn}><FcGoogle/></div>
        </Form>
    </div>;
};

export default SignUp;
