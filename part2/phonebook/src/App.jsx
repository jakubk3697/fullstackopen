import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    isError: false
  })

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (!existingPerson) {
      setNotification({
        message: `Added ${newName}`,
        isError: false
      })
      setTimeout(() => {
        setNotification({
          message: null,
          isError: false
        })
      }, 5000);
      return personsService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }

    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      setNotification({
        message: `Changed ${newName}'s number`,
        isError: false
      })
      setTimeout(() => {
        setNotification({
          message: null,
          isError: false
        })
      }, 5000);
      const changedPerson = { ...existingPerson, number: newNumber }
      personsService
        .update(existingPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deleteName = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deleteName(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setNotification({
            message: `Information of ${person.name} has already been removed from server`,
            isError: true
          })
          setTimeout(() => {
            setNotification({
              message: null,
              isError: false
            })
          }, 5000);
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterName = (e) => {
    setFilterName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} deleteName={deleteName} />
    </div>
  )
}

export default App