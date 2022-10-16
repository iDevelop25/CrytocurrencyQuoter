import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import Resultado from "./components/Resultado"
import Formulario from "./components/Formulario"
import ImagenCripto from "./img/criptos2.png"
import Spiner from "./components/Spiner"

const Container = styled.div`
  max-width: 900;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) { 
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-content: center;
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  width: 100%;
  max-width: 500px;
  margin: 100px auto 0 auto;
  display: block;
  @media (max-width: 760px){ 
    margin-top: 30px;
  }
`

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  @media (min-width: 760px) { 
    margin-top: 30px;
  }

  &::after{
    content: '';
    background-color: #f06e38;
    width: 100px;
    height: 6px;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      // Spiner Inicio
      setCargando(true);
      
      const cotizarCripto = async() => {
        const {moneda, criptomoneda} = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);

        // Spiner Fin
        setCargando(false);
        
      };
      cotizarCripto();
    }
  }, [monedas])

  return (
    <Container>
      <Imagen
        src={ImagenCripto}
        alt="imagen criptos"
      />
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          setMonedas={setMonedas}
        />
        {cargando && <Spiner/>}
        {resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>
    </Container>
  )
}

export default App
