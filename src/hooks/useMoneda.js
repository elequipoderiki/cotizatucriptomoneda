import React, { Fragment, useState } from 'react';
// import { act } from 'react-dom/test-utils';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.1rem;
    display: block;
    margin-top: 1rem;
    @media (min-width: 1100px){
        margin-top: 2rem;
        font-size: 2.4rem;
    }
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: .5rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
    @media (min-width: 1100px){
        padding: 1rem;
    }
`;

const useMoneda = (label, stateInicial, opciones) => {

    //state de nuestro custom hook (donde se guarda la moneda elegida)
    const [state, actualizarState] = useState(stateInicial);

    const Seleccionar = () => (
        <Fragment>

            <Label>{label}
            </Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    );

    //retornar state, interfaz y func que modifica el state.
    return [state, Seleccionar, actualizarState];
}


export default useMoneda;
