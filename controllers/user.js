const { ObjectID } = require('bson');
const mongodb = require('../db/connection');
const User = require('../models/user');

/* Returns a list of user */
const getUsers = async (req, res) => {
  const cursor = User.find({}).cursor();
  let userArr = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    userArr.push(doc);
    //console.log(doc);
  }
  res.json({ status: 201 });
  return userArr;
};

/* Returns a single usedr by their ID */
const getUserId = async (req, res) => {
  const id = ObjectID(req.params.id);
  const result = await mongodb.getDb().db('shop').collection('user').find({ _id: id });
  result.toArray().then((user) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  });
};

/** Adds a contact to the database */
const addUser = async (req, res) => {
  // .then((newUser) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(201).json(newUser);
  // });
  // doc.insertOne(newUser);
};

/** Updates a user */
const updateUser = async (req, res) => {
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

module.exports = { getUsers, getUserId, addUser, updateUser, deleteUser };
