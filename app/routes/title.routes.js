module.exports = app => {
  const titles = require('../controllers/title.controller.js');

  var router = require('express').Router();

  // Create a new Title
  router.post('/', titles.create);

  // Retrieve all Titles
  router.get('/', titles.findAll);

  // Retrieve a single Title by ID
  router.get('/:id', titles.findOne);

  // Update a Title by ID
  router.put('/:id', titles.update);

  // Delete a Title by ID
  router.delete('/:id', titles.delete);

  // Create a new Title
  router.delete('/', titles.deleteAll);

  app.use('/api/titles', router);
};
