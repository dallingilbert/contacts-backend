const { ObjectID } = require('bson');
const mongodb = require('../db/connection');

const getContacts = async (req, res) => {
  const result = await mongodb.getDb().db('week02').collection('contacts').find();

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getContactById = async (req, res) => {
  const id = ObjectID(req.params.contactId);
  //console.log(id);
  const result = await mongodb.getDb().db('week02').collection('contacts').find({ _id: id });

  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const addContact = async (req, res) => {
  console.log('Adding contact');
  const result = await mongodb.getDb().db('week02').collection('contacts');
  //console.log(req.body);

  result.insertOne(req.body).then((newContact) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(newContact);
  });
};

const updateContact = async (req, res) => {
  console.log('Updating contact');
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

const deleteContact = async (req, res) => {
  console.log('Deleting a contact');
  const result = await mongodb.getDb().db('week02').collection('contacts');

  result.deleteOne({ firstName: 'Bob' }).then((contact) => {
    res.status(200).json(contact);
  });
};

module.exports = { getContacts, getContactById, addContact, updateContact, deleteContact };
