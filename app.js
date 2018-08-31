const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/people');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connection Succeeded!');
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.post('/people', (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let new_person = new Person({
    name: name,
    age: age
  });

  new_person.save(function(error, person) {
    if (error) {
      console.error(error);
    }

    res.send(person)
  })
});

app.get('/people', (req, res) => {
  Person.find({}, function(err, people) {
    if (err) {
      console.error(err);
    }

    res.send({
      people: people
    });

  }).sort({_id:-1})
});

app.get('/people/:id', (req, res) => {
  Person.findById(req.params.id, function(err, person) {
    if (err) {
      console.error(err);
    }

    res.send(person);
  })
});

app.put('/people/:id', (req, res) => {
  Person.findById(req.params.id, function(err, person) {
    if (err) {
      console.error(err);
    }

    person.name = req.body.name;
    person.age = req.body.age;
    person.save(function(err, updatedPerson) {
      if(err) {
        console.error(err);
      }

      res.send(updatedPerson)
    })
  })
});

app.delete('/people/:id', (req, res) => {
  Person.remove({
    _id: req.params.id
  }, function(err, person) {
    if(err) {
      res.send(err);
    }

    res.send({
      success: true
    })
  })
});

let port = process.env.PORT || 8081;
console.log(`Now listening on: ${port}`)
app.listen(port);