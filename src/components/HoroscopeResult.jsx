import "../styles/HoroscopeResult.css"

const HoroscopeResult = ({ horoscope, fadeOut }) => {
  return (
    <div className={`horoscope-result ${fadeOut ? "fade-out" : ""}`}>
      <div className="result-header">
        <span className="emoji">{horoscope.emoji}</span>
        <h2 className="sign">{horoscope.sign.charAt(0).toUpperCase() + horoscope.sign.slice(1)}</h2>
      </div>
      <p className="horoscope-text">{horoscope.horoscope}</p>
    </div>
  )
}

export default HoroscopeResult
