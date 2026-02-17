import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '6c31e962b857891c7d3fb43ad6e3864b'
    const difKelvin = 273.15 // Para lograr obtener grados Celsious debemos restar este número a los grados Kelvin

    const fetchWeatherData = async () => {
        try {
            if (!API_KEY) {
                alert('Por favor, agrega tu API key de OpenWeatherMap en el código')
                return
            }
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            console.log(data)
            
            // Validar si la API retornó un error
            if (data.cod !== 200) {
                alert(`Error: ${data.message}`)
                setWeatherData(null)
                return
            }
            
            setWeatherData(data)
        } catch (error) {
            console.error('Ha habido un error: ', error)
            alert('Error al obtener los datos del clima')
        }
    }


    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
    }

    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa una ciudad"
                    value={city}
                    onChange={handleCityChange}
                />
                <button type="submit">Buscar</button>
            </form>

            {weatherData && (

                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es {Math.floor(weatherData.main.temp - difKelvin)}ºC</p>
                    <p>La condición meteorológica actual: {weatherData.weather[0].description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />
                </div>


            )}

        </div>
    )
}
