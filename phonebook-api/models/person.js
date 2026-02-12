const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
  
mongoose.set('strictQuery', false);

mongoose.connect(url, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const personSchema = new mongoose.Schema({
  _id: { 
    type: Number, 
    required: true 
  },
  name: {
  type: String,
  minlength: 3,
  required: true
},
number: {
  type: String,
  required: true
}   
});

personSchema.set('toJSON', { 
  transform: (document, returnedObject) => { 
    if (returnedObject._id !== undefined && returnedObject._id !== null) 
    { returnedObject.id = returnedObject._id.toString(); 

    } 
    delete returnedObject._id; 
    delete returnedObject.__v; } 
});

module.exports = mongoose.model('Person', personSchema, 'people');
