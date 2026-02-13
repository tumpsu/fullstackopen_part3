const path = require('path');
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
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(morgan('tiny'));

app.get('/info', async (req, res, next) => {
  try
  {
    const count = await Person.countDocuments({});
    res.send(` <p>Phonebook has info for ${count} people</p> <p>${new Date()}</p> `);
  }
  catch (error)
  {
    next(error);
  }
});

app.get('/api/persons', async (req, res, next) => {
  try
  {
    const persons = await Person.find({});
    res.json(persons);
  }
  catch (error)
  {
    next(error);
  }
});

app.get('/api/persons/:id', async (req, res, next) => {
  try
  {
    const id = Number(req.params.id);
    const person = await Person.findById(id);
    if (!person)
    {
      return res.status(404).json({ error: 'person not found' });
    }
    res.json(person);
  }
  catch (error)
  {
    next(error);
  }
});

app.delete('/api/persons/:id', async (req, res, next) => {
  try
  {
    const id = Number(req.params.id);
    const person = await Person.findById(id);
    if (!person)
    {
      return res
        .status(404)
        .json({ error: 'person not found' });
    }
    await Person.findByIdAndDelete(id);
    res
      .status(204)
      .end();
  }
  catch (error)
  {
    next(error);
  }
});

app.post('/api/persons', async (req, res, next) => {
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

    var saved = await person.save();
    if (saved)
    {
      // Resource location where created resource can be load later....
      const resourceUrl = `/api/persons/${newId}`;
      res.status(201).location(resourceUrl).json(person);
    }
    else
    {
      errors.push('Save failed');
      return res.status(400).json({ errors });
    }
  }
  catch (error)
  {
    next(error);
  }
});

app.put('/api/persons/:id', async (req, res, next) => {
  try
  {
    const { name, number } = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      {
        new: true,            // Return updated document
        runValidators: true,  // Use schema validation
        context: 'query'      // Mongoose validation
      }
    );

    if (!updatedPerson)
    {
      return res.status(404).json({ error: 'person not found' });
    }

    res.json(updatedPerson);
  }
  catch (error)
  {
    next(error);
  }
});

// Unknown API endpoints
app.use('/api/', (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
});

// React fallback for all other routes
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Error handler middleware
app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError')
  {
    return res.status(400).json({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError')
  {
    return res.status(400).json({ error: error.message });
  }
  next(error);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});