/* eslint-disable react/prop-types */
const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <p>area {country.area} km<sup>2</sup></p>
      <br />
      <h2>borders</h2>
      <div>
        {Object.entries(country.languages).map(([key, value]) => <p key={key}>{value}</p>)}
      </div>
      <img src={country.flags.png} alt={country.flag.alt} width="200" height="100" />
      <br />
      {country.weather && (
        <>
          <h2>Weather in {country.weather.name}</h2>
          <p>temperature: {country.weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${country.weather.weather[0].icon}@2x.png`}
            alt={country.weather.weather[0].description} />
          <p>wind: {country.weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
}

export default CountryDetails;