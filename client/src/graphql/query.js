import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
  {
    posts {
      id
      title
      body
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

export const GET_INFO_FROM_TOKEN = gql`
  query GetInfoFromToken($token: String!) {
    getInfoFromToken(token: $token) {
      id
      username
    }
  }
`

// export const REMOVE_POST = gql`
//   mutation RemovePost($postId: String!) {
//     deletePost(postId: $postId)
//   }
// `
