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
  }  #swagger.responses[200] = {
      in: 'body',
      schema : { $ref: '#/definitions/singleContact' } 
  } */
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
     #swagger.parameters['contact'] = {
        in: 'body',
        description: 'Required information to add a contact.',
        schema: { $ref: '#/definitions/singleContact' } 
     }
     #swagger.responses[201] = {
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
     #swagger.summary = 'Update a contacts favorite color.' 
     #swagger.description = 'Takes the unique identifier of a contact and updates the targeted contacts favorite color
     to Blue.' 
     #swagger.parameters['contactId'] = {
      description: 'A unique identifier assigned to a contact on creation.'
}
  */
  const id = ObjectID(req.params.contactId);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
    .getDb()
    .db('week02')
    .collection('contacts')
    .replaceOne({ _id: id }, contact);
  console.log(response);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the contact');
  }
};

/** Deletes a contact from the database */
const deleteContact = async (req, res) => {
  /* #swagger.tags = ['Contacts'] 
     #swagger.summary = 'Removes the contact from database.' 
     #swagger.description = 'Use the unique identifier of a contact to select and remove them from the database.' 
     #swagger.parameters['contactId'] = {
      description: 'A unique identifier assigned to a contact on creation.'
  }  #swagger.responses[200] = {
      in: 'body',
      schema: { $ref: '#/definitions/deletedResponse' }
  } */
  const id = ObjectID(req.params.contactId);
  const result = await mongodb.getDb().db('week02').collection('contacts');

  result.deleteOne({ _id: id }).then((contact) => {
    res.status(200).json(contact);
  });
};

module.exports = { getContacts, getContactById, addContact, updateContact, deleteContact };
