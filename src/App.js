import {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

import Spinner from './components/Spinner';

const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width:992px){

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`;

const Imagen = styled.img`
    max-width: 80%;
    margin-top: 5rem;
    margin-left: 4rem;
    @media (min-width:1100px){
         max-width: 100%;
         margin-left: 0;
     }
`;

const Heading = styled.h1`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-align: left;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 20px;
    margin-top: 80px;
    &::after {
        content: '';
        width: 100px;
        height: 6px;
        background-color: #66A2FE;
        display: block;
    }
    @media (min-width:1100px){
        margin-bottom: 50px;
    }
`;

const CloseButn = styled.button`
    border-radius: 50%;
    border: none;
    padding: 0.5rem 0.8rem;
    color: white;
    background-color: red;
    margin-left: 150px;
    &:hover{
        font-weight: bold;
    }
 `;

function App() {
    
    const [moneda, guardarMoneda] =useState('');
    const [criptomoneda, guardarCriptomoneda] = useState('');
    const [resultado, guardarResultado] = useState({});
    const [cargando, guardarCargando]  = useState(false);
    const [fotoInicial, modificarFotoInicial] = useState(true);

    useEffect(() => {
        //evitamos la ejecución la primera vez

        const cotizarCriptomoneda = async () => {
            if (moneda === '') return;

            //consultar la api por la cotizacion
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
            const resultado = await axios.get(url);
            

            //remove photo for display info
            modificarFotoInicial(false);

            //mostrar spinner
            guardarCargando(true);

            //ocultar el spinner y mostrar el resultado
            //emulamos tiempo de operacion de calculo de cotizacion
            setTimeout(() => {
                //cambiar el estado de cargando
                guardarCargando(false);

                //accediendo a atributos criptomoneda y luego moneda de resultado obtenemos 
                //los valores del objeto anticipandonos para evitar tener que tratar con esto //cuando rendericemos el objeto
                guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
            }, 3000);
    
        }
        cotizarCriptomoneda();
    }, [moneda, criptomoneda]);

    //mostrar spinner o resultado
    const componente = (cargando) ? <Spinner /> :
    <div>
         <Cotizacion
             resultado={resultado}
        />
            <CloseButn  onClick={() => modificarFotoInicial(true)} type='button'>X</CloseButn>
    </div>
        ;

    //mostrar foto inicial o operaciones
    let infoDisplay = (fotoInicial) ? <Imagen
        src={imagen}
        alt="imagen crypto"
    />
        : componente;


    return (
    <Contenedor>    
        <div>
            {infoDisplay}
        </div>
        <div className=" laptopfriendly">
            <Heading>Cotiza Criptomonedas al Instante</Heading>
            <Formulario 
                guardarMoneda={guardarMoneda}
                guardarCriptomoneda={guardarCriptomoneda}
                modificarFotoInicial={modificarFotoInicial}
            />
            {/* {componente} */}
        </div>
    </Contenedor>
);
}



export default App;
