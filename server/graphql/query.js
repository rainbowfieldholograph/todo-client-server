const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')
const { UserType, PostType } = require('./types')
const { User, Post } = require('../models')

const jwt = require('jsonwebtoken')

const users = {
  type: new GraphQLList(UserType),
  resolve(parent, args) {
    return User.find()
  },
}

const user = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return User.findById(args.id)
  },
}

const getCurrentUser = {
  type: UserType,
  resolve(parent, args, { verifiedUser }) {
    return verifiedUser
  },
}

const posts = {
  type: new GraphQLList(PostType),
  resolve() {
    return Post.find()
  },
}

const post = {
  type: PostType,
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    return Post.findById(args.id)
  },
}

module.exports = { users, user, posts, post, getCurrentUser }
