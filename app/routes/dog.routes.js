const cors = require('cors');

module.exports = app => {
  const dogs = require('../controllers/dog.controller.js');

  var router = require('express').Router();

  // Create a new Dog
  router.post('/', dogs.create);

  // Retrieve all Dogs
  router.get('/', dogs.findAll);

  // Retrieve a single Dog by ID
  router.get('/:id', dogs.findOne);

  // Update a Dog by ID
  router.put('/:id', dogs.update);

  // Delete a Dog by ID
  router.delete('/:id', dogs.delete);

  // Create a new Dog
  router.delete('/', dogs.deleteAll);

  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));
  app.use('/api/dogs', router);
};
