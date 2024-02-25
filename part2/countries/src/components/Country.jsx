import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
      <h1><span>{country.name.common}</span></h1>
      <p>capital {country.capital}<br />area {country.area}<br />population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {
        Object.values(country.languages).map(value => (
							<li key={value}>{value}</li>
				))}
      </ul>
      <p>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`} 
        height="150" 
        width="250" 
      />
      </p>
    </div>
  )
}

export default Country