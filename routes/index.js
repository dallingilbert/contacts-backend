const routes = require('express').Router();

routes.use('/graphql', require('./users'));

module.exports = routes;
