/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import countriesServices from './services/countries'

const CountryDetails = ({ country }) => (
  <>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital[0]}</p>
    <p>population {country.population}</p>
    <p>area {country.area} km<sup>2</sup></p>
    <br />
    <h2>borders</h2>
    <ul>
      {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flag.alt} width="200" height="100" />
  </>
);

const CountryList = ({ countries, handleShowCountry }) => (
  countries.map(country => (
    <p key={country.name.common}>
      {country.name.common}
      <button onClick={() => handleShowCountry(country)}>show</button>
    </p>
  ))
);

function App() {
  const [countries, setCountries] = useState(null)
  const [newCountry, setNewCountry] = useState('')

  useEffect(() => {
    if (newCountry !== '') {
      countriesServices
        .getAll()
        .then(initialCountries => {
          const filteredCountries = initialCountries.filter(country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))
          setCountries(filteredCountries)
        })
    }
  }, [newCountry])

  const handleShowCountry = (country) => {
    setCountries([country])
  }

  const checkCountriesAmount = () => {
    if (!countries || !newCountry) return null;
    if (countries.length === 1) return <CountryDetails country={countries[0]} />;
    if (countries.length === 0) return <p>No matches</p>;
    if (countries.length > 10) return <p>There are too many matches, specify another filter</p>;
    return <CountryList countries={countries} handleShowCountry={handleShowCountry} />;
  };

  return (
    <>
      <div>
        find countries <input type="text" value={newCountry} onChange={(event) => setNewCountry(event.target.value)} />
      </div>
      <div>
        <ul>
          {checkCountriesAmount()}
        </ul>
      </div>
    </>
  )
}

export default App
