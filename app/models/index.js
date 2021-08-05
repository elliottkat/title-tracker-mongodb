const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.dogs = require('./dog.model.js')(mongoose);
db.titles = require('./title.model.js')(mongoose);

module.exports = db;
