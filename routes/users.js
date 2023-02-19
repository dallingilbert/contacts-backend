const routes = require('express').Router();
const userController = require('../controllers/user');

// GET Routes
routes.get('/', userController.getUser);
routes.get('/:id', userController.getUser);

// POST routes
routes.post('/', userController.addUser);

// PUT routes
routes.put('/:id', userController.updateUser);

// DELETE routes
routes.delete('/:id', userController.deleteUser);

module.exports = routes;
