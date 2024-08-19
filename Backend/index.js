const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// require('dotenv').config();
MONGO_URI="mongodb://0.0.0.0:27017/mydatabase"


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  team: { type: String, required: true },
});
const Person = mongoose.model('Person', personSchema);

// Controllers
const getAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPerson = async (req, res) => {
  const newPerson = new Person(req.body);
  try {
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePerson = async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedPerson) {
      res.status(200).json(updatedPerson);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePerson = async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (deletedPerson) {
      res.status(200).json({ message: 'Person deleted' });
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Routes
app.get('/api/people', getAllPeople);
app.get('/api/people/:id', getPersonById);
app.post('/api/people', createPerson);
app.put('/api/people/:id', updatePerson);
app.delete('/api/people/:id', deletePerson);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
