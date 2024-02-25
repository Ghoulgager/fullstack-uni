import React, {useState, useEffect} from 'react';
import axios from 'axios'
import TextField from './components/TextField';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
  axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
  }
  const showCountry = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <TextField 
        text='find countries' 
        value={newFilter} 
        onChange={handleFilterChange} 
      />
      <Countries 
        filter={newFilter} 
        countries={countries}
        showCountry={showCountry}
      />
    </div>
  )
}

export default App;