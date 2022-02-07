const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql')

const { User, Post } = require('../models')

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    posts: {
      type: GraphQLList(PostType),
    },
  }),
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post type',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.authorId)
      },
    },
  }),
})

module.exports = { UserType, PostType }
