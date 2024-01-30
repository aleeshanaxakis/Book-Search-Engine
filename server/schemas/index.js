// const { gql } = require('apollo-server-express');
// const { someResolver, anotherResolver } = require('./resolvers');

// // Define your GraphQL schema (type definitions)
// const typeDefs = gql`
//   type Query {
//     hello: String
//     // Define your other queries here
//   }

//   type Mutation {
//     // Define your mutations here
//   }
// `;

// // Define your resolvers
// const resolvers = {
//   Query: {
//     hello: someResolver,
//     // Add other query resolvers here
//   },
//   Mutation: {
//     // Add mutation resolvers here
//   },
// };

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };