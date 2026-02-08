const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());

morgan.token('body', (req) => { 
  return req.method === 'POST' ? 
  JSON.stringify(req.body) 
  : ''; 
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(morgan('tiny'));

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
];

app.get('/info', (req, res) => { 
    const count = persons.length; 
    const date = new Date(); 
    res.send(` <p>Phonebook has info for ${count} people</p> <p>${date}</p> `); 
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id); 
    const person = persons.find(p => p.id === id); 
    if (person) 
    { 
        res.json(person); 
    }
    else 
    { 
        res.status(404).end();
    } 
});

app.delete('/api/persons/:id', (req, res) => { 
    const id = Number(req.params.id); 
    const person = persons.find(p => p.id === id); // Check is poerson exists or not
    if (!person) 
    { 
        return res.status(404).json({ error: 'person not found' });
    } 
    persons = persons.filter(p => p.id !== id); 
    res.status(204).end(); 
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const errors = [];

  // Check input fields
  if (!body.name) 
  {
    errors.push('name missing');
  }

  if (!body.number) 
  {
    errors.push('number missing');
  }

  // Check is name already exists
  const nameExists = persons.find(p => p.name === body.name);
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

  const person = {
    id: newId,
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);

  // Resource location where created resource can be load later....
  const resourceUrl = `/api/persons/${newId}`;

  res
    .status(201)
    .location(resourceUrl)
    .json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
