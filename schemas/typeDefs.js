// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Item {
    id: String!
    name: String!
    description: String!
    price: Int!
  }

  type User {
    id: String!
    username: String!
    email: String!
    shoppingCart: [Cart!]
    rewardsMember: Boolean
    age: Int
    birthday: String
  }

  type Cart {
    id: String!
    cartItems: [Item!]
    totalSavings: Int!
    cartTotal: Int!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User!]!,
    user: User!
  }

  #Mutations
  type Mutation {
    addUser(user: User): User!
  }
`;

module.exports = typeDefs;
