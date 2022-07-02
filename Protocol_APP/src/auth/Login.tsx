// import { HttpClient } from 'http-client';
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
// import { stores } from '@stores';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import { AuthViewModel } from '@viewModels';
import { LoginModel } from 'core/models/LoginModel';
import { ENDPIONTS, httpService } from '@api';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const [errMsg, setErrMsg] = useState<string | null>(null);


    try {
        var currentUser: any = JSON.parse(localStorage.getItem('token') ?? '');
        if (currentUser) {
            return <Navigate to={`/`} />;
        }
    } catch (error) {
        console.log({ error });
    }

    const onSubmit = async (data: AuthViewModel, e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const obj: LoginModel = {
            username: data.userName,
            password: data.password
        }

        var res = await httpService(ENDPIONTS.login).post(obj);
        if (res?.status === 200) {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            localStorage.setItem('sys_user', JSON.stringify(res.data.sys_user))

            //window.location.assign('/');
            e.target.reset();
            setIsLoading(false);
            return <Navigate to={`/`} />;
        }

        setIsLoading(false);
    }

    return (
        <div className="form">
            <Helmet>
                <title>Login</title>
                {/* Start Login page styles */}
                <link href="/assets/css/authentication/form-1.css" rel="stylesheet" type="text/css" />
                <link rel="stylesheet" type="text/css" href="/assets/css/forms/theme-checkbox-radio.css" />
                <link rel="stylesheet" type="text/css" href="/assets/css/forms/switches.css" />
                {/* End Login page styles */}
            </Helmet>
            <div className="form-container">
                <div className="form-form">
                    <div className="form-form-wrap">
                        <div className="form-container">
                            <div className="form-content">
                                <h1 >Log In </h1>
                                {/* <p className="signup-link">New Here? <a href="auth_register.html">Create an account</a></p> */}
                                <form className="text-left" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form">
                                        <div id="username-field" className="field-wrapper input">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                                            <input id="userName" name="userName" type="text" ref={register({ required: true })} onChange={() => setErrMsg(null)} className="form-control" placeholder="Username" />
                                            <span className="text-danger">
                                                {errors.title && <span>This field is required</span>}
                                            </span>
                                        </div>
                                        <div id="password-field" className="field-wrapper input mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x={3} y={11} width={18} height={11} rx={2} ry={2} /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                            <input id="password" name="password" type={showPassword ? "text" : "password"} ref={register({ required: true })} onChange={() => setErrMsg(null)} className="form-control" placeholder="Password" />
                                            <span className="text-danger">
                                                {errors.title && <span>This field is required</span>}
                                            </span>
                                        </div>
                                        <div className="d-sm-flex justify-content-between">
                                            <div className="field-wrapper toggle-pass">
                                                <p className="d-inline-block">Show Password</p>
                                                <label className="switch s-primary">
                                                    <input type="checkbox" id="toggle-password" className="d-none" onChange={() => setShowPassword(!showPassword)} />
                                                    <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="field-wrapper">
                                                <button type="submit" className="btn btn-primary" disabled={isLoading} >
                                                    {
                                                        isLoading ? "Verifying..." : "Log In"
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        {/* <div className="field-wrapper text-center keep-logged-in">
                                            <div className="n-chk new-checkbox checkbox-outline-primary">
                                                <label className="new-control new-checkbox checkbox-outline-primary">
                                                    <input type="checkbox" className="new-control-input" />
                                                    <span className="new-control-indicator" />Keep me logged in
                                                </label>
                                            </div>
                                        </div>
                                        <div className="field-wrapper">
                                            <a href="auth_pass_recovery.html" className="forgot-pass-link">Forgot Password?</a>
                                        </div> */}
                                    </div>
                                </form>
                                {
                                    errMsg &&
                                    <div className="row mt-3">
                                        <p className='text-danger font-weight-bold'> {errMsg} </p>
                                    </div>
                                }
                                <p className="terms-conditions">© 2022 All Rights Reserved. Developed by Mustapha Xoodiye & Cabdisamad Baylood
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-image">
                    <div className="l-image">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
