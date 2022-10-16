import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import {monedas} from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #f06e38;
    border: none;
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: 30px;
    margin-bottom: 5px;

    &:hover{
        background-color: #ff9607;;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
    const [ criptos, SelectCriptos ] = useState([]);
    const [ error, setError ] = useState(false);
    
    const [ moneda, SelectMonedas ] = useSelectMonedas('Escoge tu Moneda', monedas);
    const [ criptomoneda, SelectCripto ] = useSelectMonedas('Escoge tu Criptomoneda', criptos);

    
    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            
            const arrayCriptos = resultado.Data.map( (cripto)=> {
                const Objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return Objeto;
            })
            SelectCriptos(arrayCriptos);
        }
        consultarApi();
    }, [])

    const hadleSubmit = (e) => {
        e.preventDefault();

        if([moneda, criptomoneda].includes('') || [moneda, criptomoneda].includes(' ')){
            setError(true);
        }else{
            setError(false);
            setMonedas({moneda, criptomoneda});
        }
    }

  return (
    <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <form onSubmit={hadleSubmit}>
            <SelectMonedas/>
            <SelectCripto/>
                
            <InputSubmit 
            type="submit" 
            value="Cotizar" 
            />
        </form>
    </>
  )
}

export default Formulario