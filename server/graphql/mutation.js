const { GraphQLString } = require('graphql')

const { PostType } = require('./types')
const { User, Post } = require('../models')
const { createJwtToken } = require('../util/auth')

const register = {
  type: GraphQLString,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { username, password } = args
    const user = new User({ username, password })
    await user.save()
    console.log('USER', user)
    const token = createJwtToken(user._id, user.username)
    return token
  },
}

const login = {
  type: GraphQLString,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const user = await User.findOne({ username: args.username }).select('+password')
    console.log('USER', user)
    if (!user || args.password !== user.password) {
      throw new Error('Invalid credentials')
    }
    const token = createJwtToken(user._id, user.username)
    return token
  },
}

const addPost = {
  type: PostType,
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve(parent, args, { verifiedUser }) {
    console.log('Verified User: ', verifiedUser)
    if (!verifiedUser) {
      throw new Error('Unauthorized')
    }
    const post = new Post({ authorId: verifiedUser.id, title: args.title, body: args.body })
    return post.save()
  },
}

const updatePost = {
  type: PostType,
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error('Unauthenticated')
    }

    const postUpdated = await Post.findOneAndUpdate(
      {
        _id: args.id,
        authorId: verifiedUser,
      },
      { title: args.title, body: args.body },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!postUpdated) {
      throw new Error('No post with the given ID found for the author')
    }

    return postUpdated
  },
}

const deletePost = {
  type: GraphQLString,
  args: {
    postId: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log(args.postId, verifiedUser._id)
    const postDeleted = await Post.findOneAndDelete({
      _id: args.postId,
      authorId: verifiedUser.id,
    })
    if (!postDeleted) {
      throw new Error('No post with the given ID found for the author')
    }
    return 'Post deleted'
  },
}

module.exports = { register, login, addPost, updatePost, deletePost }
