const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let db;

const initDb = (callback) => {
  if (db) {
    console.log('Db is already initialized!');
    return callback(null, db);
  }
  mongoose
    .connect(process.env.MONGO_DB)
    .then((client) => {
      db = client;
      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!db) {
    throw Error('Db not initialized');
  }
  return db;
};

module.exports = {
  initDb,
  getDb
};
