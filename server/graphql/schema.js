const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const { getAllUsers, getUserById, getAllPosts, getPostById, getCurrentUser } = require('./query')

const { register, login, addPost, updatePost, deletePost } = require('./mutation')

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: { getAllUsers, getUserById, getAllPosts, getPostById, getCurrentUser },
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
