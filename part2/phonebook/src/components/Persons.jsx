const Persons = ({ persons, filterName, deleteName }) => {
  return (
    persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(person =>
    (
      <p className="person" key={person.id}>
        <span className="name">
          {person.name}
        </span>
        <span className="number">
          {person.number}
        </span>
        <button onClick={() => deleteName(person.id)}>delete</button>
      </p>)
    )
  );
}

export default Persons;