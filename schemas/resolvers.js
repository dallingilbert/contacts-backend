const userController = require('../controllers/user');
const User = require('../models/user');

const resolvers = {
  Query: {
    async users(_, { amount }) {
      return await userController.getUsers();
    },
    async user(_, id) {
      return userController.getUserId();
    }
  },
  Mutation: {
    addUser: (_, User) => {
      // Add a user
      const newUser = new User({
        username: User.username,
        email: User.email,
        birthday: User.birthday,
        age: User.age,
        rewardsMember: User.rewardsMember
      });

      newUser.save().then((result) => {
        console.log(result);
        res.status(201).json(result);
      });
    }
  }
};

module.exports = resolvers;
