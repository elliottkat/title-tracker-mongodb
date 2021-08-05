const db = require('../models');
const Dog = db.dogs;

// Create and Save a new Dog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Dog
  const dog = new Dog({
    name: req.body.name,
    birthdate: req.body.birthdate,
    sex: req.body.sex
  });

  // Save the Dog in the database
  dog.save(dog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Dog.'
      });
    });
};

// Retrieve all Dogs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { $regex: new RegExp(name), $options: 'i' } } : {};

  Dog.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Dogs.'
      });
    });
};

// Find a single Dog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Dog.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Dog with id ${id} was not found`});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Dog with ID ${id}`});
    });
};

// Update a Dog by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!'
    });
  }

  const id = req.params.id;

  Dog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Dog with ID ${id}. Maybe Dog was not found!`
        });
      } else res.send({ message: 'Dog was updated successfully.' });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Dog with ID ${id}`
      });
    });
};

// Delete a Dog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Dog.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Dog with ID ${id}. Maybe the Dog was not found!`
        });
      } else {
        res.send({
          message: 'Dog was deleted successfully!'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Dog with ID ${id}`
      });
    });
};

// Delete all Dog from the database.
exports.deleteAll = (req, res) => {
  Dog.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Dogs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Dogs.'
      });
    });
};
