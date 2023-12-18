import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  if (props.counter == 0) {
    return (
      <div>
      No feedback given
      </div>
    )
  }
  else {
  return (
    <div>
      <table>
      <StatisticLine text="good" value={props.ocenaGood} />
      <StatisticLine text="neutral" value={props.ocenaNeutral} />
      <StatisticLine text="bad" value={props.ocenaBad} />
      <StatisticLine text="all" value={props.counter} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
      </table>
    </div>
  )
  }
}

const App = () => {
  const [ ocenaGood, setOcenaGood ] = useState(0)
  const [ ocenaNeutral, setOcenaNeutral ] = useState(0)
  const [ ocenaBad, setOcenaBad ] = useState(0)
  const good = () => {
    setOcenaGood(ocenaGood + 1);
  }
  const neutral = () => {
    setOcenaNeutral(ocenaNeutral + 1);
  }
  const bad = () => {
    setOcenaBad(ocenaBad + 1);
  }
  return (
  <>
  <h1>give feedback</h1>
  <Button onClick={good} text="good" />
  <Button onClick={neutral} text="neutral"/>
  <Button onClick={bad} text="bad"/>
  <h1>statistics</h1>
  <Statistics ocenaGood={ocenaGood} ocenaNeutral={ocenaNeutral} 
  ocenaBad={ocenaBad} counter={ocenaGood + ocenaBad + ocenaNeutral}
  average={((ocenaGood - ocenaBad) / (ocenaGood + ocenaBad + ocenaNeutral)).toPrecision(1)} positive={(ocenaGood / (ocenaGood + ocenaBad + ocenaNeutral) * 100).toPrecision(4)} /> 
  </>
  )
 }
 

export default App