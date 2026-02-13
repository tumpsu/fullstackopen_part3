const mongoose = require('mongoose');

if (process.argv.length < 3)
{
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://keskitalotuomas_db_user:${password}@phonebook.xaiobo6.mongodb.net/?appName=phonebook`;

mongoose.set('strictQuery', false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// Only password ginen, list all
if (process.argv.length === 3)
{
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

// Jos annettu nimi ja numero → lisää uusi
if (process.argv.length === 5)
{
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}