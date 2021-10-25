import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`

export const ADD_NEW_POST = gql`
  mutation AddNewPost($title: String!, $body: String!, $completed: Boolean!) {
    addPost(title: $title, body: $body, completed: $completed) {
      title
      body
    }
  }
`

export const REMOVE_POST = gql`
  mutation RemovePost($postId: String!) {
    deletePost(postId: $postId)
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($id: String!, $title: String, $body: String, $completed: Boolean) {
    updatePost(id: $id, title: $title, body: $body, completed: $completed) {
      title
    }
  }
`
