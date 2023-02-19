const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/schema');
const bodyParser = require('body-parser');
const PORT = 3000;
require('dotenv').config();
const db = require('./db/connection');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
//This route will be used as an endpoint to interact with Graphql,
//All queries will go through this route.
app
  .use(
    '/graphql',
    graphqlHTTP({
      //directing express-graphql to use this schema to map out the graph
      schema,
      //directing express-graphql to use graphiql when goto '/graphql' address in the browser
      //which provides an interface to make GraphQl queries
      graphiql: true
    })
  )
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
