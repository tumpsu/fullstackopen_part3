require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());

const Person = require('./models/person');

morgan.token('body', (req) => { 
  return req.method === 'POST' ? 
  JSON.stringify(req.body) 
  : ''; 
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(morgan('tiny'));

app.get('/info', async (req, res) => { 
  const count = await Person.countDocuments({}); 
  res.send(` <p>Phonebook has info for ${count} people</p> <p>${new Date()}</p> `);
});

app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({}); 
  res.json(persons);
});

app.get('/api/persons/:id', async (req, res) => {
  const id = Number(req.params.id); 
  const person = await Person.findById(id); 
  if (!person) 
  {
     return res
      .status(404)
      .json({ error: 'person not found' });
   } 
   res.json(person);
});

app.delete('/api/persons/:id', async (req, res) => { 
  const id = Number(req.params.id); 
  const person = await Person.findById(id); 
  if (!person) 
  { 
    return res
      .status(404)
      .json({ error: 'person not found' }); 
  } 
  await Person.findByIdAndDelete(id); 
  res.status(204).end();
});

app.post('/api/persons', async (req, res) => {
  const body = req.body;
  const errors = [];
  try
  {
    // Check input fields
    if (!body.name) 
    {
      errors.push('name missing');
    }

    if (!body.number) 
    {
      errors.push('number missing');
    }
    // IS person already exists
    const nameExists = await Person.findOne({ name: body.name });
    if (nameExists) 
    {
      errors.push('name must be unique');
    }

    // If there is errors, return all error same time
    if (errors.length > 0) 
      {
      return res.status(400).json({ errors });
    }

    // Create id
    const newId = Math.floor(Math.random() * 10000000);

    const person = new Person({
      _id: newId,
      name: body.name,
      number: body.number
    });

    const saved = await person.save();

    // Resource location where created resource can be load later....
    const resourceUrl = `/api/persons/${newId}`;
    res
      .status(201)
      .location(resourceUrl)
      .json(person);
  }
  catch (error) 
  { 
    console.error('Save failed:', error); // MongoDB/Mongoose errors → 400 Bad Request 
    if (error.name === 'ValidationError' || error.name === 'MongoServerError') 
    { 
      return res
      .status(400)
      .json({ error: error.message }); 
    } 
    // Other error → 500 Internal Server Error 
    return res.status(500).json({ error: 'server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
