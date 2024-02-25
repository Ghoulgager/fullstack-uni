import React from 'react'
import Country from './Country'

const Countries = ({ filter, countries, showCountry }) => {

  const countriesFiltered = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (countriesFiltered.length === countries.length) {
    return (
      <div>
      </div>
    )
  } else if (countriesFiltered.length === 1) {
    return (
        <div key={countriesFiltered[0].name.common}>
          <Country country={countriesFiltered[0]}/>
        </div>
    )
  } else if (countriesFiltered.length <= 10) {
    return (
      countriesFiltered.map(country =>
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button type='button' value={country.name.common} onClick={showCountry}>show</button>
          <br />
        </div>
      )
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

export default Countries