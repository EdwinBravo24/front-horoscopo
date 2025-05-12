"use client"

import { useState, useEffect, useRef } from "react"
import HoroscopeResult from "./HoroscopeResult"
import { getHoroscopeByBirthdate } from "../services/horoscopeService"
import "../styles/HoroscopeForm.css"

const HoroscopeForm = () => {
  const [birthdate, setBirthdate] = useState("")
  const [isValidFormat, setIsValidFormat] = useState(false)
  const [horoscope, setHoroscope] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const timerRef = useRef(null)

  // Validar formato de fecha (DD-MM-AAAA)
  useEffect(() => {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/
    setIsValidFormat(dateRegex.test(birthdate))
  }, [birthdate])

  // Manejar cambio en el input de fecha
  const handleDateChange = (e) => {
    const value = e.target.value

    // Aplicar formato automáticamente
    let formattedValue = value
    if (value.length === 2 && !value.includes("-")) {
      formattedValue = value + "-"
    } else if (value.length === 5 && value.charAt(2) === "-" && !value.includes("-", 3)) {
      formattedValue = value + "-"
    }

    setBirthdate(formattedValue)
  }

  // Consultar horóscopo
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isValidFormat) {
      setError("Por favor, ingresa la fecha en formato DD-MM-AAAA")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const data = await getHoroscopeByBirthdate(birthdate)
      setHoroscope(data)
      setShowResult(true)

      // Configurar temporizador para ocultar el resultado después de 15 segundos
      timerRef.current = setTimeout(() => {
        setFadeOut(true)

        // Después de la animación, ocultar el resultado
        setTimeout(() => {
          setShowResult(false)
          setFadeOut(false)
        }, 1000) // Duración de la animación de fade-out
      }, 15000)
    } catch (err) {
      setError(err.message || "Error al consultar el horóscopo")
    } finally {
      setIsLoading(false)
    }
  }

  // Limpiar temporizador al desmontar el componente
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="horoscope-form-container">
      <form onSubmit={handleSubmit} className="horoscope-form">
        <div className="form-group">
          <label htmlFor="birthdate">Fecha de Nacimiento (DD-MM-AAAA)</label>
          <input
            type="text"
            id="birthdate"
            value={birthdate}
            onChange={handleDateChange}
            placeholder="DD-MM-AAAA"
            maxLength="10"
            className="date-input"
          />
          {error && <p className="error-message">{error}</p>}
        </div>

        <button type="submit" className="submit-button" disabled={!isValidFormat || isLoading || showResult}>
          {isLoading ? "Consultando..." : "Consultar Horóscopo"}
        </button>
      </form>

      {showResult && horoscope && <HoroscopeResult horoscope={horoscope} fadeOut={fadeOut} />}
    </div>
  )
}

export default HoroscopeForm
