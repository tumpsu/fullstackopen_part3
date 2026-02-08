const express = require('express');
const app = express();
app.use(express.json());

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
  const newId =  Math.floor(Math.random() * 1000000);
  const person = { 
    id:newId, 
    name: body.name, 
    number: body.number 
  }; 
  persons = persons.concat(person); 
  // resource URL generation, where is location, where can get creatred sesource? 
  const resourceUrl = `/api/persons/${newId}`;
  res.status(201).location(resourceUrl).json(person); 
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
