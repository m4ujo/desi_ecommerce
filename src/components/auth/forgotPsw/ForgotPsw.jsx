import './ForgotPsw.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ForgotPsw = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [spinnerState, setSpinnerState] = useState(false);
    const [errMsgEmail, setErrMsgEmail] = useState('');
    const history = useHistory();
    const axios = require('axios');

    const isValid = (e) => { // Form validation
        e.preventDefault();

        if (/\S+@\S+\.\S+/.test(e.target.email.value)) {
            resetPass(e.target.email.value);
        } else {
            setErrMsgEmail('Por favor, ingrese correo electrónico válido');
        }
    }

    const resetPass = async (email) => { // Reset psw
        try {
            setSpinnerState(true);
            await axios.put('http://localhost:3001/session', {email: email});
            setSpinnerState(false);
            
            setEmailSent(true);
        } catch (err) {
            console.error(err);
        }
    }

    if (emailSent) {
        return(
            <div className='forgot-psw-container'>
                <div className='email-sent-box'>
                    <div className='logo-box'>
                        <h1><span>DESI</span> <span>Ecommerce</span></h1>   
                    </div>

                    <h2>Gracias</h2>
                    <p>Si tu cuenta esta vinculada a esta dirección de correo electrónico, recibirás un email para restablecer tu contraseña.</p>
                    <button 
                        onClick={() => history.push('/i/login')}
                        className='btn-link'
                    >
                        Regresar a inicio de sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='forgot-psw-container'>
            <div className='logo-box'>
                <h1>
                    <span>DESI</span> <span>Ecommerce</span>
                </h1>   
            </div>

            <form className='reset-pass-form' onSubmit={isValid}>
                <div className='header-box'>
                    <h2>¿Cuál es tu correo electrónico?</h2>
                    <p>Por favor, verifica tu correo electrónico para nosotros. Una vez que lo hagas, te enviaremos instrucciones para restablecer tu contraseña.</p>
                </div>

                <div className='email-box'>
                    <input 
                        type='email' 
                        name='email' 
                        id='email' 
                        placeholder='Correo electrónico'
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setErrMsgEmail('');
                            }
                        }}
                    />
                    <span className='err-msg'>{errMsgEmail}</span>
                </div>

                <div className='btn-box'>
                    { spinnerState ?
                        <div className='spinner-box'>
                            <div className={`spinner ${spinnerState}`}>
                                <div className='bounce1'></div>
                                <div className='bounce2'></div>
                                <div className='bounce3'></div>
                            </div>
                        </div> 
                        : 
                        <button type='submit'>
                            Restablecer contraseña
                        </button> }
                </div>

                <button 
                    type='button'
                    onClick={() => history.push('/i/login')}
                    className='btn-link'
                >
                    Regresar a inicio de sesión
                </button>
            </form>
        </div>
    );
}

export default ForgotPsw;