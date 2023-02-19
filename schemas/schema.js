const graphql = require('graphql');
const User = require('../models/user');
const Cart = require('../models/cart');
const Admin = require('../models/admin');
const Item = require('../models/items');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: graphql.GraphQLFloat },
    item: {
      type: ItemType,
      resolve(parent, args) {
        return;
      }
    }
  })
});

const CartType = new GraphQLObjectType({
  name: 'Cart',
  fields: () => ({
    id: { type: GraphQLID },
    cartItems: { type: GraphQLList(ItemType) },
    totalSavings: { type: graphql.GraphQLFloat },
    cartTotal: { type: graphql.GraphQLFloat },
    item: {
      type: ItemType,
      resolve(parent, args) {
        return Item.find({ itemId: parent.itemId });
      }
    },
    items: {
      type: ItemType,
      resolve(parent, args) {
        return Item.find({});
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  //We are wrapping fields in the function as we dont want to execute this ultil
  //everything is inilized. For example below code will throw error AuthorType not
  //found if not wrapped in a function
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    shoppingCart: { type: new GraphQLList(CartType) },
    rewardsMember: { type: graphql.GraphQLBoolean },
    age: { type: GraphQLInt },
    birthday: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById({});
      }
    }
  })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular
//book or get a particular author.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      //argument passed by the user while making the query
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Here we define how to get data from database source

        //this will return the book with id passed in argument
        //by the user
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    }
    // author: {
    //   type: AuthorType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Author.findById(args.id);
    //   }
    // },
    // authors: {
    //   type: new GraphQLList(AuthorType),
    //   resolve(parent, args) {
    //     return Author.find({});
    //   }
    // }
  }
});

//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        //GraphQLNonNull make these field required
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        rewardsMember: { type: graphql.GraphQLBoolean },
        age: { type: GraphQLInt },
        birthday: { type: GraphQLString }
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username,
          email: args.email,
          rewardsMember: args.rewardsMember,
          age: args.age,
          birthday: args.birthday
        });
        return user.save();
      }
    },
    addItem: {
      type: ItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(graphql.GraphQLFloat) }
      },
      resolve(parent, args) {
        let item = new Item({
          name: args.name,
          description: args.description,
          price: args.price
        });
        return item.save();
      }
    }
  }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
