import Part from "./Part";

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => total + part.exercises, 0);


  return (
    (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <strong>total of {totalExercises} exercises</strong>
      </div>
    )
  )
}

export default Content;