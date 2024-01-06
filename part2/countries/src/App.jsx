/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import countriesServices from './services/countries'
import weatherServices from './services/weather'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

function App() {
  const [countries, setCountries] = useState(null)
  const [newCountry, setNewCountry] = useState('')

  useEffect(() => {
    if (newCountry !== '') {
      countriesServices
        .getAll()
        .then(async initialCountries => {
          const filteredCountries = initialCountries.filter(country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))
          if (filteredCountries.length === 1) {
            try {
              const weather = await weatherServices.getCurrentWeather(filteredCountries[0].capital[0])
              const countryWithWeather = { ...filteredCountries[0], weather }
              setCountries([countryWithWeather])
            } catch (error) {
              setCountries(filteredCountries)
            }
          } else {
            setCountries(filteredCountries)
          }
        })
    }
  }, [newCountry])

  const handleShowCountry = async (country) => {
    try {
      const weather = await weatherServices.getCurrentWeather(country.capital[0]);
      const countryWithWeather = { ...country, weather };
      setCountries([countryWithWeather]);
    } catch (error) {
      setCountries([country]);
    }
  };

  const checkCountriesAmount = () => {
    if (!countries || !newCountry) return null;
    if (countries.length === 1) return <CountryDetails country={countries[0]} />;
    if (countries.length === 0) return <p>No matches</p>;
    if (countries.length > 10) return <p>There are too many matches, specify another filter</p>;
    return <CountryList countries={countries} handleShowCountry={handleShowCountry} />;
  };

  return (
    <main>
      <h2>
        Find countries
      </h2>
      <input type="text" value={newCountry} onChange={(event) => setNewCountry(event.target.value)} />
      <ul>
        {checkCountriesAmount()}
      </ul>
    </main>
  )
}

export default App
