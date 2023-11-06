import { useState } from 'react'


const StatisticLine=({value, text})=>{
  if (text==="positive"){
    return(
      <tr>  
      <td>{text}</td>
      <td>{value}%</td>
      </tr>
    )
  }
  return( 
    <tr>  
    <td>{text}</td>
    <td>{value}</td>
    </tr>
)
}
const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    
    <div>
    <table>
    <tbody>
    <StatisticLine text="good" value ={props.good} />
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="all" value ={props.total} />
    <StatisticLine text="average" value ={props.average} />
    <StatisticLine text="positive" value ={props.positive} />
    </tbody>
    </table>
      {/* button press history: {props.allClicks.join(' ')} */}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const [average, setAverage] = useState(0)
  const [total, setTotal] = useState(0)
  const [positive, setProsentage] = useState(0)
  

  const calculateAverage=(good, bad, total)=>{
    if (total === 0) {
      console.log('Iffissä: good, bad, total ', good, bad, total)
    return(setAverage(0))
  }
    console.log('Elsessä: good, bad, total ', good, bad, total)
    return(setAverage((good+-1*bad)/total))
    
  }

  const calculatePositiveProsentage=(good, total)=>{
    console.log('calculatePositiveProsentage goog, total', good, total)
    return(
      setProsentage(good/total*100)
    )
  }

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    console.log('good before', good)
    const updatedGood = good + 1
    console.log('good updated', updatedGood)
    setGood(updatedGood)
    setTotal(updatedGood+neutral+bad)
    const updatedTotal=total+1
    calculateAverage(updatedGood,bad, updatedTotal)
    calculatePositiveProsentage(updatedGood, updatedTotal)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good+updatedNeutral+bad)
    const updatedTotal=total+1
    calculateAverage(good,bad,updatedTotal)
    calculatePositiveProsentage(good, updatedTotal)
  }
  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good +neutral +updatedBad)
    const updatedTotal=total+1
    calculateAverage(good,updatedBad,updatedTotal)
    calculatePositiveProsentage(good, updatedTotal)
  }


  return (
    
    <div>
    <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
   
      <h2>statistics</h2>
      <Statistics 
        allClicks={allClicks}
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive} 
        />
    </div>
  )
}

export default App