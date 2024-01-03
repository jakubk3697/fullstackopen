import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positive = (good / all) * 100;

  return (
    <>
      <h2>statistics</h2>
      {all > 0 ?
        <div>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + " %"} />
        </div>
        :
        <p>No feedback given</p>
      }
    </>
  )
}

const StatisticLine = ({ text, value }) => <p>{text} {value}</p>;

const Button = ({ onClick, text, value }) => {
  const handleClick = () => onClick(value + 1);
  return <button onClick={handleClick}>{text}</button>;
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <div className="buttons">
        <Button onClick={setGood} text="good" value={good} />
        <Button onClick={setNeutral} text="neutral" value={neutral} />
        <Button onClick={setBad} text="bad" value={bad} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App