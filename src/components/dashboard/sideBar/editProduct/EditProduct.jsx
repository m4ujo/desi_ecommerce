import './EditProduct.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'cloudinary-react';
import { GrPowerReset } from 'react-icons/gr';

const EditProduct = () => {
    const [previewSource, setPreviewSource] = useState('');
    const [spinnerState, setSpinnerState] = useState(false);
    const [obj, setObj] = useState({});
    const [category, setCategory] = useState('');
    const [errMsgPrice, setErrMsgPrice] = useState('');
    const form = useRef();
    const select = useRef(null);
    const arrCategory = useSelector(state => state.getCategories);
    const objProduct = useSelector(state => state.getProduct);
    const dispatch = useDispatch();
    const axios = require('axios');

    const handleTextInputChange = (e) => { // Input text validation
        e.preventDefault();

        obj.id = e.target.id; // Add product id

        if (e.target.productName.value !== '') { // Product name validation
            obj.name = e.target.productName.value;
        } else {
            delete obj.name;
        }

        if (e.target.category.value) { // Category validation
            const found = arrCategory.find(category => category.name === e.target.category.value);
            if (found) {
                obj.categoryId = e.target.category.value;
            }
        } else {
            delete obj.categoryId;
        }

        if (e.target.price.value) { // Price validation
            if (/^\d*\.?\d{2}$/.test(e.target.price.value)) {
                obj.price = e.target.price.value;
            } else {
                setErrMsgPrice('Please enter a decimal value');
                delete obj.price;
            }
        }

        return isValid();
    }

    const handleFileInputChange = (e) => { // Input file (img) validation
        if (e.target.files[0]) {
            if (/^.*\.(jpg|JPG|png|PNG|jpeg|JPEG|webp|WEBP)$/.test(e.target.files[0].name)) {
                e.target.setCustomValidity('');

                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
        
                reader.onloadend = () => {
                   if (file) {
                    obj.img = reader.result;
                    previewFile(file);
                   }
                }
                
                reader.onerror = () => {
                    console.error('Failed to generate the image');
                }    
            } else {
                e.target.setCustomValidity(`Supported file formats: JPG/JPEG, PNG and WEBP`);
                e.target.reportValidity();
            }
        }
    }

    const previewFile = (file) => { // Img preview function
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPreviewSource(reader.result);
            }
        }
    }

    const isValid = () => { // Object validation function
        if (Object.keys(obj).length >= 2) {
            editProduct();
        } else {
            console.error('No changes detected');
        }
    }

    const editProduct = async () => { // Fetch product update
        try {
            setSpinnerState(true);
            const res = await axios.put('https://desi-ecommerce-backend.onrender.com/product', obj);

            setSpinnerState(false);

            if (res.data.status === '200') {
                dispatch({type: 'SET_REFETCH', refetch: Math.random() * 2});
                setObj({});
                form.current.reset();
            } else {
                console.error('Something went wrong');
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => { // Set dynamically the current category option
        const found = arrCategory.find(e => e.id === objProduct.categoryId);
        if (found) {
            setCategory(found.name);
        }
        form.current.reset();
    }, [objProduct, arrCategory]);

    return (
        <form 
            className='edit-product-form' 
            onSubmit={handleTextInputChange}  
            autoComplete='off'
            encType='multipart/form-data'
            id={objProduct.id} 
            ref={form}
        >
            <div className='img-box'>
                <input 
                    type='file' 
                    name='image' 
                    id='image'
                    accept='image/png, image/jpeg, image/jpg, image/webp'
                    onChange={handleFileInputChange}
                />

                
                <figure className='img-preview-box'>
                    { previewSource ? 
                    <label htmlFor='image'>
                        <img src={previewSource} alt='Preview' title='Click para seleccionar imagen' />
                    </label>
                    : 
                    <label htmlFor='image'>
                        <Image cloudName='dkzrgbiqk'publicId={objProduct.img} title='Click para seleccionar imagen' />
                    </label> }
                </figure>
                
            </div>

            <div className='product-name-box'>
                <label htmlFor='productName'>Nombre de producto</label>
                <input
                    type='text'
                    name='productName'
                    id='productName'
                    placeholder={objProduct.name}
                />
            </div>

            <div className='category-box'>
                <label htmlFor='category'>Seleccione una categoría</label>
                <div className='category-box-wraper'>
                    <select 
                        name='category' 
                        id='category' 
                        defaultValue=''
                        ref={select}
                        
                    >
                        <option disabled hidden value=''>
                            {category}
                        </option>
                        {arrCategory.map(e => {
                            if (e.name !== category) {
                                return(
                                    <option 
                                        id={e.id} 
                                        value={e.name} 
                                        key={e.id}
                                    >
                                        {e.name}
                                    </option>
                                );
                            }
                            return null;
                        })}
                    </select>
                    <button 
                        className='select-reset-btn'
                        type='button'
                        title='Click to Reset'
                        onClick={() => select.current.value = ''}
                    >
                        <span><GrPowerReset /></span>
                    </button>
                </div>
            </div> 

            <div className='price-box'>
                <label htmlFor='price'>Precio de producto</label>
                <input 
                    type='text' 
                    name='price' 
                    id='price' 
                    placeholder={objProduct.price && `S/ ${objProduct.price}`}
                    onChange={(e) => {
                        if (e.target.value.length > 0) {
                            setErrMsgPrice('');
                        }
                    }}
                />
                <span className='err-msg'>{errMsgPrice}</span>
            </div>
                        
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
                    <button type='submit' className='btn-edit'>
                        Guardar cambios
                    </button>
                }
            </div>
        </form>
    );
}

export default EditProduct;