const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')
const { UserType, PostType } = require('./types')
const { User, Post } = require('../models')

const jwt = require('jsonwebtoken')

const getAllUsers = {
  type: new GraphQLList(UserType),
  resolve(parent, args) {
    return User.find()
  },
}

const getUserById = {
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

const getAllPosts = {
  type: new GraphQLList(PostType),
  resolve() {
    return Post.find()
  },
}

const getPostById = {
  type: PostType,
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    return Post.findById(args.id)
  },
}

const getUserPosts = {
  type: PostType,
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    const posts = Post.find()
    console.log(typeof posts)
    return
  },
}

module.exports = { getAllUsers, getUserById, getAllPosts, getPostById, getCurrentUser }
