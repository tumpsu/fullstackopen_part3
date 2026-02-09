const Person = ({ person, handleDelete }) => {
    return (
  <div>
    {person.name} {person.number}
     <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
  </div>
)
}
export default Person;
