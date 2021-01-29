import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

import PropTypes from 'prop-types';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    
    font-size: 20px;
    padding:10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;
const Formulario = ({ guardarCriptomoneda, guardarMoneda, modificarFotoInicial}) => {
    
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [ error, guardarError] = useState(false);

    let hayCambiosDeSelecciones = false;

    //argumento para nuestro state useMoneda
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ]

    //utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

    //utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda' , '', listacripto);

    //ejectuar llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            //obtenemos los nombres de las cryptomonedas presentadas
            //por la api
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            // pasamos data obtenida de la api a listacripto
            // la cual es 3er argumento de state useCriptomoneda
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        hayCambiosDeSelecciones = true
    }, [moneda, criptomoneda]);

    //cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

 
        //validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        //pasar los datos al componente principal
        guardarError(false);

        //reemplazar la foto inicial por el resultado
        if(hayCambiosDeSelecciones){
        //  ralentizar algunos segundos para ejecutar 
        //  modificarFotoInicial(false);
            setTimeout(() => {
                modificarFotoInicial(false);
            }, 3000);

        } else {
        //no ralentizar y mostrar inmediatamente
            modificarFotoInicial(false);
        }

        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (  

        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/>: null}

                {/* //componente de state useMoneda */}
                <SelectMonedas />

                {/* //componente de state useCriptomoneda */}
                <SelectCripto  />
                <Boton
                    type="submit"
                    value="Calcular"                
                    />
        </form>
    );
}
 

Formulario.propTypes = {
    guardarCriptomoneda: PropTypes.func.isRequired,
    guardarMoneda: PropTypes.func.isRequired
}

export default Formulario;