const { ObjectID } = require('bson');
const mongodb = require('../db/connection');

/* Returns a list of user */
const getUser = async (req, res) => {
  /* #swagger.tags = ['Users'] 
     #swagger.summary = 'Retrieve a list of user from the database.' 
     #swagger.description = 'Returns a list of all the users information in our database. At this time every contact will return
     a firstName, lastName, email, favoriteColor and birthday as a json object.' 
     #swagger.responses[200] = {
        in: 'body',
        schema: { $ref: '#/definitions/User' }
  } */
  const result = await mongodb.db('shop').collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

/* Returns a single usedr by their ID */
const getUserId = async (req, res) => {
  /* #swagger.tags = ['Users'] 
     #swagger.summary = 'Retrieve a usedr by their unique identifier.' 
     #swagger.description = 'Returns the specified users information. Includes a firstName, lastName, email, favoriteColor and
     birthday as a json object.' 
     #swagger.parameters['id'] = {
      description: 'A unique identifier assigned to a usedr on creation.'
  }  #swagger.responses[200] = {
      in: 'body',
      schema : { $ref: '#/definitions/singleUser' } 
  } */
  const id = ObjectID(req.params.id);
  const result = await mongodb.getDb().db('shop').collection('user').find({ _id: id });
  result.toArray().then((user) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  });
};

/** Adds a contact to the database */
const addUser = async (req, res) => {
  /* #swagger.tags = ['Users'] 
     #swagger.summary = 'Create a user and save it to the database.' 
     #swagger.description = 'Creates a user that includes the required information of a firstName, lastName, email, favoriteColor
     and birthday.' 
     #swagger.parameters['User'] = {
        in: 'body',
        description: 'Required information to add a user.',
        schema: { $ref: '#/definitions/singleUser' } 
     }
     #swagger.responses[201] = {
        schema: { $ref: '#/definitions/createdResponse' }
  } */
  const result = await mongodb.getDb().db('shop').collection('user');
  result.insertOne(req.body).then((newUser) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(newUser);
  });
};

/** Updates a user */
const updateUser = async (req, res) => {
  /* #swagger.tags = ['Users'] 
     #swagger.summary = 'Update user information' 
     #swagger.description = 'Takes the unique identifier of a user and updates the targeted user information.' 
     #swagger.parameters['id'] = {
      description: 'A unique identifier assigned to a user on creation.'
}
  */
  const id = ObjectID(req.params.id);

  const user = {
    username: 'dallyllama',
    email: 'dallyllama@hotmail.com',
    shoppingCart: [
      {
        item: 'test product',
        brand: 'generic',
        price: 2.99,
        description: 'really cool product!',
        count: 1
      },
      {
        item: 'test product2',
        brand: 'generic',
        price: 4.99,
        description: 'really cool product2!',
        count: 2
      }
    ]
  };

  const response = await mongodb
    .getDb()
    .db('shop')
    .collection('user')
    .replaceOne({ _id: id }, user);
  console.log(response);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user');
  }
};

/** Deletes a user from the database */
const deleteUser = async (req, res) => {
  /* #swagger.tags = ['User'] 
     #swagger.summary = 'Removes the user from database.' 
     #swagger.description = 'Use the unique identifier of a user to select and remove them from the database.' 
     #swagger.parameters['id'] = {
      description: 'A unique identifier assigned to a user on creation.'
  }  #swagger.responses[200] = {
      in: 'body',
      schema: { $ref: '#/definitions/deletedResponse' }
  } */
  const id = ObjectID(req.params.contactId);
  const result = await mongodb.getDb().db('shop').collection('user');

  result.deleteOne({ _id: id }).then((contact) => {
    res.status(200).json(contact);
  });
};

module.exports = { getUser, getUserId, addUser, updateUser, deleteUser };
