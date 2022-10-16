import React from 'react'
import styled from '@emotion/styled'

const ContenedorResultado = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
    @media (max-width: 760px){ 
        flex-direction: column;
        text-align: center;
    }
`

const ImagenCripto = styled.img`
    display: block;
    width: 120px;
`

const ParrafoPrecio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`

const Parrafo = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`

const Resultado = ({resultado}) => {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado;

  return (
    <ContenedorResultado>
        <ImagenCripto src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen cripto" />
        <div>
            <ParrafoPrecio>El Precio es: <span>{PRICE}</span></ParrafoPrecio>
            <Parrafo>El Precio más alto del día: <span>{HIGHDAY}</span></Parrafo>
            <Parrafo>El Precio más bajo del día: <span>{LOWDAY}</span></Parrafo>
            <Parrafo>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Parrafo>
            <Parrafo>Última actualización: <span>{LASTUPDATE}</span></Parrafo>
        </div>
    </ContenedorResultado>
  )
}

export default Resultado