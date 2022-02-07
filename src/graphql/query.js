import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
  {
    getAllPosts {
      id
      title
      body
      completed
      author {
        id
      }
    }
  }
`

export const GET_ALL_USERS = gql`
  query getAllUsers {
    id
    username
    password
    posts {
      id
      title
      body
    }
  }
`

export const GET_USER = gql`
  query getUserById {
    id
    username
    password
    posts {
      id
      title
      body
    }
  }
`

export const GET_CURRENT_USER = gql`
  {
    getCurrentUser {
      id
      username
    }
  }
`

export const GET_USER_POSTS = gql`
  {
    getUserPosts {
      id
      title
      body
      completed
      author {
        id
      }
    }
  }
`
