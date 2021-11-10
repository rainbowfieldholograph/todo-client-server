import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
  {
    posts {
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
  query users {
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
  query user {
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
