const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');
const Region = require('./models/region');
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
  let birthday = req.body.birthday;
  let isEmployee = req.body.isEmployee;

  let new_person = new Person({
    name: name,
    age: age,
    birthday: birthday,
    isEmployee: isEmployee
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
    person.birthday = req.body.birthday;
    person.isEmployee = req.body.isEmployee;

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

app.post('/region', (req, res) => {
  let name = req.body.name;
  let code = req.body.code;
  let new_region = new Region({
    name: name,
    code: code
  });

  new_region.save(function(error, region) {
    if (error) {
      console.error(error);
    }

    res.send(region)
  })
});

app.get('/region', (req, res) => {
  Region.find({}, function(err, regions) {
    if (err) {
      console.error(err);
    }

    res.send({
      regions: regions
    });

  }).sort({_id:-1})
});

app.get('/region/:id', (req, res) => {
  Region.findById(req.params.id, function(err, region) {
    if (err) {
      console.error(err);
    }

    res.send(region);
  })
});

app.put('/region/:id', (req, res) => {
  Region.findById(req.params.id, function(err, region) {
    if (err) {
      console.error(err);
    }

    region.name = req.body.name;
    region.code = req.body.code;
    region.save(function(err, updatedRegion) {
      if(err) {
        console.error(err);
      }

      res.send(updatedRegion)
    })
  })
});

app.delete('/region/:id', (req, res) => {
  Region.remove({
    _id: req.params.id
  }, function(err, region) {
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