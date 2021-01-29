import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
    color: #FFF; 
    font-family: Arial, Helvetica, sans-serif;

    max-width: 80%;
    margin-top: 5rem;
    margin-left: 6rem;
    @media (min-width:1100px){
         max-width: 100%;
         margin-left: 0;
     }

`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight: bold;
        margin-left: 60px;
        display: block;
        padding: 0.5rem 0;
    }
`;

const Precio = styled.p`
    font-size: 35px;
    margin-bottom: 1.7rem;
    span{
        display: block;
        font-weight: bold;
        margin-left: 60px;
        padding: 0.5rem 0;
    }
`;


const Cotizacion = ({ resultado}) => {
    if(Object.keys(resultado).length === 0) return null;

     
    return (
        <ResultadoDiv>
            <Precio>El precio es:  <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación de últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última Actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
      );
}
 
Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired,
}

export default Cotizacion;