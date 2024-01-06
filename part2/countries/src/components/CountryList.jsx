const CountryList = ({ countries, handleShowCountry }) => (
  countries.map(country => (
    <li key={country.name.common}>
      {country.name.common}
      <button onClick={() => handleShowCountry(country)}>show</button>
    </li>
  ))
);

export default CountryList;