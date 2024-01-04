const Persons = ({ persons, filterName }) => {
  return (
    persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(person => <p key={person.id}>{person.name} {person.phone}</p>)
  );
}

export default Persons;