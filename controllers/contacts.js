const { ObjectID } = require('bson');
const mongodb = require('../db/connection');

/* Returns a list of contacts */
const getContacts = async (req, res) => {
  /* #swagger.tags = ['Contacts'] 
     #swagger.summary = 'Retrieve a list of contacts from the database.' 
     #swagger.description = 'Returns a list of all the contacts information in our database. At this time every contact will return
     a firstName, lastName, email, favoriteColor and birthday as a json object.' 
     #swagger.responses[200] = {
        in: 'body',
        description: 'An example of the data to be returned by retrieving a list of contacts.',
        schema: { $ref: '#/definitions/contacts' }
  } */
  const result = await mongodb.getDb().db('week02').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

/* Returns a single contact by their ID */
const getContactById = async (req, res) => {
  /* #swagger.tags = ['Contacts'] 
     #swagger.summary = 'Retrieve a contact by their unique identifier.' 
     #swagger.description = 'Returns the specified contacts information. Includes a firstName, lastName, email, favoriteColor and
     birthday as a json object.' 
     #swagger.parameters['contactId'] = {
      description: 'A unique identifier assigned to a contact on creation.'
}
  */
  const id = ObjectID(req.params.contactId);
  const result = await mongodb.getDb().db('week02').collection('contacts').find({ _id: id });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

/** Adds a contact to the database */
const addContact = async (req, res) => {
  /* #swagger.tags = ['Contacts'] 
     #swagger.summary = 'Create a contact and save it to the database.' 
     #swagger.description = 'Creates a contact that includes the required information of a firstName, lastName, email, favoriteColor
     and birthday.' 
     #swagger.responses[201] = {
        description: 'Created contact response.',
        schema: { $ref: '#/definitions/createdResponse' }
  } */
  const result = await mongodb.getDb().db('week02').collection('contacts');
  result.insertOne(req.body).then((newContact) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(newContact);
  });
};

/** Updates a contacts favorite Color */
const updateContact = async (req, res) => {
  /* #swagger.tags = ['Contacts'] 
     #swagger.summary = 'Update a contact/'s favorite color.' 
     #swagger.description = 'Takes the unique identifier of a contact and updates the targeted contacts favorite color
     to Blue.' 
     #swagger.parameters['contactId'] = {
      description: 'A unique identifier assigned to a contact on creation.'
}
  */
  const id = ObjectID(req.params.contactId);
  const result = await mongodb.getDb().db('week02').collection('contacts');
  result
    .updateOne(
      { _id: id },
      {
        $set: { favoriteColor: 'Blue' },
        $currentDate: { lastModified: true }
      }
    )
    .then((updateContact) => {
      res.status(204).json(updateContact);
    });
};

/** Deletes a contact from the database */
const deleteContact = async (req, res) => {
  /* #swagger.tags = ['Contacts'] 
     #swagger.summary = 'Removes the contact from database.' 
     #swagger.description = 'Use the unique identifier of a contact to select and remove them from the database.' 
     #swagger.parameters['contactId'] = {
      description: 'A unique identifier assigned to a contact on creation.'
}
  */
  const id = ObjectID(req.params.contactId);
  const result = await mongodb.getDb().db('week02').collection('contacts');

  result.deleteOne({ _id: id }).then((contact) => {
    res.status(200).json(contact);
  });
};

module.exports = { getContacts, getContactById, addContact, updateContact, deleteContact };
