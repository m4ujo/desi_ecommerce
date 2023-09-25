import './StepTwo.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const StepTwo = () => {
    const [selectColor, setSelectColor] = useState('grey');
    const stepsDataObj = useSelector(state=> state.getRegisterStepsDataReducer);
    const errMsgObj = useSelector(state=> state.getErrMsgRegisterReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (stepsDataObj.city) {
            setSelectColor('black');
        } else {
            setSelectColor('grey');
        }

    }, [stepsDataObj]);

    const stepsDataHandler = (targetName, data) => {
        dispatch({
            type: 'SET_REGISTER_STEPS_DATA', 
            registerStepsData: { [targetName]: data }
        });
    }

    return (
        <div className='container-step-two'>
            <div className='fname-box'>
                <input 
                    type='text' 
                    name='fname' 
                    id='fname' 
                    defaultValue={stepsDataObj.fname}
                    placeholder='Nombres'
                    onChange={(e) => {
                        if (e.target.value.length > 0) {
                            errMsgObj.setErrMsgFname('');
                        }
                        stepsDataHandler(e.target.name, e.target.value);
                    }}
                />
            </div>

            <div className='err-msg-box'>
                <span className='err-msg'>{errMsgObj.errMsgFname}</span>
            </div>

            <div className='lname-box'>
                <input 
                    type='text' 
                    name='lname' 
                    id='lname' 
                    defaultValue={stepsDataObj.lname}
                    placeholder='Apellidos'
                    onChange={(e) => {
                        if (e.target.value.length > 0) {
                            errMsgObj.setErrMsgLname('');
                        }
                        stepsDataHandler(e.target.name, e.target.value);
                    }}
                />
            </div>

            <div className='err-msg-box'>
                <span className='err-msg'>{errMsgObj.errMsgLname}</span>
            </div>

            <div className='city-box'>
                <select 
                    name='city'
                    id='city' 
                    defaultValue={stepsDataObj.city ? stepsDataObj.city : ''}
                    className={selectColor}
                    onChange={(e) => {
                        if (e.target.value.length > 0) {
                            errMsgObj.setErrMsgCity('');
                        }
                        setSelectColor('black');
                        stepsDataHandler(e.target.name, e.target.value);
                    }}
                >
                    <option disabled hidden value=''>Seleccione departamento</option>
                    <option value='Amazonas'>Amazonas</option>
                    <option value='Áncash'>Áncash</option>
                    <option value='Apurímac'>Apurímac</option>
                    <option value='Arequipa'>Arequipa</option>
                    <option value='Ayacucho'>Ayacucho</option>
                    <option value='Cajamarca'>Cajamarca</option>
                    <option value='Callao'>Callao</option>
                    <option value='Cusco'>Cusco</option>
                    <option value='Huancavelica'>Huancavelica</option>
                    <option value='Huánuco'>Huánuco</option>
                    <option value='Ica'>Ica</option>
                    <option value='Junín'>Junín</option>
                    <option value='La Libertad'>La Libertad</option>
                    <option value='Lambayeque'>Lambayeque</option>
                    <option value='Lima'>Lima</option>
                    <option value='Loreto'>Loreto</option>
                    <option value='Madre de Dios'>Madre de Dios</option>
                    <option value='Moquegua'>Moquegua</option>
                    <option value='Pasco'>Pasco</option>
                    <option value='Piura'>Piura</option>
                    <option value='Puno'>Puno</option>
                    <option value='San Martín'>San Martín</option>
                    <option value='Tacna'>Tacna</option>
                    <option value='Tumbes'>Tumbes</option>
                    <option value='Ucayali'>Ucayali</option>
                </select>
            </div>

            <div className='err-msg-box'>
                <span className='err-msg'>{errMsgObj.errMsgCity}</span>
            </div>

            <div className='street-box'>
                <input 
                    type='text' 
                    name='street' 
                    id='street' 
                    defaultValue={stepsDataObj.street}
                    placeholder='Direccion'
                    onChange={(e) => {
                        if (e.target.value.length > 0) {
                            errMsgObj.setErrMsgStreet('');
                        }
                        stepsDataHandler(e.target.name, e.target.value);
                    }}
                />
            </div>

            <div className='err-msg-box'>
                <span className='err-msg'>{errMsgObj.errMsgStreet}</span>
            </div>
        </div>
    );
}

export default StepTwo;