import './LandingPage.css';
import './LandingPageQueries.css';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {
    IoLogoTwitter, 
    IoLogoInstagram, 
    IoLogoFacebook, 
    IoCartSharp, 
    IoPersonSharp
} from 'react-icons/io5';
import { FaAppleAlt } from 'react-icons/fa';
import Customer from './customer.svg';
import Customer2 from './customer2.svg';

const LandingPage = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const history = useHistory();
    const nav = useRef(null);
    const axios = require('axios');

    useEffect(() => {
        window.addEventListener('scroll', () => { // Toggle sticky nav
            nav.current && nav.current.classList.toggle('sticky', window.scrollY > 0);
        });
    }, [nav]);

    useEffect(() => { // Fetch app statistics
        (async () => {
            try {
                const res = await axios.get('https://desi-ecommerce-backend.onrender.com/statistics');

                setUsersCount(res.data.users);
                setOrdersCount(res.data.orders);
                setProductsCount(res.data.products);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [axios]);

    useEffect(() => { // Trigger AOS library
        Aos.init({duration: 2000, offset: 250});
    }, []);

    return (
        <div className='landing-page-container'>
            <nav ref={nav}>
                <ul>
                    <li>
                        <h1><span>DESI</span> <span>Ecommerce</span></h1>
                    </li>

                    <li>
                        <button onClick={() => history.push('/i/login')} className='btn-login'>
                            Iniciar sesión
                        </button>

                        <button onClick={() => history.push('/i/signup')}>
                            Crear cuenta
                        </button>
                    </li>
                </ul>
            </nav>

            <div className='landing-page-header'>
                <div>
                    <h2>
                        <span>NAVEGA ENTRE</span>  
                        <span>MILES DE PRODUCTOS</span>
                    </h2>
                    <h3>
                        <span>DISFRUTA DE ENTREGAS RÁPIDAS</span>
                        <span>¡Y APROVECHA MEJOR TU TIEMPO!🔥</span>
                    </h3>
                </div>
            </div>

            <div className='landing-page-wraper' id='content' >
                <div 
                    className='statistics-box' 
                    data-aos='fade-up'
                >
                    <ul>
                        <li>
                            <IoPersonSharp className='statistics-icon' />
                            <h3>{usersCount}</h3>
                            <p>Members</p>
                        </li>
                        <li>
                            <IoCartSharp className='statistics-icon' />
                            <h3>{ordersCount}</h3>
                            <p>Orders</p>
                        </li>
                        <li>
                            <FaAppleAlt className='statistics-icon' />
                            <h3>{productsCount}</h3>
                            <p>Products</p>
                        </li>
                    </ul>

                </div>
                <div className='landing-page-content' data-aos='fade-right'>
                    <div>
                        <h2><span>¿Quiénes somos?</span></h2>
                        <p>Somos un servicio de supermercado en línea que entrega tus pedidos directamente a tu hogar.</p>

                        <p><span>¿Cómo lo hacemos?</span></p>
                        <p>Hemos seleccionado cuidadosamente y colaborado con una variedad de supermercados que se encuentran en el centro de la ciudad en todo el país, con el fin de estar lo más cerca posible de nuestros clientes y brindarles la entrega más fresca y rápida, manteniendo al mismo tiempo el más alto nivel de servicio y calidad.</p>
                    </div>

                    <figure>
                        <img src={Customer2} alt='Illustration' />
                    </figure>
                </div>

                <div className='vision-content' data-aos='fade-left'>
                    <figure>
                        <img src={Customer} alt='Illustration' />
                    </figure>
                    
                    <div>
                        <h2><span>Nuestra visión</span></h2>
                        <p>Nuestra visión es proporcionar a nuestros clientes el mejor servicio: Cómodo, Rápido, Asequible, Accesible, Eficiente y Avanzado, y ayudar a nuestros clientes a aprovechar mejor su tiempo.</p>
                    </div>
                </div>
            </div>

            <footer>
                <div className='footer-navigation'>
                    <div>
                        <h2><span>DESI</span> <span>Ecommerce</span></h2>
                    </div>

                    <div>
                        <ul>
                            <li>
                                <button>About Us</button>
                            </li>
                            <li>
                                <button>Jobs</button>
                            </li>
                            <li>
                                <button>Press</button>
                            </li>
                            <li>
                                <button>Blog</button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <ul>
                            <li>
                                <button>Contact Us</button>
                            </li>
                            <li>
                                <button>Terms</button>
                            </li>
                            <li>
                                <button>Privacy</button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <ul className='social-nav'>
                            <li>
                                <button><IoLogoFacebook /></button>
                            </li>
                            <li>
                                <button><IoLogoTwitter /></button>
                            </li>
                            <li>
                                <button><IoLogoInstagram /></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;