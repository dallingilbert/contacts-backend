const { ObjectID } = require('bson');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Dallins Contact API',
    description: 'An example API created to simulate CRUD operations on a small database'
  },
  definitions: {
    contacts: [
      {
        _id: '63bba24e1beb4457c9bcccbf',
        firstName: 'Dallin',
        lastName: 'Gilbert',
        email: 'd.jamesgilbert4@gmail.com',
        favoriteColor: 'Blue',
        birthday: '1995-02-27T07:00:00.000Z',
        lastModified: '2023-01-22T05:53:54.125Z'
      },
      {
        _id: '63bba3191beb4457c9bcccc1',
        firstName: 'Chase',
        lastName: 'Gilbert',
        email: 'chasegilbert0651@gmail.com',
        favoriteColor: 'Blue',
        birthday: '1996-01-03T07:00:00.000Z'
      }
    ],
    createdResponse: {
      acknowledged: true,
      insertedId: '63d06d25ac5027cccc3c5eb6'
    }
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./server.js');
});
