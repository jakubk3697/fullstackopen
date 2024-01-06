import axios from 'axios'
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getCurrentWeather = (capital) => {
  try {
    const request = axios.get(`${baseUrl}?q=${capital}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
  } catch (error) {
    console.log(error)
  }
}

export default { getCurrentWeather }