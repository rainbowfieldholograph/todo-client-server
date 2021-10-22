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

const getInfoFromToken = {
  type: UserType,
  args: { token: { type: GraphQLString } },
  resolve(parent, args) {
    console.log(jwt.verify(args.token, process.env.SECRET_KEY_JWT))
    return jwt.verify(args.token, process.env.SECRET_KEY_JWT)
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

module.exports = { users, user, posts, post, getInfoFromToken }
