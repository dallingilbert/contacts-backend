const routes = require('express').Router();
const myController = require('../controllers');

routes.use('/contacts', require('./contacts'));
routes.use('/', myController.getNames);

module.exports = routes;
