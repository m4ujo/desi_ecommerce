import './logOutBtn.css'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoPersonCircleOutline } from 'react-icons/io5';

const LogOutBtn = () => {
    const [fname, setFname] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const logOutHandler = () => { // Cerrar sesión function
        dispatch({type: 'SET_SESSION', session: ''});
        localStorage.clear();
        history.push('/i/login');
    }

    useEffect(() => {
        setFname(localStorage.getItem('fname'));
    }, [])

    return (
        <ul className='res-settings-nav'> 
            <li className='dropdown'>
                <button className='drop-btn'>
                    <span><IoPersonCircleOutline /></span> Hola {fname}
                </button>
        
                <div className='dropdown-content'>
                    <div className='dropdown-box'>
                        <button onClick={logOutHandler} className='btn-logout'>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default LogOutBtn;