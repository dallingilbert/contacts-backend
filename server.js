const express = require('express');
const app = express();
const mongodb = require('./db/connection');
const bodyParser = require('body-parser');
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use('/api-docs', swaggerUi.serve)
  .get('/api-docs', swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => console.log(`Connected to DB and running on port: ${PORT}`));
  }
});
