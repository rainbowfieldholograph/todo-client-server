const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const { users, user, posts, post, getInfoFromToken } = require('./query')

const { register, login, addPost, updatePost, deletePost } = require('./mutation')

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: { users, user, posts, post, getInfoFromToken },
})

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: { register, login, addPost, updatePost, deletePost },
})

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})
