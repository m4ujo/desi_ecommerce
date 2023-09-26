import './Nav.css';
import './NavQueries.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowCircleRight } from 'react-icons/fa';

const Nav = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <nav className='payment-nav-container'>
            <div>
                <h1>DESI <span>Ecommerce</span> </h1>
                <div>
                    <h2>Información de pago y entrega</h2>
                    <button
                        onClick={() => { 
                            history.push('/');
                            dispatch({type: 'SET_CART_SUMMERY', cartSummery: []});
                    }}
                    >
                        Continua comprando <span><FaArrowCircleRight /></span>
                    </button> 
                </div>
            </div>
        </nav>
    );
}

export default Nav;