const mongoose = require('mongoose');

module.exports = (password) => {
  const url =
    `mongodb+srv://keskitalotuomas_db_user:${password}` +
    `@phonebook.xaiobo6.mongodb.net/phonebook?retryWrites=true&w=majority&authSource=admin`;

  mongoose.set('strictQuery', false);

  mongoose.connect(url, { family: 4 })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

  return mongoose.model('Person', personSchema);
};
