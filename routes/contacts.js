const routes = require('express').Router();
const contactsController = require('../controllers/contacts');

// GET Routes
routes.get('/', contactsController.getContacts);
routes.get('/:contactId', contactsController.getContactById);

// POST routes
routes.post('/', contactsController.addContact);

// PUT routes
routes.put('/:contactId', contactsController.updateContact);

// DELETE routes
routes.delete('/:contactId', contactsController.deleteContact);

module.exports = routes;
