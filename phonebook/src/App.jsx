import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './compoments/Filter';
import PersonForm from './compoments/PersonForm';
import Persons from './compoments/Persons';
import Notification from './compoments/Notification';

const App = () => {
  //const [persons, setPersons] = useState([{ name: 'Arto Hellas' } ]); 
  // Test data
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (text, type = 'success') => { 
    setNotification({ text, type });
    setTimeout(() => { setNotification(null) }, 3000);
  }
  
  useEffect(() => {
  console.log('effect');
  personService
    .getAll()
    .then(initialPersons => {
      console.log('promise fulfilled');
      setPersons(initialPersons);
    });
}, []);

const handleSubmit = (event) => {
  event.preventDefault();
  console.log('Handle submit: ', newName);
  // Check is name already in list? 
  const nameExists = persons.find(person => person.name === newName);

  if (nameExists) 
  {
    const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

    if (ok)
    {
      const updatedPerson = { ...nameExists, number: newNumber };

      personService
        .update(nameExists.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p =>
            p.id !== nameExists.id ? p : returnedPerson
          ));
          setNewName('');
          setNewNumber('');
          showNotification(`Updated number for ${returnedPerson.name}.`, 'success');
        })
        .catch(error => { 
          showNotification(`Information of ${nameExists.name} update failed.`, 'error'); 
          setPersons(persons.filter(p => p.id !== nameExists.id)); 
        });
    }
    return;
  }
  
  const personObject = {
    name: newName,
    number: newNumber
  };

  personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      showNotification(`Added ${returnedPerson.name}.`, 'success');
    })
    .catch(error => { showNotification('Add failed.', 'error') })
}

  const handleNameChange = (event) => {
    console.log('handleNameChange is: ', event.target.value);
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => { 
    console.log('handleNumberChange: ', event.target.value);
    setNewNumber(event.target.value); 
  }
  const handleFilterChange = (event) => {
     console.log('handleFilterChange, ', event.target.value);
    setFilter(event.target.value);
  }

  const handleDelete = (id, name) => { 
    if (window.confirm(`Delete ${name}?`)) 
    { 
        personService 
        .remove(id) 
        .then(() => { 
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`Removed ${name}.`, 'success')
         })
         .catch(error => { 
          showNotification( `Person ${name} is already deleted on server.`, 'error' );
         });
    }
  }
    // case-insensive filter 
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Notification message={notification} />
      <h3>Add a new</h3>
       <PersonForm 
          newName={newName} 
          newNumber={newNumber} 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange} 
          handleSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App;