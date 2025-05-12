import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/horoscope"

export const getHoroscopeByBirthdate = async (birthdate) => {
  try {
    const response = await axios.post(`${API_URL}/get-by-birthdate`, { birthdate })
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al consultar el horóscopo")
    }
    throw new Error("Error de conexión con el servidor")
  }
}
