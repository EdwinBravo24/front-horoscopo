import HoroscopeForm from "../components/HoroscopeForm"
import "../styles/HoroscopePage.css"

const HoroscopePage = () => {
  return (
    <div className="horoscope-page">
      <div className="container">
        <h1>Consulta tu Horóscopo Diario</h1>
        <p className="subtitle">Ingresa tu fecha de nacimiento para descubrir qué te deparan los astros hoy</p>
        <HoroscopeForm />
      </div>
    </div>
  )
}

export default HoroscopePage
