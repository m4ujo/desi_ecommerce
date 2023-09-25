import './LogIn.css';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LogIn = () => {
    const [isPsw, setIsPsw] = useState(false);
    const [spinnerState, setSpinnerState] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [errMsgEmail, setErrMsgEmail] = useState('');
    const [errMsgPsw, setErrMsgPsw] = useState('');
    const [errMsgEmailBox, setErrMsgEmailBox] = useState(false);
    const [errMsgPswBox, setErrMsgPswBox] = useState(false);
    const [errMsgBox, setErrMsgBox] = useState(false);
    const psw = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const axios = require('axios');

    const isValid = (e) => { // Form validation
        e.preventDefault();

        if (/\S+@\S+\.\S+/.test(e.target.email.value)) {
            setErrMsgEmailBox(false);
            if (/.{6,}/.test(e.target.password.value)) {
                setErrMsgPswBox(false);
                connectAcc(e.target.email.value, e.target.password.value);
            } else {
                setErrMsgPswBox(true);
                setErrMsgPsw('Password must contain at least 6 characters');
            }
        } else {
            setErrMsgEmailBox(true);
            setErrMsgEmail('Please enter a valid email');
        }
    }

    const connectAcc = async (email, password) => { // Log in function
        try {
            setSpinnerState(true);
            const res = await axios.post('http://localhost:3001/session', 
            {email: email, password: password});
            setSpinnerState(false);

            if (res.data.status === '200') {
                setErrMsg('');
                setErrMsgBox(false);
                dispatch({type: 'SET_SESSION', session: res.data.role});
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userType', res.data.role);
                localStorage.setItem('fname', res.data.firstName);
                localStorage.setItem('lname', res.data.lastName);
                history.push('/');
            } else {
                setErrMsgBox(true);
                setErrMsg(res.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='login-container'>
            <div className='header-box'>
                <h1>Iniciar sesión en <span>DESI</span> <span>Ecommerce</span></h1>   
            </div>

            <form className='login-form' onSubmit={isValid}>
                <div className='email-box'>
                    <input 
                        type='email' 
                        name='email' 
                        id='email' 
                        placeholder='Correo electrónico'
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setErrMsg('');
                                setErrMsgBox(false);
                                setErrMsgEmailBox(false);              
                                setErrMsgBox(false);
                                setErrMsgEmail('');
                            }
                        }}
                    />
                </div>

                { errMsgEmailBox ?
                <div className='err-msg-box'>
                    <span className='err-msg'>{errMsgEmail}</span>
                </div> : null }

                <div className='password-box'>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        className='password-input'
                        placeholder='Contraseña'
                        autoComplete='off'
                        ref={psw}
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setErrMsgPswBox('');
                                setErrMsg('');
                                setErrMsgPswBox(false);
                                setErrMsgBox(false);
                                setIsPsw(true);
                            } else {
                                setIsPsw(false);
                            }
                        }}
                    />
                </div>

                { errMsgPswBox ?
                <div className='err-msg-box'>
                    <span className='err-msg'>{errMsgPsw}</span>
                </div> : null }

                <span>
                    <button
                        type='button'
                        className='btn-link'
                        onClick={() => history.push('/i/forgot-password')}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </span>

                <div className='btn-box'>
                    {spinnerState ?
                        <div className='spinner-box'>
                            <div className={`spinner ${spinnerState}`}>
                                <div className='bounce1'></div>
                                <div className='bounce2'></div>
                                <div className='bounce3'></div>
                            </div>
                        </div> 
                        : 
                        <button type='submit'>
                            Iniciar sesión
                        </button>
                    }
                </div>

                { errMsgBox ?
                <div className='err-msg-box'>
                    <span className='err-msg'>{errMsg}</span>
                </div> : null }

                <div className='signup-box'>
                    <span>Nuevo en DESI? </span> 
                    <button 
                        className='btn-link'
                        type='button' 
                        onClick={() => history.push('/i/signup')}
                    >
                        Crea tu cuenta
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LogIn;