const Persons = ({ persons, filterName, deleteName }) => {
  return (
    persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(person =>
    (
      <p key={person.id}>
        {person.name}
        {person.number}
        <button onClick={() => deleteName(person.id)}>delete</button>
      </p>)
    )
  );
}

export default Persons;